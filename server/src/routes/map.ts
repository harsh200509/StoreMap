import { Router, Request, Response } from 'express';
import { prisma } from '../db/client';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/map — full map data (public, for customer app)
router.get('/', async (_req, res: Response) => {
  try {
    const [sections, racks, configs] = await Promise.all([
      prisma.storeSection.findMany({ orderBy: { name: 'asc' } }),
      prisma.storeRack.findMany({ orderBy: { name: 'asc' } }),
      prisma.storeConfig.findMany(),
    ]);

    const configMap: Record<string, unknown> = {};
    for (const c of configs) {
      configMap[c.key] = c.value;
    }

    res.json({ sections, racks, config: configMap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load map data' });
  }
});

// PUT /api/map/sections — upsert all sections (admin)
router.put('/sections', requireAuth, async (req: Request, res: Response) => {
  const { sections } = req.body as { sections: Array<{ id: string; name: string; x: number; y: number; width: number; height: number; color?: string }> };

  if (!Array.isArray(sections)) { res.status(400).json({ error: 'sections array required' }); return; }

  try {
    const result = await prisma.$transaction(
      sections.map((s) =>
        prisma.storeSection.upsert({
          where: { id: s.id },
          update: { name: s.name, x: s.x, y: s.y, width: s.width, height: s.height, color: s.color },
          create: s,
        })
      )
    );
    res.json({ success: true, sections: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save sections' });
  }
});

// DELETE /api/map/sections/:id
router.delete('/sections/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    await prisma.storeSection.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Section not found' });
  }
});

// PUT /api/map/racks — upsert all racks (admin)
router.put('/racks', requireAuth, async (req: Request, res: Response) => {
  const { racks } = req.body as { racks: Array<{ id: string; name: string; sectionId?: string; x: number; y: number; width: number; height: number; divisions?: number; orientation?: string }> };

  if (!Array.isArray(racks)) { res.status(400).json({ error: 'racks array required' }); return; }

  try {
    const result = await prisma.$transaction(
      racks.map((r) =>
        prisma.storeRack.upsert({
          where: { id: r.id },
          update: { name: r.name, sectionId: r.sectionId, x: r.x, y: r.y, width: r.width, height: r.height, divisions: r.divisions, orientation: r.orientation },
          create: { id: r.id, name: r.name, sectionId: r.sectionId, x: r.x, y: r.y, width: r.width, height: r.height, divisions: r.divisions ?? 5, orientation: r.orientation ?? 'vertical' },
        })
      )
    );
    res.json({ success: true, racks: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save racks' });
  }
});

// DELETE /api/map/racks/:id
router.delete('/racks/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    await prisma.storeRack.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Rack not found' });
  }
});

// PUT /api/map/config — update store config (admin)
router.put('/config', requireAuth, async (req: Request, res: Response) => {
  const { key, value } = req.body;
  if (!key) { res.status(400).json({ error: 'key required' }); return; }

  try {
    const result = await prisma.storeConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update config' });
  }
});

export default router;
