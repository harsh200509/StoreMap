import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // --- Admin ---
  const hash = await bcrypt.hash('storemap123', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: hash },
  });
  console.log('✅ Admin created: admin / storemap123');

  // --- Store Config ---
  await prisma.storeConfig.upsert({ where: { key: 'entrance' }, update: {}, create: { key: 'entrance', value: { x: 100, y: 760 } } });
  await prisma.storeConfig.upsert({ where: { key: 'checkout' }, update: {}, create: { key: 'checkout', value: { x: 800, y: 700 } } });
  await prisma.storeConfig.upsert({ where: { key: 'store_name' }, update: {}, create: { key: 'store_name', value: 'DMart Demo Store' } });
  await prisma.storeConfig.upsert({ where: { key: 'store_width' }, update: {}, create: { key: 'store_width', value: 1000 } });
  await prisma.storeConfig.upsert({ where: { key: 'store_height' }, update: {}, create: { key: 'store_height', value: 800 } });

  // --- Sections ---
  const sections = [
    { id: 'sec-grocery', name: 'Grocery', x: 80, y: 80, width: 440, height: 180, color: '#fff7ed' },
    { id: 'sec-snacks', name: 'Snacks', x: 80, y: 280, width: 440, height: 180, color: '#fefce8' },
    { id: 'sec-dairy', name: 'Dairy', x: 560, y: 80, width: 360, height: 180, color: '#eff6ff' },
    { id: 'sec-beverages', name: 'Beverages', x: 560, y: 280, width: 360, height: 180, color: '#faf5ff' },
    { id: 'sec-personal', name: 'Personal Care', x: 80, y: 480, width: 240, height: 180, color: '#fdf2f8' },
    { id: 'sec-cleaning', name: 'Cleaning', x: 360, y: 480, width: 240, height: 180, color: '#f0fdfa' },
    { id: 'sec-household', name: 'Household', x: 640, y: 480, width: 280, height: 180, color: '#f8fafc' },
  ];

  for (const sec of sections) {
    await prisma.storeSection.upsert({ where: { id: sec.id }, update: sec, create: sec });
  }
  console.log('✅ Sections seeded');

  // --- Racks ---
  const racks = [
    // Grocery
    { id: 'a01', name: 'A01', sectionId: 'sec-grocery', x: 100, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a02', name: 'A02', sectionId: 'sec-grocery', x: 180, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a03', name: 'A03', sectionId: 'sec-grocery', x: 260, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a04', name: 'A04', sectionId: 'sec-grocery', x: 340, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a05', name: 'A05', sectionId: 'sec-grocery', x: 420, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    // Snacks
    { id: 'a06', name: 'A06', sectionId: 'sec-snacks', x: 100, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a07', name: 'A07', sectionId: 'sec-snacks', x: 180, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a08', name: 'A08', sectionId: 'sec-snacks', x: 260, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a09', name: 'A09', sectionId: 'sec-snacks', x: 340, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'a10', name: 'A10', sectionId: 'sec-snacks', x: 420, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    // Dairy
    { id: 'd01', name: 'D01', sectionId: 'sec-dairy', x: 580, y: 120, width: 140, height: 40, divisions: 5, orientation: 'horizontal' },
    { id: 'd02', name: 'D02', sectionId: 'sec-dairy', x: 580, y: 200, width: 140, height: 40, divisions: 5, orientation: 'horizontal' },
    { id: 'd03', name: 'D03', sectionId: 'sec-dairy', x: 760, y: 120, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    // Beverages
    { id: 'b01', name: 'B01', sectionId: 'sec-beverages', x: 580, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'b02', name: 'B02', sectionId: 'sec-beverages', x: 660, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'b03', name: 'B03', sectionId: 'sec-beverages', x: 740, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    { id: 'b04', name: 'B04', sectionId: 'sec-beverages', x: 820, y: 320, width: 40, height: 120, divisions: 5, orientation: 'vertical' },
    // Personal Care
    { id: 'p01', name: 'P01', sectionId: 'sec-personal', x: 120, y: 520, width: 160, height: 30, divisions: 5, orientation: 'horizontal' },
    { id: 'p02', name: 'P02', sectionId: 'sec-personal', x: 120, y: 590, width: 160, height: 30, divisions: 5, orientation: 'horizontal' },
    // Cleaning
    { id: 'c01', name: 'C01', sectionId: 'sec-cleaning', x: 380, y: 520, width: 180, height: 30, divisions: 5, orientation: 'horizontal' },
    { id: 'c02', name: 'C02', sectionId: 'sec-cleaning', x: 380, y: 590, width: 180, height: 30, divisions: 5, orientation: 'horizontal' },
    // Household
    { id: 'h01', name: 'H01', sectionId: 'sec-household', x: 680, y: 520, width: 180, height: 30, divisions: 5, orientation: 'horizontal' },
    { id: 'h02', name: 'H02', sectionId: 'sec-household', x: 680, y: 590, width: 180, height: 30, divisions: 5, orientation: 'horizontal' },
  ];

  for (const rack of racks) {
    await prisma.storeRack.upsert({ where: { id: rack.id }, update: rack, create: rack });
  }
  console.log('✅ Racks seeded');

  // --- Products ---
  const products = [
    { id: 'p-1', name: 'Aashirvaad Superior MP Atta', brand: 'Aashirvaad', category: 'Grocery', price: 250, sku: 'GRO-001', status: 'Available', rackId: 'a03', rackDivision: 2, sectionName: 'Grocery', aisle: 'A03', locationX: 260, locationY: 150 },
    { id: 'p-2', name: 'Tata Salt', brand: 'Tata', category: 'Grocery', price: 28, sku: 'GRO-002', status: 'Available', rackId: 'a01', rackDivision: 1, sectionName: 'Grocery', aisle: 'A01', locationX: 100, locationY: 150 },
    { id: 'p-3', name: 'Fortune Sunflower Oil', brand: 'Fortune', category: 'Grocery', price: 145, sku: 'GRO-003', status: 'Available', rackId: 'a05', rackDivision: 1, sectionName: 'Grocery', aisle: 'A05', locationX: 420, locationY: 130 },
    { id: 'p-4', name: 'India Gate Basmati Rice', brand: 'India Gate', category: 'Grocery', price: 450, sku: 'GRO-004', status: 'Available', rackId: 'a02', rackDivision: 3, sectionName: 'Grocery', aisle: 'A02', locationX: 180, locationY: 170 },
    { id: 'p-5', name: 'Everest Turmeric Powder', brand: 'Everest', category: 'Grocery', price: 65, sku: 'GRO-005', status: 'Low Stock', rackId: 'a01', rackDivision: 4, sectionName: 'Grocery', aisle: 'A01', locationX: 100, locationY: 200 },
    { id: 'p-6', name: 'Catch Coriander Powder', brand: 'Catch', category: 'Grocery', price: 55, sku: 'GRO-006', status: 'Available', rackId: 'a01', rackDivision: 4, sectionName: 'Grocery', aisle: 'A01', locationX: 100, locationY: 210 },
    { id: 'p-7', name: 'Toor Dal', brand: 'Tata Sampann', category: 'Grocery', price: 170, sku: 'GRO-007', status: 'Available', rackId: 'a04', rackDivision: 1, sectionName: 'Grocery', aisle: 'A04', locationX: 340, locationY: 140 },
    { id: 'p-8', name: 'Moong Dal', brand: 'Tata Sampann', category: 'Grocery', price: 140, sku: 'GRO-008', status: 'Available', rackId: 'a04', rackDivision: 2, sectionName: 'Grocery', aisle: 'A04', locationX: 340, locationY: 160 },
    { id: 'p-9', name: 'Sugar', brand: 'Madhur', category: 'Grocery', price: 50, sku: 'GRO-009', status: 'Available', rackId: 'a02', rackDivision: 1, sectionName: 'Grocery', aisle: 'A02', locationX: 180, locationY: 130 },
    { id: 'p-10', name: 'Chana Dal', brand: 'Tata Sampann', category: 'Grocery', price: 120, sku: 'GRO-010', status: 'Out of Stock', rackId: 'a04', rackDivision: 3, sectionName: 'Grocery', aisle: 'A04', locationX: 340, locationY: 180 },
    { id: 'p-11', name: 'Maggi 2-Minute Noodles', brand: 'Maggi', category: 'Snacks', price: 14, sku: 'SNA-001', status: 'Available', rackId: 'a07', rackDivision: 2, sectionName: 'Snacks', aisle: 'A07', locationX: 180, locationY: 350 },
    { id: 'p-12', name: 'Parle-G', brand: 'Parle', category: 'Snacks', price: 10, sku: 'SNA-002', status: 'Available', rackId: 'a06', rackDivision: 1, sectionName: 'Snacks', aisle: 'A06', locationX: 100, locationY: 330 },
    { id: 'p-13', name: 'Britannia Good Day', brand: 'Britannia', category: 'Snacks', price: 20, sku: 'SNA-003', status: 'Available', rackId: 'a06', rackDivision: 2, sectionName: 'Snacks', aisle: 'A06', locationX: 100, locationY: 360 },
    { id: 'p-14', name: 'Lays Classic Salted', brand: 'Lays', category: 'Snacks', price: 20, sku: 'SNA-004', status: 'Available', rackId: 'a08', rackDivision: 1, sectionName: 'Snacks', aisle: 'A08', locationX: 260, locationY: 340 },
    { id: 'p-15', name: 'Lays Magic Masala', brand: 'Lays', category: 'Snacks', price: 20, sku: 'SNA-005', status: 'Low Stock', rackId: 'a08', rackDivision: 1, sectionName: 'Snacks', aisle: 'A08', locationX: 260, locationY: 350 },
    { id: 'p-16', name: 'Kurkure Masala Munch', brand: 'Kurkure', category: 'Snacks', price: 20, sku: 'SNA-006', status: 'Available', rackId: 'a08', rackDivision: 2, sectionName: 'Snacks', aisle: 'A08', locationX: 260, locationY: 380 },
    { id: 'p-17', name: 'Haldiram Aloo Bhujia', brand: 'Haldiram', category: 'Snacks', price: 50, sku: 'SNA-007', status: 'Available', rackId: 'a09', rackDivision: 1, sectionName: 'Snacks', aisle: 'A09', locationX: 340, locationY: 340 },
    { id: 'p-18', name: 'Haldiram Moong Dal', brand: 'Haldiram', category: 'Snacks', price: 50, sku: 'SNA-008', status: 'Available', rackId: 'a09', rackDivision: 2, sectionName: 'Snacks', aisle: 'A09', locationX: 340, locationY: 370 },
    { id: 'p-19', name: 'Sunfeast Dark Fantasy', brand: 'Sunfeast', category: 'Snacks', price: 30, sku: 'SNA-009', status: 'Available', rackId: 'a06', rackDivision: 3, sectionName: 'Snacks', aisle: 'A06', locationX: 100, locationY: 400 },
    { id: 'p-20', name: 'Oreo Original', brand: 'Cadbury', category: 'Snacks', price: 30, sku: 'SNA-010', status: 'Available', rackId: 'a06', rackDivision: 4, sectionName: 'Snacks', aisle: 'A06', locationX: 100, locationY: 420 },
    { id: 'p-48', name: 'Kissan Tomato Ketchup', brand: 'Kissan', category: 'Snacks', price: 110, sku: 'SNA-011', status: 'Available', rackId: 'a10', rackDivision: 1, sectionName: 'Snacks', aisle: 'A10', locationX: 420, locationY: 340 },
    { id: 'p-21', name: 'Amul Taaza Milk', brand: 'Amul', category: 'Dairy', price: 54, sku: 'DAI-001', status: 'Available', rackId: 'd01', rackDivision: 1, sectionName: 'Dairy', aisle: 'D01', locationX: 590, locationY: 140 },
    { id: 'p-22', name: 'Amul Gold Milk', brand: 'Amul', category: 'Dairy', price: 66, sku: 'DAI-002', status: 'Low Stock', rackId: 'd01', rackDivision: 2, sectionName: 'Dairy', aisle: 'D01', locationX: 630, locationY: 140 },
    { id: 'p-23', name: 'Amul Butter', brand: 'Amul', category: 'Dairy', price: 56, sku: 'DAI-003', status: 'Available', rackId: 'd02', rackDivision: 1, sectionName: 'Dairy', aisle: 'D02', locationX: 590, locationY: 220 },
    { id: 'p-24', name: 'Amul Cheese Slices', brand: 'Amul', category: 'Dairy', price: 135, sku: 'DAI-004', status: 'Available', rackId: 'd02', rackDivision: 2, sectionName: 'Dairy', aisle: 'D02', locationX: 630, locationY: 220 },
    { id: 'p-25', name: 'Mother Dairy Paneer', brand: 'Mother Dairy', category: 'Dairy', price: 85, sku: 'DAI-005', status: 'Available', rackId: 'd02', rackDivision: 3, sectionName: 'Dairy', aisle: 'D02', locationX: 670, locationY: 220 },
    { id: 'p-26', name: 'Nestle Curd', brand: 'Nestle', category: 'Dairy', price: 40, sku: 'DAI-006', status: 'Available', rackId: 'd03', rackDivision: 1, sectionName: 'Dairy', aisle: 'D03', locationX: 760, locationY: 140 },
    { id: 'p-27', name: 'Amul Masti Dahi', brand: 'Amul', category: 'Dairy', price: 35, sku: 'DAI-007', status: 'Out of Stock', rackId: 'd03', rackDivision: 2, sectionName: 'Dairy', aisle: 'D03', locationX: 760, locationY: 180 },
    { id: 'p-28', name: 'Coca Cola 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-001', status: 'Available', rackId: 'b01', rackDivision: 1, sectionName: 'Beverages', aisle: 'B01', locationX: 580, locationY: 340 },
    { id: 'p-29', name: 'Thums Up 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-002', status: 'Available', rackId: 'b01', rackDivision: 2, sectionName: 'Beverages', aisle: 'B01', locationX: 580, locationY: 380 },
    { id: 'p-30', name: 'Sprite 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-003', status: 'Available', rackId: 'b02', rackDivision: 1, sectionName: 'Beverages', aisle: 'B02', locationX: 660, locationY: 340 },
    { id: 'p-31', name: 'Kinley Water 1L', brand: 'Kinley', category: 'Beverages', price: 20, sku: 'BEV-004', status: 'Available', rackId: 'b03', rackDivision: 1, sectionName: 'Beverages', aisle: 'B03', locationX: 740, locationY: 340 },
    { id: 'p-32', name: 'Tropicana Orange', brand: 'Tropicana', category: 'Beverages', price: 110, sku: 'BEV-005', status: 'Low Stock', rackId: 'b04', rackDivision: 1, sectionName: 'Beverages', aisle: 'B04', locationX: 820, locationY: 340 },
    { id: 'p-33', name: 'Real Mixed Fruit', brand: 'Real', category: 'Beverages', price: 110, sku: 'BEV-006', status: 'Available', rackId: 'b04', rackDivision: 2, sectionName: 'Beverages', aisle: 'B04', locationX: 820, locationY: 380 },
    { id: 'p-34', name: 'Red Bull', brand: 'Red Bull', category: 'Beverages', price: 125, sku: 'BEV-007', status: 'Available', rackId: 'b02', rackDivision: 3, sectionName: 'Beverages', aisle: 'B02', locationX: 660, locationY: 410 },
    { id: 'p-49', name: 'Taj Mahal Tea', brand: 'Brooke Bond', category: 'Beverages', price: 260, sku: 'BEV-008', status: 'Available', rackId: 'b03', rackDivision: 3, sectionName: 'Beverages', aisle: 'B03', locationX: 740, locationY: 400 },
    { id: 'p-50', name: 'Nescafe Classic', brand: 'Nescafe', category: 'Beverages', price: 150, sku: 'BEV-009', status: 'Available', rackId: 'b03', rackDivision: 4, sectionName: 'Beverages', aisle: 'B03', locationX: 740, locationY: 420 },
    { id: 'p-35', name: 'Colgate Strong Teeth', brand: 'Colgate', category: 'Personal Care', price: 99, sku: 'PER-001', status: 'Available', rackId: 'p01', rackDivision: 1, sectionName: 'Personal Care', aisle: 'P01', locationX: 130, locationY: 535 },
    { id: 'p-36', name: 'Dove Bathing Bar', brand: 'Dove', category: 'Personal Care', price: 55, sku: 'PER-002', status: 'Available', rackId: 'p01', rackDivision: 3, sectionName: 'Personal Care', aisle: 'P01', locationX: 170, locationY: 535 },
    { id: 'p-37', name: 'Lux Soap', brand: 'Lux', category: 'Personal Care', price: 32, sku: 'PER-003', status: 'Available', rackId: 'p01', rackDivision: 4, sectionName: 'Personal Care', aisle: 'P01', locationX: 210, locationY: 535 },
    { id: 'p-38', name: 'Dettol Liquid Soap', brand: 'Dettol', category: 'Personal Care', price: 99, sku: 'PER-004', status: 'Available', rackId: 'p02', rackDivision: 1, sectionName: 'Personal Care', aisle: 'P02', locationX: 130, locationY: 605 },
    { id: 'p-39', name: 'Head & Shoulders Shampoo', brand: 'Head & Shoulders', category: 'Personal Care', price: 150, sku: 'PER-005', status: 'Available', rackId: 'p02', rackDivision: 3, sectionName: 'Personal Care', aisle: 'P02', locationX: 190, locationY: 605 },
    { id: 'p-40', name: 'Surf Excel Matic', brand: 'Surf Excel', category: 'Cleaning', price: 210, sku: 'CLN-001', status: 'Available', rackId: 'c01', rackDivision: 1, sectionName: 'Cleaning', aisle: 'C01', locationX: 390, locationY: 535 },
    { id: 'p-41', name: 'Ariel Complete', brand: 'Ariel', category: 'Cleaning', price: 195, sku: 'CLN-002', status: 'Available', rackId: 'c01', rackDivision: 3, sectionName: 'Cleaning', aisle: 'C01', locationX: 450, locationY: 535 },
    { id: 'p-42', name: 'Vim Dishwash Gel', brand: 'Vim', category: 'Cleaning', price: 105, sku: 'CLN-003', status: 'Available', rackId: 'c02', rackDivision: 1, sectionName: 'Cleaning', aisle: 'C02', locationX: 390, locationY: 605 },
    { id: 'p-43', name: 'Harpic Toilet Cleaner', brand: 'Harpic', category: 'Cleaning', price: 89, sku: 'CLN-004', status: 'Available', rackId: 'c02', rackDivision: 3, sectionName: 'Cleaning', aisle: 'C02', locationX: 450, locationY: 605 },
    { id: 'p-44', name: 'Lizol Floor Cleaner', brand: 'Lizol', category: 'Cleaning', price: 99, sku: 'CLN-005', status: 'Low Stock', rackId: 'c02', rackDivision: 5, sectionName: 'Cleaning', aisle: 'C02', locationX: 510, locationY: 605 },
    { id: 'p-45', name: 'Scotch Brite Pad', brand: 'Scotch Brite', category: 'Household', price: 25, sku: 'HOU-001', status: 'Available', rackId: 'h01', rackDivision: 1, sectionName: 'Household', aisle: 'H01', locationX: 690, locationY: 535 },
    { id: 'p-46', name: 'Odonil Room Freshener', brand: 'Odonil', category: 'Household', price: 45, sku: 'HOU-002', status: 'Available', rackId: 'h01', rackDivision: 3, sectionName: 'Household', aisle: 'H01', locationX: 750, locationY: 535 },
    { id: 'p-47', name: 'Hit Cockroach Spray', brand: 'Hit', category: 'Household', price: 180, sku: 'HOU-003', status: 'Available', rackId: 'h02', rackDivision: 1, sectionName: 'Household', aisle: 'H02', locationX: 690, locationY: 605 },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
