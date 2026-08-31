import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';

import authRouter from './routes/auth';
import mapRouter from './routes/map';
import productsRouter from './routes/products';
import uploadRouter from './routes/upload';

const app = new Hono();
const PORT = Number(process.env.PORT) || 4000;

// ── CORS ───────────────────────────────────────────────────────────────────────
app.use(
  '*',
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ],
    credentials: true,
  })
);

// ── Static uploads (for local node development) ─────────────────────────────────
app.use('/uploads/*', serveStatic({ root: './' }));

// ── API Routes ──────────────────────────────────────────────────────────────────
app.route('/api/auth', authRouter);
app.route('/api/map', mapRouter);
app.route('/api/products', productsRouter);
app.route('/api/upload', uploadRouter);

// ── Health check ────────────────────────────────────────────────────────────────
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    runtime: 'Hono',
    timestamp: new Date().toISOString(),
  });
});

// ── Node Server Start (Dev / Local Node Mode) ──────────────────────────────────
if (process.env.NODE_ENV !== 'production' || !process.env.CF_PAGES) {
  serve(
    {
      fetch: app.fetch,
      port: PORT,
    },
    (info) => {
      console.log(`\n🔥 Hono Server running on http://localhost:${info.port}`);
      console.log(`   📦 API:     http://localhost:${info.port}/api`);
      console.log(`   🖼  Uploads: http://localhost:${info.port}/uploads`);
      console.log(`   💚 Health:  http://localhost:${info.port}/api/health\n`);
    }
  );
}

export default app;
