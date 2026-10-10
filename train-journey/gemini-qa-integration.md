# Gemini Q&A for the Tết art carriage

The carriage UI is ready. Until an API is configured, it answers supported clothing topics from the existing sourced notes in `dist/clothing-facts.js`.

When Gemini credentials are available, add a same-origin server endpoint and set `window.trainTetQAConfig = { endpoint: '/api/tet-qa' }` before `tet-qa.js` loads. Keep the Gemini API key on the server; do not put it in `dist/` or browser storage.

The browser sends `POST` JSON with `messages` (the latest eight `{ role, content }` entries) and `language` (`vi` or `en`). Return JSON with `answer` as plain text and optional `sources` entries shaped `{ title, url }`. The UI accepts HTTPS source links, displays answers as text, limits questions to 500 characters, and times out after 30 seconds.

The server should keep answers focused on Vietnamese traditional dress, distinguish communities and local variants, avoid guessing when evidence is thin, and provide sources for factual claims.
