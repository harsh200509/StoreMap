import { NavGraph, NavNode, NavEdge } from '../types';
import { ENTRANCE, CHECKOUT } from './store';

const pathXs = [60, 140, 220, 300, 380, 460, 540, 620, 700, 780, 860];
const pathYs = [60, 260, 460, 660];

const nodes: Record<string, NavNode> = {};
const edges: Record<string, NavEdge[]> = {};

// Create grid nodes
pathXs.forEach((x, xi) => {
  pathYs.forEach((y, yi) => {
    const id = `n_${xi}_${yi}`;
    nodes[id] = { id, x, y, type: 'path' };
    edges[id] = [];
  });
});

// Add entrance and checkout
nodes['entrance'] = { id: 'entrance', x: ENTRANCE.x, y: ENTRANCE.y, type: 'entrance', label: 'Entrance' };
edges['entrance'] = [];
nodes['checkout'] = { id: 'checkout', x: CHECKOUT.x, y: CHECKOUT.y, type: 'checkout', label: 'Checkout' };
edges['checkout'] = [];

// Connect entrance to nearest grid node (xi=0, yi=3)
edges['entrance'].push({ from: 'entrance', to: 'n_0_3', distance: Math.hypot(ENTRANCE.x - pathXs[0], ENTRANCE.y - pathYs[3]) });
edges['n_0_3'].push({ from: 'n_0_3', to: 'entrance', distance: Math.hypot(ENTRANCE.x - pathXs[0], ENTRANCE.y - pathYs[3]) });

// Connect checkout to nearest grid node (xi=9, yi=3)
edges['checkout'].push({ from: 'checkout', to: 'n_9_3', distance: Math.hypot(CHECKOUT.x - pathXs[9], CHECKOUT.y - pathYs[3]) });
edges['n_9_3'].push({ from: 'n_9_3', to: 'checkout', distance: Math.hypot(CHECKOUT.x - pathXs[9], CHECKOUT.y - pathYs[3]) });

// Connect grid edges
pathXs.forEach((x, xi) => {
  pathYs.forEach((y, yi) => {
    const id = `n_${xi}_${yi}`;
    
    // Connect to right neighbor
    if (xi < pathXs.length - 1) {
      const rightId = `n_${xi + 1}_${yi}`;
      const dist = Math.hypot(pathXs[xi + 1] - x, 0);
      edges[id].push({ from: id, to: rightId, distance: dist });
      edges[rightId].push({ from: rightId, to: id, distance: dist });
    }
    
    // Connect to bottom neighbor
    if (yi < pathYs.length - 1) {
      const bottomId = `n_${xi}_${yi + 1}`;
      const dist = Math.hypot(0, pathYs[yi + 1] - y);
      edges[id].push({ from: id, to: bottomId, distance: dist });
      edges[bottomId].push({ from: bottomId, to: id, distance: dist });
    }
  });
});

export const navGraph: NavGraph = { nodes, edges };

// Helper to find nearest node to a product
export function findNearestNode(x: number, y: number): string {
  let minDistance = Infinity;
  let nearestNode = '';
  
  Object.values(nodes).forEach(node => {
    const dist = Math.hypot(node.x - x, node.y - y);
    if (dist < minDistance) {
      minDistance = dist;
      nearestNode = node.id;
    }
  });
  
  return nearestNode;
}
