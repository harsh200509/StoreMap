import { Hono } from 'hono';
import { prisma } from '../db/client';
import { requireAuth } from '../middleware/auth';

const productsRouter = new Hono();

// GET /api/products — all products (public)
productsRouter.get('/', async (c) => {
  try {
    const category = c.req.query('category');
    const search = c.req.query('search');
    const status = c.req.query('status');

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

    return c.json(products);
  } catch (err) {
    console.error('Products fetch error:', err);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// GET /api/products/:id
productsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { rack: { include: { section: true } } },
    });
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    return c.json(product);
  } catch (err) {
    console.error('Product fetch error:', err);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
});

// POST /api/products — create (admin)
productsRouter.post('/', requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const {
      name,
      brand,
      category,
      price,
      sku,
      status,
      imageUrl,
      floor,
      sectionName,
      aisle,
      rackId,
      rackDivision,
      locationX,
      locationY,
    } = body;

    if (!name) {
      return c.json({ error: 'name is required' }, 400);
    }

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        category,
        price: Number(price) || 0,
        sku,
        status: status || 'Available',
        imageUrl,
        floor: Number(floor) || 1,
        sectionName,
        aisle,
        rackId: rackId || null,
        rackDivision: rackDivision ? Number(rackDivision) : null,
        locationX: locationX ? Number(locationX) : null,
        locationY: locationY ? Number(locationY) : null,
      },
    });
    return c.json(product, 201);
  } catch (err) {
    console.error('Product create error:', err);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

// PUT /api/products/:id — update (admin)
productsRouter.put('/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const {
      name,
      brand,
      category,
      price,
      sku,
      status,
      imageUrl,
      floor,
      sectionName,
      aisle,
      rackId,
      rackDivision,
      locationX,
      locationY,
    } = body;

    const product = await prisma.product.update({
      where: { id },
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
        ...(rackDivision !== undefined
          ? { rackDivision: rackDivision ? Number(rackDivision) : null }
          : {}),
        ...(locationX !== undefined
          ? { locationX: locationX !== null ? Number(locationX) : null }
          : {}),
        ...(locationY !== undefined
          ? { locationY: locationY !== null ? Number(locationY) : null }
          : {}),
      },
    });
    return c.json(product);
  } catch (err) {
    console.error('Product update error:', err);
    return c.json({ error: 'Failed to update product' }, 500);
  }
});

// PATCH /api/products/:id/location — update position on map (admin)
productsRouter.patch('/:id/location', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    const body = await c.req.json();
    const { rackId, rackDivision, locationX, locationY, sectionName, aisle } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        rackId: rackId || null,
        rackDivision: rackDivision ? Number(rackDivision) : null,
        locationX: locationX !== undefined ? Number(locationX) : undefined,
        locationY: locationY !== undefined ? Number(locationY) : undefined,
        sectionName,
        aisle,
      },
    });
    return c.json(product);
  } catch (err) {
    console.error('Location update error:', err);
    return c.json({ error: 'Failed to update location' }, 500);
  }
});

// DELETE /api/products/:id — delete (admin)
productsRouter.delete('/:id', requireAuth, async (c) => {
  const id = c.req.param('id');
  try {
    await prisma.product.delete({ where: { id } });
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Product not found' }, 404);
  }
});

export default productsRouter;
