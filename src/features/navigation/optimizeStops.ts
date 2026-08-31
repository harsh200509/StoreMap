import { Product, NavGraph } from '../../types';
import { findNearestNode } from '../../data/navigationGraph';

export interface StopInfo {
  product?: Product;
  nodeId: string;
  type: 'entrance' | 'checkout' | 'product';
}

export function optimizeStops(products: Product[], graph: NavGraph): StopInfo[] {
  // Nearest Neighbor Heuristic
  const unvisited = products.map(p => ({
    product: p,
    nodeId: findNearestNode(p.location.x, p.location.y),
    type: 'product' as const
  }));
  
  const stops: StopInfo[] = [
    { nodeId: 'entrance', type: 'entrance' }
  ];
  
  let currentNodeId = 'entrance';
  
  while (unvisited.length > 0) {
    let nearestIdx = -1;
    let minDistance = Infinity;
    
    for (let i = 0; i < unvisited.length; i++) {
      const candidateNode = graph.nodes[unvisited[i].nodeId];
      const currentNode = graph.nodes[currentNodeId];
      
      const dist = Math.hypot(currentNode.x - candidateNode.x, currentNode.y - candidateNode.y);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIdx = i;
      }
    }
    
    if (nearestIdx !== -1) {
      const nextStop = unvisited.splice(nearestIdx, 1)[0];
      stops.push(nextStop);
      currentNodeId = nextStop.nodeId;
    } else {
      break;
    }
  }
  
  stops.push({ nodeId: 'checkout', type: 'checkout' });
  return stops;
}
