import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useStoreData } from '../../../stores/storeDataStore';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useRealLocation } from '../../../hooks/useRealLocation';
import { LocateFixed, Locate } from 'lucide-react';

export function StoreMap() {
  const { selectedProduct, showAllOnMap, activeRoute, currentStopIndex, setSelectedProduct, userLocation } = useMapStore();
  const { items, collectedIds } = useShoppingListStore();
  const { sections, racks: aisles, entrance: ENTRANCE, checkout: CHECKOUT, fetchData } = useStoreData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeAisle = selectedProduct?.location.aisle;

  // GPS State
  const [useRealGPS, setUseRealGPS] = useState(false);
  const { error: gpsError, isTracking, accuracy } = useRealLocation(useRealGPS);

  // Transform-based Pan and Zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const { setUserLocation } = useMapStore();

  // Multi-touch tracking
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());

  // Auto-pan to follow user location when GPS is active
  useEffect(() => {
    if (useRealGPS && userLocation) {
      setPan({
        x: 500 - userLocation.x,
        y: 400 - userLocation.y,
      });
    }
  }, [userLocation, useRealGPS]);

  // Set initial zoom based on screen size
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    setZoom(isMobile ? 0.85 : 1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mapRef.current) mapRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    const oldPointer = pointers.current.get(e.pointerId);
    if (!oldPointer) return;

    if (pointers.current.size === 1) {
      const dx = e.clientX - oldPointer.x;
      const dy = e.clientY - oldPointer.y;
      setPan((prev) => ({ x: prev.x + dx / zoom, y: prev.y + dy / zoom }));
    } else if (pointers.current.size === 2) {
      const pts = Array.from(pointers.current.values()) as { x: number; y: number }[];
      const other = pts.find((p) => p.x !== oldPointer.x || p.y !== oldPointer.y);
      if (other) {
        const oldDist = Math.hypot(oldPointer.x - other.x, oldPointer.y - other.y);
        const newDist = Math.hypot(e.clientX - other.x, e.clientY - other.y);
        if (oldDist > 0) {
          setZoom((z) => Math.min(Math.max(z * (newDist / oldDist), 0.4), 4));
        }
      }
    }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (mapRef.current) mapRef.current.releasePointerCapture(e.pointerId);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const factor = 1.1;
    setZoom((z) =>
      e.deltaY < 0 ? Math.min(z * factor, 3) : Math.max(z / factor, 0.4)
    );
  };

  const listMarkers = useMemo(() => {
    if (!showAllOnMap && !activeRoute) return [];
    return items;
  }, [showAllOnMap, activeRoute, items]);

  const groupedMarkers = useMemo(() => {
    const groups = new Map<string, typeof listMarkers>();
    listMarkers.forEach((p) => {
      const key = `${p.location.x},${p.location.y}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    });
    return Array.from(groups.entries()).map(([key, prods]) => {
      const [x, y] = key.split(',').map(Number);
      return { x, y, products: prods };
    });
  }, [listMarkers]);

  const displayPath = useMemo(() => {
    if (!activeRoute) return null;
    if (userLocation && activeRoute.path.length > 1) {
      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < activeRoute.path.length; i++) {
        const p = activeRoute.path[i];
        const d = Math.hypot(p.x - userLocation.x, p.y - userLocation.y);
        if (d < minDist) { minDist = d; closestIdx = i; }
      }
      return [userLocation, ...activeRoute.path.slice(closestIdx)];
    }
    return activeRoute.path;
  }, [activeRoute, userLocation]);

  return (
    <div
      className="w-full h-full bg-gray-50 flex overflow-hidden relative touch-none cursor-grab active:cursor-grabbing"
      ref={mapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* GPS Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 items-end">
        {gpsError && useRealGPS && (
          <div className="bg-red-50 text-red-600 text-[10px] px-2 py-1 rounded shadow-sm border border-red-100 max-w-[140px] text-center">
            {gpsError}
          </div>
        )}
        {useRealGPS && isTracking && accuracy !== null && (
          <div className="bg-white/90 backdrop-blur text-[10px] font-semibold text-gray-600 px-2.5 py-1 rounded-full shadow-sm border border-gray-200">
            ±{Math.round(accuracy)}m
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setUseRealGPS((g) => !g); if (useRealGPS) setUserLocation(null); }}
          className={`h-12 w-12 rounded-full shadow-md flex items-center justify-center transition-colors border ${
            useRealGPS
              ? isTracking
                ? 'bg-purple-100 border-purple-300 text-purple-700'
                : 'bg-yellow-50 border-yellow-300 text-yellow-600'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
          title={useRealGPS ? 'Disable GPS' : 'Enable GPS Tracking'}
        >
          {useRealGPS ? <LocateFixed className="h-5 w-5" /> : <Locate className="h-5 w-5" />}
        </button>
      </div>

      <div
        className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] bg-white sm:rounded-2xl shadow-sm border border-gray-200"
        style={{
          transform: `translate(calc(-50% + ${pan.x * zoom}px), calc(-50% + ${pan.y * zoom}px)) scale(${zoom})`,
          transformOrigin: 'center',
          transition: pointers.current.size > 0 ? 'none' : useRealGPS ? 'transform 1s cubic-bezier(0.33, 1, 0.68, 1)' : 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 1000 800" className="w-full h-full select-none">
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="#f8fafc" />

          {/* Sections */}
          {sections.map((sec) => (
            <g key={sec.id}>
              <rect
                x={sec.x} y={sec.y} width={sec.width} height={sec.height}
                fill={sec.color || '#f1f5f9'} stroke="#e2e8f0" strokeWidth="1"
                strokeDasharray="4 4" rx="8"
              />
              <text x={sec.x + 8} y={sec.y + 20} fill="#94a3b8" fontSize="14" fontWeight="500">
                {sec.name}
              </text>
            </g>
          ))}

          {/* Racks/Aisles */}
          {aisles.map((aisle) => {
            const isHighlighted = aisle.name === activeAisle;
            return (
              <g key={aisle.id} className="transition-all duration-300">
                <rect
                  x={aisle.x} y={aisle.y} width={aisle.width} height={aisle.height}
                  fill={isHighlighted ? '#f3e8ff' : '#e2e8f0'}
                  stroke={isHighlighted ? '#9333ea' : '#cbd5e1'}
                  strokeWidth={isHighlighted ? '2' : '1'} rx="4"
                />
                {Array.from({ length: Math.max(1, aisle.divisions || 5) }).map((_, i) => {
                  if (aisle.orientation === 'vertical') {
                    const h = aisle.height / (aisle.divisions || 5);
                    return i > 0 ? (
                      <line key={i} x1={aisle.x} y1={aisle.y + i * h} x2={aisle.x + aisle.width} y2={aisle.y + i * h}
                        stroke={isHighlighted ? '#d8b4fe' : '#cbd5e1'} strokeWidth="1" className="pointer-events-none opacity-50" />
                    ) : null;
                  } else {
                    const w = aisle.width / (aisle.divisions || 5);
                    return i > 0 ? (
                      <line key={i} x1={aisle.x + i * w} y1={aisle.y} x2={aisle.x + i * w} y2={aisle.y + aisle.height}
                        stroke={isHighlighted ? '#d8b4fe' : '#cbd5e1'} strokeWidth="1" className="pointer-events-none opacity-50" />
                    ) : null;
                  }
                })}
                <text
                  x={aisle.x + aisle.width / 2} y={aisle.y + aisle.height / 2}
                  textAnchor="middle" alignmentBaseline="middle"
                  fill={isHighlighted ? '#7e22ce' : '#64748b'} fontSize="12" fontWeight="bold"
                >
                  {aisle.name}
                </text>
              </g>
            );
          })}

          {/* Entrance & Checkout */}
          {ENTRANCE && (
            <>
              <rect x={ENTRANCE.x - 40} y={ENTRANCE.y} width="80" height="20" fill="#22c55e" rx="4" opacity="0.8" />
              <text x={ENTRANCE.x} y={ENTRANCE.y + 14} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Entrance</text>
            </>
          )}
          {CHECKOUT && (
            <>
              <rect x={CHECKOUT.x - 50} y={CHECKOUT.y} width="100" height="40" fill="#9333ea" rx="4" opacity="0.8" />
              <text x={CHECKOUT.x} y={CHECKOUT.y + 24} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Checkout</text>
            </>
          )}

          {/* Route Path */}
          {displayPath && displayPath.length > 1 && (
            <path
              d={`M ${displayPath.map((p) => `${p.x},${p.y}`).join(' L ')}`}
              fill="none" stroke="#9333ea" strokeWidth="6"
              strokeLinejoin="round" strokeLinecap="round" opacity="0.5"
            />
          )}

          {/* Product Markers */}
          {(showAllOnMap || activeRoute) && groupedMarkers.map((group, idx) => {
            let isCurrentStop = false;
            if (activeRoute) {
              const sIdx = activeRoute.stops.findIndex(
                (s) => s.product?.location.x === group.x && s.product?.location.y === group.y
              );
              isCurrentStop = sIdx === currentStopIndex;
            }
            const yOffset = -14 - (group.products.length - 1) * 14;
            const height = Math.max(28, group.products.length * 30);
            const allCollected = group.products.every((p) => collectedIds.has(p.id));
            return (
              <g key={`group-${idx}`} transform={`translate(${group.x}, ${group.y})`} style={{ transition: 'all 0.3s ease' }}>
                <circle
                  cx="0" cy="0" r={isCurrentStop && !allCollected ? '10' : '8'}
                  fill={allCollected ? '#d1d5db' : isCurrentStop ? '#22c55e' : '#a855f7'}
                  stroke="white" strokeWidth="2" className="drop-shadow-sm pointer-events-none"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <foreignObject x="12" y={yOffset} width="200" height={height} className="overflow-visible pointer-events-none">
                  <div className="flex flex-col gap-1 justify-center h-full">
                    {group.products.map((product) => {
                      const collected = collectedIds.has(product.id);
                      return (
                        <div
                          key={product.id}
                          onClick={(e) => { e.stopPropagation(); setSelectedProduct(product, 'map'); }}
                          className={`pointer-events-auto cursor-pointer shadow-sm border px-2.5 py-1 rounded-full whitespace-nowrap w-fit transition-colors text-xs font-bold ${
                            collected
                              ? 'bg-gray-100/90 border-gray-200 text-gray-400 line-through backdrop-blur hover:bg-gray-200/90'
                              : 'bg-white/95 border-gray-200 text-gray-800 backdrop-blur hover:bg-purple-50'
                          }`}
                        >
                          {product.name}
                        </div>
                      );
                    })}
                  </div>
                </foreignObject>
              </g>
            );
          })}

          {/* User Location Dot */}
          {userLocation && (
            <g
              transform={`translate(${userLocation.x}, ${userLocation.y})`}
              className="pointer-events-none"
              style={{ transition: 'transform 1s cubic-bezier(0.33, 1, 0.68, 1)' }}
            >
              {/* Accuracy halo */}
              {useRealGPS && <circle cx="0" cy="0" r="60" fill="#3b82f6" opacity="0.08" className="animate-pulse" />}
              {/* Pulse ring */}
              <circle cx="0" cy="0" r="20" fill="#9333ea" opacity="0.18" className="animate-pulse" />
              {/* Dot */}
              <circle cx="0" cy="0" r="8" fill="#9333ea" stroke="white" strokeWidth="2.5" className="drop-shadow-md" />
            </g>
          )}

          {/* Single Selected Product Marker */}
          {selectedProduct && !showAllOnMap && !activeRoute && (
            <g transform={`translate(${selectedProduct.location.x}, ${selectedProduct.location.y})`}
              className="drop-shadow-md" style={{ transition: 'all 0.3s ease' }}>
              <circle cx="0" cy="0" r="16" fill="#22c55e" stroke="white" strokeWidth="3" />
              <circle cx="0" cy="0" r="6" fill="white" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
