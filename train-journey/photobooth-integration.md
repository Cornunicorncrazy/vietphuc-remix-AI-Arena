# Photobooth Hoa Phượng Đỏ

The local flow is implemented: select a placeholder frame, capture/upload photos,
select a catalogue outfit, confirm generation, assign photos to every frame slot,
export a composed PNG. The quiz still gates this carriage.

## Assets needed

- Final frame artwork as PNG (transparent photo windows), with output dimensions
  and coordinates of each photo slot. Current layouts are placeholders in
  `dist/photobooth.js`; they have 3 or 4 photo slots.
- Outfit reference photos, ideally full-length with visible garment details.
  Current catalogue illustrations are explicitly placeholders. Cultural category
  information comes from `clothing-facts.js`; a category is not a concrete garment
  reference image. Background removal and exact garment assets remain pending.

## Generation integration

`dist/photobooth-config.js` points to `/api/photobooth-generate`. The browser
never receives an OpenAI API key.

When the backend is built, configure a same-origin endpoint, for example
`/api/photobooth/generate`. It receives multipart fields:

- `person`: normalized PNG of the selected user photo (long edge up to 1600px).
- `outfitId`: an allowlisted ID corresponding to a real server-owned reference.

The backend calls OpenAI image editing using both the person and garment
references, and returns one image as binary PNG/WebP
with the matching image Content-Type. For failures, return JSON `{ "message":
"User-readable error" }` with an appropriate non-2xx status. The current
endpoint returns an `error` field. Configure API key,
model, generation limits and timeout on the server. Validate file size/type,
outfit ID and decoded image before invoking the provider. Add rate limits and
explicit quota errors before enabling generation for a shared/public site.

The static Express preview server does not mount the Vercel function locally;
use a Vercel deployment, or add a local multipart route before testing locally.
The garment reference must be a real JPEG, PNG, or WebP image—not a placeholder
SVG or catalogue card.

## Photo handling

Camera starts only through the user button and requests video, never audio.
Camera tracks stop on capture, close, step changes, page hide and visibility loss.
Photo uploads accept JPEG/PNG/WebP up to 12 MB each; decoded images are normalized.
The photo library is kept in browser memory while the page is open. Closing and
reopening preserves the flow; reloading clears it. Originals and generated photos
have different labels. Removing a photo also clears its frame assignments.

The original-photo frame preview is usable while generation is pending and is
explicitly labeled; it never pretends to be an AI-generated try-on.
