import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'storemap_dev_secret';

export async function requireAuth(c: Context, next: Next) {
  const tokenCookie = getCookie(c, 'token');
  const authHeader = c.req.header('Authorization');
  const bearerToken = authHeader?.replace('Bearer ', '');
  const token = tokenCookie || bearerToken;

  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: number };
    c.set('adminId', payload.adminId);
    await next();
  } catch {
    return c.json({ error: 'Invalid or expired token' }, 401);
  }
}

export function signToken(adminId: number): string {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '7d' });
}
