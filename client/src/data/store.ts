export const STORE_WIDTH = 1000;
export const STORE_HEIGHT = 800;

export interface MapSection {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface MapAisle {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  sectionId: string;
}

export const sections: MapSection[] = [
  { id: 'sec-grocery', name: 'Grocery', x: 80, y: 80, width: 440, height: 180, color: 'bg-orange-100/50' },
  { id: 'sec-snacks', name: 'Snacks', x: 80, y: 280, width: 440, height: 180, color: 'bg-yellow-100/50' },
  { id: 'sec-dairy', name: 'Dairy', x: 560, y: 80, width: 360, height: 180, color: 'bg-blue-100/50' },
  { id: 'sec-beverages', name: 'Beverages', x: 560, y: 280, width: 360, height: 180, color: 'bg-purple-100/50' },
  { id: 'sec-personal', name: 'Personal Care', x: 80, y: 480, width: 240, height: 180, color: 'bg-pink-100/50' },
  { id: 'sec-cleaning', name: 'Cleaning', x: 360, y: 480, width: 240, height: 180, color: 'bg-teal-100/50' },
  { id: 'sec-household', name: 'Household', x: 640, y: 480, width: 280, height: 180, color: 'bg-gray-100/50' },
];

export const aisles: MapAisle[] = [
  // Grocery
  { id: 'a01', name: 'A01', x: 100, y: 120, width: 40, height: 120, sectionId: 'sec-grocery' },
  { id: 'a02', name: 'A02', x: 180, y: 120, width: 40, height: 120, sectionId: 'sec-grocery' },
  { id: 'a03', name: 'A03', x: 260, y: 120, width: 40, height: 120, sectionId: 'sec-grocery' },
  { id: 'a04', name: 'A04', x: 340, y: 120, width: 40, height: 120, sectionId: 'sec-grocery' },
  { id: 'a05', name: 'A05', x: 420, y: 120, width: 40, height: 120, sectionId: 'sec-grocery' },
  
  // Snacks
  { id: 'a06', name: 'A06', x: 100, y: 320, width: 40, height: 120, sectionId: 'sec-snacks' },
  { id: 'a07', name: 'A07', x: 180, y: 320, width: 40, height: 120, sectionId: 'sec-snacks' },
  { id: 'a08', name: 'A08', x: 260, y: 320, width: 40, height: 120, sectionId: 'sec-snacks' },
  { id: 'a09', name: 'A09', x: 340, y: 320, width: 40, height: 120, sectionId: 'sec-snacks' },
  { id: 'a10', name: 'A10', x: 420, y: 320, width: 40, height: 120, sectionId: 'sec-snacks' },
  
  // Dairy (Wall-based mostly, but let's add some displays)
  { id: 'd01', name: 'D01', x: 580, y: 120, width: 140, height: 40, sectionId: 'sec-dairy' },
  { id: 'd02', name: 'D02', x: 580, y: 200, width: 140, height: 40, sectionId: 'sec-dairy' },
  { id: 'd03', name: 'D03', x: 760, y: 120, width: 40, height: 120, sectionId: 'sec-dairy' },

  // Beverages
  { id: 'b01', name: 'B01', x: 580, y: 320, width: 40, height: 120, sectionId: 'sec-beverages' },
  { id: 'b02', name: 'B02', x: 660, y: 320, width: 40, height: 120, sectionId: 'sec-beverages' },
  { id: 'b03', name: 'B03', x: 740, y: 320, width: 40, height: 120, sectionId: 'sec-beverages' },
  { id: 'b04', name: 'B04', x: 820, y: 320, width: 40, height: 120, sectionId: 'sec-beverages' },
  
  // Personal Care
  { id: 'p01', name: 'P01', x: 120, y: 520, width: 160, height: 30, sectionId: 'sec-personal' },
  { id: 'p02', name: 'P02', x: 120, y: 590, width: 160, height: 30, sectionId: 'sec-personal' },
  
  // Cleaning
  { id: 'c01', name: 'C01', x: 380, y: 520, width: 180, height: 30, sectionId: 'sec-cleaning' },
  { id: 'c02', name: 'C02', x: 380, y: 590, width: 180, height: 30, sectionId: 'sec-cleaning' },
  
  // Household
  { id: 'h01', name: 'H01', x: 680, y: 520, width: 180, height: 30, sectionId: 'sec-household' },
  { id: 'h02', name: 'H02', x: 680, y: 590, width: 180, height: 30, sectionId: 'sec-household' },
];

export const ENTRANCE = { x: 100, y: 760 };
export const CHECKOUT = { x: 800, y: 700 };
