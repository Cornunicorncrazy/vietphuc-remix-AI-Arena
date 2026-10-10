const fs = require('node:fs');
const OpenAI = require('openai');
const formidable = require('formidable');

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const OUTFIT_NAMES = {
  'giao-linh': 'áo giao lĩnh',
  'ngu-than': 'áo ngũ thân',
  'ba-ba': 'áo bà ba',
  hmong: 'trang phục H’Mông',
  'dao-do': 'trang phục Dao đỏ',
  thai: 'trang phục Thái',
  ede: 'trang phục Ê Đê',
  'nhat-binh': 'áo Nhật Bình'
};

function parseForm(request) {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: MAX_FILE_SIZE,
      maxFiles: 2,
      allowEmptyFiles: false,
      filter: ({ mimetype }) => ['image/jpeg', 'image/png', 'image/webp'].includes(mimetype)
    });
    form.parse(request, (error, fields, files) => error ? reject(error) : resolve({ fields, files }));
  });
}

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function firstFile(files, name) {
  const file = first(files[name]);
  if (!file?.filepath || !file.mimetype) throw new TypeError(`Missing ${name} image`);
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
    throw new TypeError(`Invalid ${name} image type`);
  }
  return file;
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.OPENAI_API_KEY) {
    return response.status(503).json({ error: 'Image generation is not configured' });
  }

  try {
    const { fields, files } = await parseForm(request);
    const person = firstFile(files, 'person');
    const garment = firstFile(files, 'garment');
    const outfitId = first(first(fields.outfitId));
    const outfitName = OUTFIT_NAMES[outfitId] || 'trang phục truyền thống Việt Nam';
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.images.edit({
      model: 'gpt-image-1',
      image: [
        await OpenAI.toFile(fs.createReadStream(person.filepath), person.originalFilename || 'person.png', { type: person.mimetype }),
        await OpenAI.toFile(fs.createReadStream(garment.filepath), garment.originalFilename || 'garment.png', { type: garment.mimetype })
      ],
      prompt: `Create a respectful photorealistic portrait using the person photo as the identity reference and the clothing reference as the garment design. Dress the same person in ${outfitName}. Preserve the person's face, pose, body proportions and background as much as possible. Replace only the clothing naturally, with accurate Vietnamese textile details, realistic lighting, clean edges, and no text or watermark.`,
      size: '1024x1024',
      quality: 'auto'
    });
    const encoded = result.data?.[0]?.b64_json;
    if (!encoded) throw new Error('OpenAI returned no image');
    response.setHeader('Content-Type', 'image/png');
    return response.status(200).send(Buffer.from(encoded, 'base64'));
  } catch (error) {
    const invalid = error instanceof TypeError || error?.code === 'ERR_INVALID_ARG_TYPE';
    console.error('Photobooth image generation failed:', error);
    return response.status(invalid ? 400 : 502).json({
      error: invalid ? error.message : `Image generation failed: ${error.message || 'OpenAI returned an error'}`
    });
  }
};
