import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import authRouter from './routes/auth';
import mapRouter from './routes/map';
import productsRouter from './routes/products';
import uploadRouter from './routes/upload';

const app = express();
const PORT = process.env.PORT || 4000;

// ── CORS ───────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000', // customer app
    'http://localhost:3001', // admin app
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ],
  credentials: true,
}));

// ── Body parsing ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Static uploads ─────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── API Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/map', mapRouter);
app.use('/api/products', productsRouter);
app.use('/api/upload', uploadRouter);

// ── Health check ────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Start ───────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 StoreMap Server running on http://localhost:${PORT}`);
  console.log(`   📦 API:     http://localhost:${PORT}/api`);
  console.log(`   🖼  Uploads: http://localhost:${PORT}/uploads`);
  console.log(`   💚 Health:  http://localhost:${PORT}/api/health\n`);
});

export default app;
