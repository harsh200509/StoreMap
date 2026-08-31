export type Category = 
  | 'Grocery' 
  | 'Dairy' 
  | 'Snacks' 
  | 'Beverages' 
  | 'Personal Care' 
  | 'Cleaning' 
  | 'Household';

export type Availability = 'Available' | 'Low Stock' | 'Out of Stock';

export interface ProductLocation {
  floor: number;
  section: string;
  aisle: string;
  rack: string;
  shelf: string;
  x: number;
  y: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  sku: string;
  status: Availability;
  location: ProductLocation;
}

export interface NavNode {
  id: string;
  x: number;
  y: number;
  label?: string;
  type: 'path' | 'product' | 'entrance' | 'checkout';
}

export interface NavEdge {
  from: string;
  to: string;
  distance: number;
}

export interface NavGraph {
  nodes: Record<string, NavNode>;
  edges: Record<string, NavEdge[]>;
}

export interface RouteStop {
  product?: Product;
  nodeId: string;
  type: 'entrance' | 'checkout' | 'product';
}

export interface RouteResult {
  path: NavNode[];
  distance: number;
  stops: RouteStop[];
}
