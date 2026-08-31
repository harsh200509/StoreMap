import { NavGraph, NavNode } from '../../types';

export function heuristic(a: NavNode, b: NavNode): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function findPathAStar(graph: NavGraph, startId: string, goalId: string): NavNode[] | null {
  const openSet = new Set<string>([startId]);
  const cameFrom = new Map<string, string>();
  
  const gScore = new Map<string, number>();
  gScore.set(startId, 0);
  
  const fScore = new Map<string, number>();
  fScore.set(startId, heuristic(graph.nodes[startId], graph.nodes[goalId]));
  
  while (openSet.size > 0) {
    let currentId = '';
    let minF = Infinity;
    
    // Find node in openSet with lowest fScore
    openSet.forEach(id => {
      const score = fScore.get(id) ?? Infinity;
      if (score < minF) {
        minF = score;
        currentId = id;
      }
    });
    
    if (currentId === goalId) {
      return reconstructPath(cameFrom, currentId, graph);
    }
    
    openSet.delete(currentId);
    
    const neighbors = graph.edges[currentId] || [];
    for (const edge of neighbors) {
      const tentativeG = (gScore.get(currentId) ?? Infinity) + edge.distance;
      
      if (tentativeG < (gScore.get(edge.to) ?? Infinity)) {
        cameFrom.set(edge.to, currentId);
        gScore.set(edge.to, tentativeG);
        fScore.set(edge.to, tentativeG + heuristic(graph.nodes[edge.to], graph.nodes[goalId]));
        
        if (!openSet.has(edge.to)) {
          openSet.add(edge.to);
        }
      }
    }
  }
  
  return null;
}

function reconstructPath(cameFrom: Map<string, string>, currentId: string, graph: NavGraph): NavNode[] {
  const totalPath = [graph.nodes[currentId]];
  while (cameFrom.has(currentId)) {
    currentId = cameFrom.get(currentId)!;
    totalPath.unshift(graph.nodes[currentId]);
  }
  return totalPath;
}
