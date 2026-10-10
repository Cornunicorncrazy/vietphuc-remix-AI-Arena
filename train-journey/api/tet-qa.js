const { answer } = require('../gemini-qa.cjs');

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }
  try {
    if (Number(request.headers['content-length'] || 0) > 30000) {
      return response.status(413).json({ error: 'Question too large' });
    }
    const data = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const result = await answer(data?.messages, data?.language, process.env.GEMINI_API_KEY);
    return response.status(200).json(result);
  } catch (error) {
    const invalid = error instanceof TypeError || error instanceof SyntaxError;
    return response.status(invalid ? 400 : 503).json({
      error: invalid ? 'Invalid question' : 'Assistant temporarily unavailable'
    });
  }
};
