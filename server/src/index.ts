import { Hono } from 'hono';
import { cors } from 'hono/cors';

import authRouter from './routes/auth';
import mapRouter from './routes/map';
import productsRouter from './routes/products';
import uploadRouter from './routes/upload';

const app = new Hono();

// ── Global Error & CORS Handling ───────────────────────────────────────────────
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposeHeaders: ['Set-Cookie'],
  })
);

app.onError((err, c) => {
  console.error('Unhandled API Error:', err);
  return c.json(
    {
      error: err.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
    500
  );
});

// ── API Routes ──────────────────────────────────────────────────────────────────
app.route('/api/auth', authRouter);
app.route('/api/map', mapRouter);
app.route('/api/products', productsRouter);
app.route('/api/upload', uploadRouter);

// ── Health check ────────────────────────────────────────────────────────────────
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    runtime: 'Hono on Cloudflare Workers',
    timestamp: new Date().toISOString(),
  });
});

// ── Node Server Start (for local npm run dev with tsx) ────────────────────────
if (typeof process !== 'undefined' && process.release?.name === 'node' && !process.env.CF_WORKER) {
  import('@hono/node-server').then(({ serve }) => {
    import('@hono/node-server/serve-static').then(({ serveStatic }) => {
      app.use('/uploads/*', serveStatic({ root: './' }));
      const PORT = Number(process.env.PORT) || 4000;
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
    });
  });
}

export default app;
