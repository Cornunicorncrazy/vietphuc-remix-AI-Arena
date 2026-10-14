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

app.get('/api/qrcode', async (req, res) => {
  try {
    const text = req.query.text || `https://${req.get('host') || 'train.local'}`;
    const QRCode = require('qrcode');
    const dataUrl = await QRCode.toDataURL(text, {
      margin: 1,
      color: { dark: '#253c35', light: '#fbf8f0' },
      errorCorrectionLevel: 'M'
    });
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.json({ dataUrl });
  } catch (err) {
    return res.status(500).json({ error: 'Không thể tạo mã QR.' });
  }
});

app.post('/api/generate-background', async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Thiếu mô tả phông nền.' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên máy chủ.' });
    }
    const { GoogleGenAI } = require('@google/genai');
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
    const fullPrompt = `Historical vintage Vietnamese photographic studio backdrop, empty scene with no people: ${prompt}. Atmospheric soft lighting, Indochine 1930s aesthetic, archival photography background.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: fullPrompt,
        config: { imageConfig: { aspectRatio: '4:3' } }
      });
      const parts = response.candidates?.[0]?.content?.parts || [];
      const imgPart = parts.find(p => p.inlineData);
      if (imgPart?.inlineData?.data) {
        return res.json({
          imageUrl: `data:${imgPart.inlineData.mimeType || 'image/png'};base64,${imgPart.inlineData.data}`,
          source: 'gemini'
        });
      }
      throw new Error('Mô hình Gemini chưa trả về dữ liệu ảnh.');
    } catch (apiErr) {
      let msg = apiErr.message || 'Không thể tạo ảnh nền Gemini lúc này.';
      try {
        const parsed = JSON.parse(msg);
        if (parsed?.error?.message) msg = parsed.error.message;
      } catch (_) {}
      const isQuota = msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED');
      const isKeyErr = msg.includes('API key') || msg.includes('API_KEY_INVALID');
      return res.status(isQuota ? 429 : isKeyErr ? 401 : 500).json({
        error: isQuota
          ? 'Tính năng tạo ảnh nền AI của Gemini yêu cầu API key có kích hoạt hạn ngạch tạo ảnh (Paid API key). Bạn có thể chọn hoặc thiết lập API key trong cài đặt, hoặc sử dụng các phông nền di sản cổ điển và ảnh tải lên có sẵn!'
          : isKeyErr
          ? 'API key chưa hợp lệ hoặc chưa được cấp quyền tạo ảnh. Bạn hãy kiểm tra hoặc chọn lại API key trong cài đặt dự án, hoặc sử dụng ngay các phông nền di sản cổ điển có sẵn!'
          : msg
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Lỗi xử lý tạo nền.' });
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
