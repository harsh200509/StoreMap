import { Router, Request, Response } from 'express';
import { prisma } from '../db/client';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET /api/products — all products (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search, status } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(category ? { category: String(category) } : {}),
        ...(status ? { status: String(status) } : {}),
        ...(search
          ? {
              OR: [
                { name: { contains: String(search), mode: 'insensitive' } },
                { brand: { contains: String(search), mode: 'insensitive' } },
                { category: { contains: String(search), mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: { rack: { include: { section: true } } },
      orderBy: { name: 'asc' },
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { rack: { include: { section: true } } },
    });
    if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products — create (admin)
router.post('/', requireAuth, async (req: Request, res: Response) => {
  const { name, brand, category, price, sku, status, imageUrl, floor, sectionName, aisle, rackId, rackDivision, locationX, locationY } = req.body;

  if (!name) { res.status(400).json({ error: 'name is required' }); return; }

  try {
    const product = await prisma.product.create({
      data: { name, brand, category, price: Number(price) || 0, sku, status: status || 'Available', imageUrl, floor: Number(floor) || 1, sectionName, aisle, rackId: rackId || null, rackDivision: rackDivision ? Number(rackDivision) : null, locationX: locationX ? Number(locationX) : null, locationY: locationY ? Number(locationY) : null },
    });
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id — update (admin)
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  const { name, brand, category, price, sku, status, imageUrl, floor, sectionName, aisle, rackId, rackDivision, locationX, locationY } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(brand !== undefined ? { brand } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(sku !== undefined ? { sku } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(floor !== undefined ? { floor: Number(floor) } : {}),
        ...(sectionName !== undefined ? { sectionName } : {}),
        ...(aisle !== undefined ? { aisle } : {}),
        ...(rackId !== undefined ? { rackId: rackId || null } : {}),
        ...(rackDivision !== undefined ? { rackDivision: rackDivision ? Number(rackDivision) : null } : {}),
        ...(locationX !== undefined ? { locationX: locationX !== null ? Number(locationX) : null } : {}),
        ...(locationY !== undefined ? { locationY: locationY !== null ? Number(locationY) : null } : {}),
      },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// PATCH /api/products/:id/location — update position on map (admin)
router.patch('/:id/location', requireAuth, async (req: Request, res: Response) => {
  const { rackId, rackDivision, locationX, locationY, sectionName, aisle } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        rackId: rackId || null,
        rackDivision: rackDivision ? Number(rackDivision) : null,
        locationX: locationX !== undefined ? Number(locationX) : undefined,
        locationY: locationY !== undefined ? Number(locationY) : undefined,
        sectionName,
        aisle,
      },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// DELETE /api/products/:id — delete (admin)
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch {
    res.status(404).json({ error: 'Product not found' });
  }
});

export default router;
