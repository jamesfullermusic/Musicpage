import { checkPassword } from './_auth.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const ok = checkPassword(req.body?.password);
  if (ok === 'not_configured') return res.status(500).json({ error: 'ADMIN_PASS is not set' });
  if (!ok) return res.status(401).json({ error: 'Unauthorized' });
  return res.json({ ok: true });
}
