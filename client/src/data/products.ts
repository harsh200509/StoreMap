import { Product } from '../types';

export const products: Product[] = [
  // Grocery (Aisles A01-A05)
  { id: 'p-1', name: 'Aashirvaad Superior MP Atta', brand: 'Aashirvaad', category: 'Grocery', price: 250, sku: 'GRO-001', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A03', rack: 'R01', shelf: 'S02', x: 260, y: 150 } },
  { id: 'p-2', name: 'Tata Salt', brand: 'Tata', category: 'Grocery', price: 28, sku: 'GRO-002', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A01', rack: 'R02', shelf: 'S01', x: 100, y: 150 } },
  { id: 'p-3', name: 'Fortune Sunflower Oil', brand: 'Fortune', category: 'Grocery', price: 145, sku: 'GRO-003', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A05', rack: 'R01', shelf: 'S01', x: 420, y: 130 } },
  { id: 'p-4', name: 'India Gate Basmati Rice', brand: 'India Gate', category: 'Grocery', price: 450, sku: 'GRO-004', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A02', rack: 'R03', shelf: 'S02', x: 180, y: 170 } },
  { id: 'p-5', name: 'Everest Turmeric Powder', brand: 'Everest', category: 'Grocery', price: 65, sku: 'GRO-005', status: 'Low Stock', location: { floor: 1, section: 'Grocery', aisle: 'A01', rack: 'R04', shelf: 'S03', x: 100, y: 200 } },
  { id: 'p-6', name: 'Catch Coriander Powder', brand: 'Catch', category: 'Grocery', price: 55, sku: 'GRO-006', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A01', rack: 'R04', shelf: 'S04', x: 100, y: 210 } },
  { id: 'p-7', name: 'Toor Dal', brand: 'Tata Sampann', category: 'Grocery', price: 170, sku: 'GRO-007', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A04', rack: 'R01', shelf: 'S01', x: 340, y: 140 } },
  { id: 'p-8', name: 'Moong Dal', brand: 'Tata Sampann', category: 'Grocery', price: 140, sku: 'GRO-008', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A04', rack: 'R02', shelf: 'S01', x: 340, y: 160 } },
  { id: 'p-9', name: 'Sugar', brand: 'Madhur', category: 'Grocery', price: 50, sku: 'GRO-009', status: 'Available', location: { floor: 1, section: 'Grocery', aisle: 'A02', rack: 'R01', shelf: 'S01', x: 180, y: 130 } },
  { id: 'p-10', name: 'Chana Dal', brand: 'Tata Sampann', category: 'Grocery', price: 120, sku: 'GRO-010', status: 'Out of Stock', location: { floor: 1, section: 'Grocery', aisle: 'A04', rack: 'R03', shelf: 'S02', x: 340, y: 180 } },
  
  // Snacks (Aisles A06-A10)
  { id: 'p-11', name: 'Maggi 2-Minute Noodles', brand: 'Maggi', category: 'Snacks', price: 14, sku: 'SNA-001', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A07', rack: 'R02', shelf: 'S03', x: 180, y: 350 } },
  { id: 'p-12', name: 'Parle-G', brand: 'Parle', category: 'Snacks', price: 10, sku: 'SNA-002', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A06', rack: 'R01', shelf: 'S01', x: 100, y: 330 } },
  { id: 'p-13', name: 'Britannia Good Day', brand: 'Britannia', category: 'Snacks', price: 20, sku: 'SNA-003', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A06', rack: 'R02', shelf: 'S02', x: 100, y: 360 } },
  { id: 'p-14', name: 'Lays Classic Salted', brand: 'Lays', category: 'Snacks', price: 20, sku: 'SNA-004', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A08', rack: 'R01', shelf: 'S01', x: 260, y: 340 } },
  { id: 'p-15', name: 'Lays Magic Masala', brand: 'Lays', category: 'Snacks', price: 20, sku: 'SNA-005', status: 'Low Stock', location: { floor: 1, section: 'Snacks', aisle: 'A08', rack: 'R01', shelf: 'S02', x: 260, y: 350 } },
  { id: 'p-16', name: 'Kurkure Masala Munch', brand: 'Kurkure', category: 'Snacks', price: 20, sku: 'SNA-006', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A08', rack: 'R02', shelf: 'S01', x: 260, y: 380 } },
  { id: 'p-17', name: 'Haldiram Aloo Bhujia', brand: 'Haldiram', category: 'Snacks', price: 50, sku: 'SNA-007', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A09', rack: 'R01', shelf: 'S01', x: 340, y: 340 } },
  { id: 'p-18', name: 'Haldiram Moong Dal', brand: 'Haldiram', category: 'Snacks', price: 50, sku: 'SNA-008', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A09', rack: 'R02', shelf: 'S01', x: 340, y: 370 } },
  { id: 'p-19', name: 'Sunfeast Dark Fantasy', brand: 'Sunfeast', category: 'Snacks', price: 30, sku: 'SNA-009', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A06', rack: 'R03', shelf: 'S03', x: 100, y: 400 } },
  { id: 'p-20', name: 'Oreo Original', brand: 'Cadbury', category: 'Snacks', price: 30, sku: 'SNA-010', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A06', rack: 'R04', shelf: 'S01', x: 100, y: 420 } },
  { id: 'p-48', name: 'Kissan Tomato Ketchup', brand: 'Kissan', category: 'Snacks', price: 110, sku: 'SNA-011', status: 'Available', location: { floor: 1, section: 'Snacks', aisle: 'A10', rack: 'R01', shelf: 'S01', x: 420, y: 340 } },

  // Dairy (D01-D03)
  { id: 'p-21', name: 'Amul Taaza Milk', brand: 'Amul', category: 'Dairy', price: 54, sku: 'DAI-001', status: 'Available', location: { floor: 1, section: 'Dairy', aisle: 'D01', rack: 'R01', shelf: 'S01', x: 590, y: 140 } },
  { id: 'p-22', name: 'Amul Gold Milk', brand: 'Amul', category: 'Dairy', price: 66, sku: 'DAI-002', status: 'Low Stock', location: { floor: 1, section: 'Dairy', aisle: 'D01', rack: 'R02', shelf: 'S01', x: 630, y: 140 } },
  { id: 'p-23', name: 'Amul Butter', brand: 'Amul', category: 'Dairy', price: 56, sku: 'DAI-003', status: 'Available', location: { floor: 1, section: 'Dairy', aisle: 'D02', rack: 'R01', shelf: 'S01', x: 590, y: 220 } },
  { id: 'p-24', name: 'Amul Cheese Slices', brand: 'Amul', category: 'Dairy', price: 135, sku: 'DAI-004', status: 'Available', location: { floor: 1, section: 'Dairy', aisle: 'D02', rack: 'R02', shelf: 'S01', x: 630, y: 220 } },
  { id: 'p-25', name: 'Mother Dairy Paneer', brand: 'Mother Dairy', category: 'Dairy', price: 85, sku: 'DAI-005', status: 'Available', location: { floor: 1, section: 'Dairy', aisle: 'D02', rack: 'R03', shelf: 'S01', x: 670, y: 220 } },
  { id: 'p-26', name: 'Nestle Curd', brand: 'Nestle', category: 'Dairy', price: 40, sku: 'DAI-006', status: 'Available', location: { floor: 1, section: 'Dairy', aisle: 'D03', rack: 'R01', shelf: 'S01', x: 760, y: 140 } },
  { id: 'p-27', name: 'Amul Masti Dahi', brand: 'Amul', category: 'Dairy', price: 35, sku: 'DAI-007', status: 'Out of Stock', location: { floor: 1, section: 'Dairy', aisle: 'D03', rack: 'R02', shelf: 'S01', x: 760, y: 180 } },

  // Beverages (B01-B04)
  { id: 'p-28', name: 'Coca Cola 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-001', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B01', rack: 'R01', shelf: 'S01', x: 580, y: 340 } },
  { id: 'p-29', name: 'Thums Up 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-002', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B01', rack: 'R02', shelf: 'S01', x: 580, y: 380 } },
  { id: 'p-30', name: 'Sprite 1.5L', brand: 'Coca Cola', category: 'Beverages', price: 90, sku: 'BEV-003', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B02', rack: 'R01', shelf: 'S01', x: 660, y: 340 } },
  { id: 'p-31', name: 'Kinley Water 1L', brand: 'Kinley', category: 'Beverages', price: 20, sku: 'BEV-004', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B03', rack: 'R01', shelf: 'S01', x: 740, y: 340 } },
  { id: 'p-32', name: 'Tropicana Orange', brand: 'Tropicana', category: 'Beverages', price: 110, sku: 'BEV-005', status: 'Low Stock', location: { floor: 1, section: 'Beverages', aisle: 'B04', rack: 'R01', shelf: 'S01', x: 820, y: 340 } },
  { id: 'p-33', name: 'Real Mixed Fruit', brand: 'Real', category: 'Beverages', price: 110, sku: 'BEV-006', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B04', rack: 'R02', shelf: 'S01', x: 820, y: 380 } },
  { id: 'p-34', name: 'Red Bull', brand: 'Red Bull', category: 'Beverages', price: 125, sku: 'BEV-007', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B02', rack: 'R03', shelf: 'S01', x: 660, y: 410 } },
  { id: 'p-49', name: 'Taj Mahal Tea', brand: 'Brooke Bond', category: 'Beverages', price: 260, sku: 'BEV-008', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B03', rack: 'R03', shelf: 'S02', x: 740, y: 400 } },
  { id: 'p-50', name: 'Nescafe Classic', brand: 'Nescafe', category: 'Beverages', price: 150, sku: 'BEV-009', status: 'Available', location: { floor: 1, section: 'Beverages', aisle: 'B03', rack: 'R04', shelf: 'S01', x: 740, y: 420 } },

  // Personal Care (P01-P02)
  { id: 'p-35', name: 'Colgate Strong Teeth', brand: 'Colgate', category: 'Personal Care', price: 99, sku: 'PER-001', status: 'Available', location: { floor: 1, section: 'Personal Care', aisle: 'P01', rack: 'R01', shelf: 'S01', x: 130, y: 535 } },
  { id: 'p-36', name: 'Dove Bathing Bar', brand: 'Dove', category: 'Personal Care', price: 55, sku: 'PER-002', status: 'Available', location: { floor: 1, section: 'Personal Care', aisle: 'P01', rack: 'R03', shelf: 'S01', x: 170, y: 535 } },
  { id: 'p-37', name: 'Lux Soap', brand: 'Lux', category: 'Personal Care', price: 32, sku: 'PER-003', status: 'Available', location: { floor: 1, section: 'Personal Care', aisle: 'P01', rack: 'R04', shelf: 'S01', x: 210, y: 535 } },
  { id: 'p-38', name: 'Dettol Liquid Soap', brand: 'Dettol', category: 'Personal Care', price: 99, sku: 'PER-004', status: 'Available', location: { floor: 1, section: 'Personal Care', aisle: 'P02', rack: 'R01', shelf: 'S01', x: 130, y: 605 } },
  { id: 'p-39', name: 'Head & Shoulders Shampoo', brand: 'Head & Shoulders', category: 'Personal Care', price: 150, sku: 'PER-005', status: 'Available', location: { floor: 1, section: 'Personal Care', aisle: 'P02', rack: 'R03', shelf: 'S01', x: 190, y: 605 } },
  
  // Cleaning (C01-C02)
  { id: 'p-40', name: 'Surf Excel Matic', brand: 'Surf Excel', category: 'Cleaning', price: 210, sku: 'CLN-001', status: 'Available', location: { floor: 1, section: 'Cleaning', aisle: 'C01', rack: 'R01', shelf: 'S01', x: 390, y: 535 } },
  { id: 'p-41', name: 'Ariel Complete', brand: 'Ariel', category: 'Cleaning', price: 195, sku: 'CLN-002', status: 'Available', location: { floor: 1, section: 'Cleaning', aisle: 'C01', rack: 'R03', shelf: 'S01', x: 450, y: 535 } },
  { id: 'p-42', name: 'Vim Dishwash Gel', brand: 'Vim', category: 'Cleaning', price: 105, sku: 'CLN-003', status: 'Available', location: { floor: 1, section: 'Cleaning', aisle: 'C02', rack: 'R01', shelf: 'S01', x: 390, y: 605 } },
  { id: 'p-43', name: 'Harpic Toilet Cleaner', brand: 'Harpic', category: 'Cleaning', price: 89, sku: 'CLN-004', status: 'Available', location: { floor: 1, section: 'Cleaning', aisle: 'C02', rack: 'R03', shelf: 'S01', x: 450, y: 605 } },
  { id: 'p-44', name: 'Lizol Floor Cleaner', brand: 'Lizol', category: 'Cleaning', price: 99, sku: 'CLN-005', status: 'Low Stock', location: { floor: 1, section: 'Cleaning', aisle: 'C02', rack: 'R05', shelf: 'S01', x: 510, y: 605 } },
  
  // Household (H01-H02)
  { id: 'p-45', name: 'Scotch Brite Pad', brand: 'Scotch Brite', category: 'Household', price: 25, sku: 'HOU-001', status: 'Available', location: { floor: 1, section: 'Household', aisle: 'H01', rack: 'R01', shelf: 'S01', x: 690, y: 535 } },
  { id: 'p-46', name: 'Odonil Room Freshener', brand: 'Odonil', category: 'Household', price: 45, sku: 'HOU-002', status: 'Available', location: { floor: 1, section: 'Household', aisle: 'H01', rack: 'R03', shelf: 'S01', x: 750, y: 535 } },
  { id: 'p-47', name: 'Hit Cockroach Spray', brand: 'Hit', category: 'Household', price: 180, sku: 'HOU-003', status: 'Available', location: { floor: 1, section: 'Household', aisle: 'H02', rack: 'R01', shelf: 'S01', x: 690, y: 605 } },
];
