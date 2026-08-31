import { Hono } from 'hono';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../middleware/auth';

const uploadRouter = new Hono();

// Local disk fallback directory (for Node dev)
const uploadDir = path.join(process.cwd(), 'uploads');
if (typeof process !== 'undefined' && fs.existsSync && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// POST /api/upload
uploadRouter.post('/', requireAuth, async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || !(file instanceof File)) {
      return c.json({ error: 'No file uploaded' }, 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = path.extname(file.name) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    // Try Vercel Blob / Cloudflare R2 if token is provided
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      const { put } = await import('@vercel/blob');
      const blob = await put(filename, buffer, {
        access: 'public',
        token: blobToken,
      });
      return c.json({ url: blob.url });
    }

    // Local disk fallback when running Node.js locally
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${filename}`;
    return c.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

export default uploadRouter;
