import { handleUploadPresigned } from '@vercel/blob/client';
import { issueSignedToken } from '@vercel/blob';
import { checkPassword } from './_auth.js';

// Direct-to-Blob upload for the hero video. The browser sends the file straight to Vercel Blob
// (bypassing the ~4.5 MB serverless request limit); this route only hands out a short-lived,
// password-checked, presigned upload URL. Auth to Blob uses the project's built-in Vercel identity
// (BLOB_STORE_ID) — or BLOB_READ_WRITE_TOKEN if that is set — so no manual token is needed.
const MAX_BYTES = 200 * 1024 * 1024;
const TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const json = await handleUploadPresigned({
      body: req.body,
      request: req,
      getSignedToken: async (pathname, clientPayload) => {
        const ok = checkPassword(clientPayload);
        if (ok === 'not_configured') throw new Error('ADMIN_PASS is not set');
        if (!ok) throw new Error('Unauthorized');
        if (!/^hero-video\/[\w.-]+$/.test(pathname)) throw new Error('Invalid path');
        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: TYPES,
          maximumSizeInBytes: MAX_BYTES,
        });
        return { token, urlOptions: { allowedContentTypes: TYPES, maximumSizeInBytes: MAX_BYTES } };
      },
    });
    return res.json(json);
  } catch (e) {
    console.error('video-upload failed:', e.message);
    const unauthorized = /Unauthorized/.test(e.message);
    return res.status(unauthorized ? 401 : 400).json({ error: e.message });
  }
}
