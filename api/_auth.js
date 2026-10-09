import { timingSafeEqual } from 'node:crypto';

// Returns true (match), false (wrong), or 'not_configured' (ADMIN_PASS env var missing).
export function checkPassword(supplied) {
  const expected = process.env.ADMIN_PASS;
  if (!expected) return 'not_configured';
  const a = Buffer.from(String(supplied ?? ''));
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
