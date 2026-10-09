import { handleUpload } from '@vercel/blob/client';
import { checkPassword } from './_auth.js';

// Direct-to-Blob upload for the hero video. The browser sends the file straight to Vercel Blob
// (bypassing the ~4.5 MB serverless request limit); this route only hands out a short-lived,
// password-checked upload token.
const MAX_BYTES = 200 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const ok = checkPassword(clientPayload);
        if (ok === 'not_configured') throw new Error('ADMIN_PASS is not set');
        if (!ok) throw new Error('Unauthorized');
        if (!/^hero-video\//.test(pathname)) throw new Error('Invalid path');
        return {
          allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => { /* nothing to record: the admin saves the URL itself */ },
    });
    return res.json(json);
  } catch (e) {
    const unauthorized = /Unauthorized/.test(e.message);
    return res.status(unauthorized ? 401 : 400).json({ error: e.message });
  }
}
