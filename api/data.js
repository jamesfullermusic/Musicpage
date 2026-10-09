import { getValue, setValue } from './_store.js';
import { checkPassword } from './_auth.js';

const VALID = ['shows', 'content', 'photos', 'sections', 'texts'];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const [shows, content, photos, sections, texts] = await Promise.all(VALID.map((k) => getValue(`band:${k}`)));
      return res.json({ shows: shows ?? null, content: content ?? null, photos: photos ?? null, sections: sections ?? null, texts: texts ?? null });
    } catch (e) {
      // Storage not connected yet — the site falls back to band.config.mjs defaults.
      return res.json({ shows: null, content: null, photos: null, sections: null, texts: null });
    }
  }

  if (req.method === 'POST') {
    const { password, key, value } = req.body || {};
    const ok = checkPassword(password);
    if (ok === 'not_configured') return res.status(500).json({ error: 'ADMIN_PASS is not set' });
    if (!ok) return res.status(401).json({ error: 'Unauthorized' });
    if (!VALID.includes(key)) return res.status(400).json({ error: 'Invalid key' });
    try {
      await setValue(`band:${key}`, value);
    } catch (e) {
      console.error('data save failed:', e.message);
      return res.status(500).json({ error: 'Storage is not connected' });
    }
    return res.json({ ok: true });
  }

  res.status(405).end();
}
