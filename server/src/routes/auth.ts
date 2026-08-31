import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/client';
import { signToken } from '../middleware/auth';

const authRouter = new Hono();
const JWT_SECRET = process.env.JWT_SECRET || 'storemap_dev_secret';

// POST /api/auth/login
authRouter.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json<{ username?: string; password?: string }>();

    if (!username || !password) {
      return c.json({ error: 'Username and password required' }, 400);
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = signToken(admin.id);

    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days (seconds in Hono)
      path: '/',
    });

    return c.json({ success: true, username: admin.username, token });
  } catch (err) {
    console.error('Login error:', err);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /api/auth/logout
authRouter.post('/logout', (c) => {
  deleteCookie(c, 'token', { path: '/' });
  return c.json({ success: true });
});

// GET /api/auth/me
authRouter.get('/me', async (c) => {
  const tokenCookie = getCookie(c, 'token');
  const authHeader = c.req.header('Authorization');
  const bearerToken = authHeader?.replace('Bearer ', '');
  const token = tokenCookie || bearerToken;

  if (!token) {
    return c.json({ error: 'Not logged in' }, 401);
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: number };
    const admin = await prisma.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, username: true },
    });

    if (!admin) {
      return c.json({ error: 'Not found' }, 401);
    }

    return c.json(admin);
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

export default authRouter;
