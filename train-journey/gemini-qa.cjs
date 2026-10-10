const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const context = `You are the Q&A guide in a Vietnamese cultural exhibition about traditional clothing. Answer in the visitor's requested language, normally Vietnamese. Focus on Vietnamese dress, its construction, occasions, historical context and regional or community variations. Distinguish a garment from a whole outfit. Do not present one photograph or one locality as representative of an entire ethnic group. If evidence is uncertain, say so plainly. Do not invent citations, URLs, dates, symbolism or historical claims. Keep answers concise (roughly 2–5 sentences) and respectful. This exhibition features áo giao lĩnh, áo Nhật Bình, áo ngũ thân, áo bà ba, H’Mông skirts and outfits, Dao đỏ, Thái and Ê Đê clothing. Áo dài is not a selectable outfit in this experience.`;

async function answer(messages, language, key) {
  if (!key) throw new Error('GEMINI_API_KEY is not configured');
  if (!Array.isArray(messages) || !messages.length || messages.length > 8) throw new TypeError('Invalid messages');
  const clean = messages.map(message => {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string') throw new TypeError('Invalid message');
    const content = message.content.trim();
    if (!content || content.length > (message.role === 'user' ? 500 : 4000)) throw new TypeError('Invalid message length');
    return {role: message.role === 'assistant' ? 'model' : 'user', parts: [{text: content}]};
  });
  if (clean.at(-1).role !== 'user') throw new TypeError('Last message must be a question');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-goog-api-key': key},
      body: JSON.stringify({
        systemInstruction: {parts: [{text: `${context} Reply in ${language === 'en' ? 'English' : 'Vietnamese'}.`}]},
        contents: clean,
        generationConfig: {maxOutputTokens: 600, temperature: 0.3}
      }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`Gemini returned ${response.status}`);
    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();
    if (!text) throw new Error('Gemini returned no answer');
    return {answer: text.slice(0, 4000)};
  } finally {
    clearTimeout(timer);
  }
}

module.exports = {answer};
