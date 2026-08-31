import { Hono } from 'hono';
import { requireAuth } from '../middleware/auth';

const uploadRouter = new Hono();

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
    const ext = file.name ? file.name.substring(file.name.lastIndexOf('.')) : '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    // Try Vercel Blob if token is provided
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (blobToken) {
      const { put } = await import('@vercel/blob');
      const blob = await put(filename, buffer, {
        access: 'public',
        token: blobToken,
      });
      return c.json({ url: blob.url });
    }

    // When running locally in Node.js, dynamically write to local disk
    if (typeof process !== 'undefined' && process.release?.name === 'node') {
      try {
        const fs = await import('node:fs');
        const path = await import('node:path');
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);
        return c.json({ url: `/uploads/${filename}` });
      } catch (e) {
        console.warn('Local filesystem write failed:', e);
      }
    }

    // Fallback data URI for serverless environments without blob tokens
    const base64 = buffer.toString('base64');
    const mime = file.type || 'image/jpeg';
    return c.json({ url: `data:${mime};base64,${base64}` });
  } catch (err) {
    console.error('Upload error:', err);
    return c.json({ error: 'Failed to upload image' }, 500);
  }
});

export default uploadRouter;
