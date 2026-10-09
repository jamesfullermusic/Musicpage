import { kv } from '@vercel/kv';
import { checkPassword } from './_auth.js';

const VALID = ['shows', 'content', 'photos'];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const [shows, content, photos] = await Promise.all(VALID.map((k) => kv.get(`band:${k}`)));
      return res.json({ shows: shows ?? null, content: content ?? null, photos: photos ?? null });
    } catch (e) {
      // Storage not connected yet — the site falls back to band.config.mjs defaults.
      return res.json({ shows: null, content: null, photos: null });
    }
  }

  if (req.method === 'POST') {
    const { password, key, value } = req.body || {};
    const ok = checkPassword(password);
    if (ok === 'not_configured') return res.status(500).json({ error: 'ADMIN_PASS is not set' });
    if (!ok) return res.status(401).json({ error: 'Unauthorized' });
    if (!VALID.includes(key)) return res.status(400).json({ error: 'Invalid key' });
    await kv.set(`band:${key}`, value);
    return res.json({ ok: true });
  }

  res.status(405).end();
}
