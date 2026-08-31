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
  } catch (err) {
    console.error('Map fetch error:', err);
    return c.json({ error: 'Failed to load map data' }, 500);
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

    const result = await prisma.$transaction(
      sections.map((s) =>
        prisma.storeSection.upsert({
          where: { id: s.id },
          update: {
            name: s.name,
            x: s.x,
            y: s.y,
            width: s.width,
            height: s.height,
            color: s.color,
          },
          create: s,
        })
      )
    );
    return c.json({ success: true, sections: result });
  } catch (err) {
    console.error('Section upsert error:', err);
    return c.json({ error: 'Failed to save sections' }, 500);
  }
});

// DELETE /api/map/sections/:id
mapRouter.delete('/sections/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.storeSection.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Section not found' }, 404);
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

    const result = await prisma.$transaction(
      racks.map((r) =>
        prisma.storeRack.upsert({
          where: { id: r.id },
          update: {
            name: r.name,
            sectionId: r.sectionId,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            divisions: r.divisions,
            orientation: r.orientation,
          },
          create: {
            id: r.id,
            name: r.name,
            sectionId: r.sectionId,
            x: r.x,
            y: r.y,
            width: r.width,
            height: r.height,
            divisions: r.divisions ?? 5,
            orientation: r.orientation ?? 'vertical',
          },
        })
      )
    );
    return c.json({ success: true, racks: result });
  } catch (err) {
    console.error('Rack upsert error:', err);
    return c.json({ error: 'Failed to save racks' }, 500);
  }
});

// DELETE /api/map/racks/:id
mapRouter.delete('/racks/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.storeRack.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Rack not found' }, 404);
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
  } catch (err) {
    console.error('Config update error:', err);
    return c.json({ error: 'Failed to update config' }, 500);
  }
});

export default mapRouter;
