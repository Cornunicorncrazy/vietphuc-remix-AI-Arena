const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const { answer } = require('./train-journey/gemini-qa.cjs');
const photoboothGenerate = require('./api/photobooth-generate');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '30kb' }));

app.all('/api/photobooth-generate', photoboothGenerate);

app.post('/api/tet-qa', async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const data = req.body;
    if (!data || !Array.isArray(data.messages)) {
      return res.status(400).json({ error: 'Invalid question' });
    }
    const result = await answer(data.messages, data.language, process.env.GEMINI_API_KEY);
    return res.json(result);
  } catch (error) {
    const status = error instanceof TypeError || error instanceof SyntaxError ? 400 : 503;
    return res.status(status).json({
      error: status === 400 ? 'Invalid question' : 'Assistant temporarily unavailable'
    });
  }
});

const distDir = fs.existsSync(path.join(__dirname, 'dist'))
  ? path.join(__dirname, 'dist')
  : path.join(__dirname, 'train-journey', 'dist');

app.use(express.static(distDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
