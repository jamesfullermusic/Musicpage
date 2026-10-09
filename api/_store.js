// Tiny key/value store used by the admin. Works with either:
//   • REDIS_URL  — any standard Redis (Redis Cloud, Upstash TCP URL, …): redis://user:pass@host:port
//   • Vercel KV / Upstash REST (KV_REST_API_URL + KV_REST_API_TOKEN) — the original setup
// Values are JSON-encoded so both back-ends behave the same.
let redisClient;

async function redis() {
  if (!redisClient) {
    const { createClient } = await import('redis');
    const client = createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 4000, reconnectStrategy: false } });
    client.on('error', (e) => console.error('redis error:', e.message));
    redisClient = client.connect().then(() => client).catch((e) => { redisClient = undefined; throw e; });
  }
  return redisClient;
}

export async function getValue(key) {
  if (process.env.REDIS_URL) {
    const raw = await (await redis()).get(key);
    return raw == null ? null : JSON.parse(raw);
  }
  const { kv } = await import('@vercel/kv');
  return (await kv.get(key)) ?? null;
}

export async function setValue(key, value) {
  if (process.env.REDIS_URL) {
    await (await redis()).set(key, JSON.stringify(value));
    return;
  }
  const { kv } = await import('@vercel/kv');
  await kv.set(key, value);
}
