import { Hono } from 'hono';
import { prisma } from '../db/client';
import { requireAuth } from '../middleware/auth';

const mapRouter = new Hono();

// GET /api/map — full map data (public, for customer app)
mapRouter.get('/', async (c) => {
  try {
    const [sections, racks, configs] = await Promise.all([
      prisma.storeSection.findMany({ orderBy: { name: 'asc' } }),
      prisma.storeRack.findMany({ orderBy: { name: 'asc' } }),
      prisma.storeConfig.findMany(),
    ]);

    const configMap: Record<string, unknown> = {};
    for (const conf of configs) {
      configMap[conf.key] = conf.value;
    }

    return c.json({ sections, racks, config: configMap });
  } catch (err: any) {
    console.error('Map fetch error:', err?.message || err);
    return c.json({ error: 'Failed to load map data', details: err?.message }, 500);
  }
});

// PUT /api/map/sections — upsert all sections (admin)
mapRouter.put('/sections', requireAuth, async (c) => {
  try {
    const body = await c.req.json<{
      sections?: Array<{
        id: string;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        color?: string;
      }>;
    }>();

    const sections = body.sections;
    if (!Array.isArray(sections)) {
      return c.json({ error: 'sections array required' }, 400);
    }

    // Use Promise.all instead of $transaction for Neon HTTP driver compatibility
    const result = await Promise.all(
      sections.map((s) =>
        prisma.storeSection.upsert({
          where: { id: s.id },
          update: {
            name: s.name || 'Section',
            x: Number(s.x) || 0,
            y: Number(s.y) || 0,
            width: Number(s.width) || 100,
            height: Number(s.height) || 100,
            color: s.color || '#f1f5f9',
          },
          create: {
            id: s.id,
            name: s.name || 'Section',
            x: Number(s.x) || 0,
            y: Number(s.y) || 0,
            width: Number(s.width) || 100,
            height: Number(s.height) || 100,
            color: s.color || '#f1f5f9',
          },
        })
      )
    );
    return c.json({ success: true, sections: result });
  } catch (err: any) {
    console.error('Section upsert error:', err?.message || err);
    return c.json({ error: 'Failed to save sections', details: err?.message }, 500);
  }
});

// DELETE /api/map/sections/:id (idempotent deleteMany)
mapRouter.delete('/sections/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.storeSection.deleteMany({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    console.error('Section delete error:', err);
    return c.json({ success: true });
  }
});

// PUT /api/map/racks — upsert all racks (admin)
mapRouter.put('/racks', requireAuth, async (c) => {
  try {
    const body = await c.req.json<{
      racks?: Array<{
        id: string;
        name: string;
        sectionId?: string;
        x: number;
        y: number;
        width: number;
        height: number;
        divisions?: number;
        orientation?: string;
      }>;
    }>();

    const racks = body.racks;
    if (!Array.isArray(racks)) {
      return c.json({ error: 'racks array required' }, 400);
    }

    // Query all valid section IDs to prevent Foreign Key constraint violations
    const existingSections = await prisma.storeSection.findMany({ select: { id: true } });
    const validSectionIds = new Set(existingSections.map((s) => s.id));

    // Use Promise.all instead of $transaction for Neon HTTP driver compatibility
    const result = await Promise.all(
      racks.map((r) => {
        const rawSecId = r.sectionId && r.sectionId.trim() !== '' ? r.sectionId.trim() : null;
        // If the section doesn't exist in the database, safely set to null
        const secId = rawSecId && validSectionIds.has(rawSecId) ? rawSecId : null;

        return prisma.storeRack.upsert({
          where: { id: r.id },
          update: {
            name: r.name || 'Rack',
            sectionId: secId,
            x: Number(r.x) || 0,
            y: Number(r.y) || 0,
            width: Number(r.width) || 40,
            height: Number(r.height) || 120,
            divisions: Number(r.divisions) || 5,
            orientation: r.orientation || 'vertical',
          },
          create: {
            id: r.id,
            name: r.name || 'Rack',
            sectionId: secId,
            x: Number(r.x) || 0,
            y: Number(r.y) || 0,
            width: Number(r.width) || 40,
            height: Number(r.height) || 120,
            divisions: Number(r.divisions) || 5,
            orientation: r.orientation || 'vertical',
          },
        });
      })
    );
    return c.json({ success: true, racks: result });
  } catch (err: any) {
    console.error('Rack upsert error:', err?.message || err);
    return c.json({ error: 'Failed to save racks', details: err?.message }, 500);
  }
});

// DELETE /api/map/racks/:id (idempotent deleteMany)
mapRouter.delete('/racks/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.storeRack.deleteMany({ where: { id } });
    return c.json({ success: true });
  } catch (err) {
    console.error('Rack delete error:', err);
    return c.json({ success: true });
  }
});

// PUT /api/map/config — update store config (admin)
mapRouter.put('/config', requireAuth, async (c) => {
  try {
    const { key, value } = await c.req.json<{ key?: string; value?: any }>();
    if (!key) {
      return c.json({ error: 'key required' }, 400);
    }

    const result = await prisma.storeConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return c.json(result);
  } catch (err: any) {
    console.error('Config update error:', err?.message || err);
    return c.json({ error: 'Failed to update config', details: err?.message }, 500);
  }
});

export default mapRouter;
