import { Product, NavGraph, RouteResult } from '../../types';
import { findPathAStar } from './astar';
import { optimizeStops } from './optimizeStops';

export function buildRoute(products: Product[], graph: NavGraph): RouteResult | null {
  if (products.length === 0) return null;
  
  const stops = optimizeStops(products, graph);
  const fullPath = [];
  let totalDistance = 0;
  
  for (let i = 0; i < stops.length - 1; i++) {
    const startNode = stops[i].nodeId;
    const endNode = stops[i+1].nodeId;
    
    const segment = findPathAStar(graph, startNode, endNode);
    if (!segment) {
      console.error(`Could not find path from ${startNode} to ${endNode}`);
      continue;
    }
    
    // Add segment to full path (avoid duplicating nodes at joints)
    if (i === 0) {
      fullPath.push(...segment);
    } else {
      fullPath.push(...segment.slice(1));
    }
    
    // Approximate segment distance
    for (let j = 0; j < segment.length - 1; j++) {
      totalDistance += Math.hypot(segment[j].x - segment[j+1].x, segment[j].y - segment[j+1].y);
    }
  }
  
  return {
    path: fullPath,
    distance: Math.round(totalDistance / 10), // Scale down slightly to represent 'meters' better
    stops: stops
  };
}
