import { put } from '@vercel/blob';
import { checkPassword } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, filename, dataUrl } = req.body || {};
  const ok = checkPassword(password);
  if (ok === 'not_configured') return res.status(500).json({ error: 'ADMIN_PASS is not set' });
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });
  if (!dataUrl?.startsWith('data:image/')) return res.status(400).json({ error: 'Invalid image data' });

  const mime = dataUrl.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
  const base64 = dataUrl.replace(/^data:[^;]+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const safeName = String(filename || `photo-${Date.now()}.jpg`).replace(/[^\w.-]/g, '_');

  const blob = await put(`photos/${safeName}`, buffer, { access: 'public', contentType: mime });
  return res.json({ url: blob.url });
}
