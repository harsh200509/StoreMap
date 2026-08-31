import React, { useMemo, useState, useRef } from 'react';
import { sections, aisles, ENTRANCE, CHECKOUT } from '../../../data/store';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { cn } from '../../../lib/utils';
import { ZoomIn, ZoomOut, Focus } from 'lucide-react';

export function StoreMap() {
  const { selectedProduct, showAllOnMap, activeRoute, currentStopIndex, setSelectedProduct, userLocation } = useMapStore();
  const { items, collectedIds } = useShoppingListStore();
  
  const activeAisle = selectedProduct?.location.aisle;
  
  // Pan and Zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    if (mapRef.current) {
      mapRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    // Base coordinate system is 1000x800.
    // Calculate the scale to adjust screen pixels to SVG user units.
    const container = mapRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const scaleX = 1000 / rect.width;
      const scaleY = 800 / rect.height;
      setPan(prev => ({ 
        x: prev.x - dx * scaleX / zoom, 
        y: prev.y - dy * scaleY / zoom 
      }));
    }
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (mapRef.current) {
      mapRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setZoom(z => Math.min(z * zoomFactor, 5));
    } else {
      setZoom(z => Math.max(z / zoomFactor, 0.5));
    }
  };

  const recenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom(z => Math.min(z * 1.2, 5));
  const zoomOut = () => setZoom(z => Math.max(z / 1.2, 0.5));

  const listMarkers = useMemo(() => {
    if (!showAllOnMap && !activeRoute) return [];
    return items.filter(item => !collectedIds.has(item.id));
  }, [showAllOnMap, activeRoute, items, collectedIds]);

  const viewWidth = 1000 / zoom;
  const viewHeight = 800 / zoom;
  const viewX = pan.x + (1000 - viewWidth) / 2;
  const viewY = pan.y + (800 - viewHeight) / 2;

  return (
    <div className="w-full h-full bg-gray-100 flex items-start sm:items-center justify-center p-2 sm:p-8 overflow-hidden relative touch-none">
      
      {/* Zoom Controls Overlay */}
      <div className="absolute right-2 top-20 sm:right-4 sm:top-1/2 sm:-translate-y-1/2 z-40 flex flex-col gap-1 bg-white p-1 rounded-lg shadow-md border border-gray-200">
        <button onClick={zoomIn} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </button>
        <div className="w-full h-px bg-gray-200"></div>
        <button onClick={zoomOut} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </button>
        <div className="w-full h-px bg-gray-200"></div>
        <button onClick={recenter} className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Recenter">
          <Focus className="h-4 w-4" />
        </button>
      </div>

      {/* Container for map with aspect ratio preservation */}
      <div 
        ref={mapRef}
        className="relative w-full h-full sm:max-w-5xl sm:aspect-[5/4] bg-white rounded-lg shadow-sm sm:border border-gray-200 overflow-hidden flex items-center justify-center sm:m-auto cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
      >
        <svg 
          viewBox={`${viewX} ${viewY} ${viewWidth} ${viewHeight}`} 
          className="w-full h-full max-h-[85vh] select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Floor background */}
          <rect x="-1000" y="-1000" width="3000" height="3000" fill="#f8fafc" />
          
          {/* Draw Sections */}
          {sections.map(sec => (
            <g key={sec.id}>
              <rect 
                x={sec.x} y={sec.y} width={sec.width} height={sec.height} 
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 4"
                rx="8"
              />
              <text x={sec.x + 8} y={sec.y + 20} fill="#94a3b8" fontSize="14" fontWeight="500">{sec.name}</text>
            </g>
          ))}

          {/* Draw Aisles / Racks */}
          {aisles.map(aisle => {
            const isHighlighted = aisle.name === activeAisle;
            return (
              <g 
                key={aisle.id} 
                className="transition-all duration-300 cursor-pointer"
              >
                <rect 
                  x={aisle.x} y={aisle.y} width={aisle.width} height={aisle.height} 
                  fill={isHighlighted ? '#bfdbfe' : '#e2e8f0'} 
                  stroke={isHighlighted ? '#3b82f6' : '#cbd5e1'}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  rx="4"
                />
                <text 
                  x={aisle.x + aisle.width / 2} 
                  y={aisle.y + aisle.height / 2} 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  fill={isHighlighted ? '#1d4ed8' : '#64748b'} 
                  fontSize="12" 
                  fontWeight="bold"
                >
                  {aisle.name}
                </text>
              </g>
            );
          })}

          {/* Draw Entrance & Checkout */}
          <rect x={ENTRANCE.x - 40} y={ENTRANCE.y} width="80" height="20" fill="#22c55e" rx="4" opacity="0.8" />
          <text x={ENTRANCE.x} y={ENTRANCE.y + 14} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Entrance</text>
          
          <rect x={CHECKOUT.x - 50} y={CHECKOUT.y} width="100" height="40" fill="#3b82f6" rx="4" opacity="0.8" />
          <text x={CHECKOUT.x} y={CHECKOUT.y + 24} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Checkout</text>

          {/* Draw Route Path */}
          {activeRoute && activeRoute.path.length > 1 && (
            <path
              d={`M ${activeRoute.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.5"
            />
          )}

          {/* Draw Product Markers (Shopping List) */}
          {(showAllOnMap || activeRoute) && listMarkers.map((product, idx) => {
            let stopNumber = idx + 1;
            let isCurrentStop = false;
            
            if (activeRoute) {
              const stopIdx = activeRoute.stops.findIndex(s => s.product?.id === product.id);
              if (stopIdx !== -1) {
                stopNumber = stopIdx; // stop 0 is entrance
                isCurrentStop = stopIdx === currentStopIndex;
              }
            }

            return (
              <g 
                key={product.id} 
                transform={`translate(${product.location.x}, ${product.location.y})`}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
                style={{ transition: 'all 0.3s ease' }}
              >
                <circle 
                  cx="0" cy="0" r={isCurrentStop ? "16" : "14"} 
                  fill={isCurrentStop ? '#22c55e' : '#1d4ed8'} 
                  stroke="white" 
                  strokeWidth={isCurrentStop ? "3" : "2"}
                  className="drop-shadow-sm"
                />
                <text 
                  x="0" y="4" 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize={isCurrentStop ? "13" : "12"} 
                  fontWeight="bold"
                >
                  {stopNumber}
                </text>
              </g>
            );
          })}

          {/* Draw User Location */}
          {activeRoute && userLocation && (
            <g 
              transform={`translate(${userLocation.x}, ${userLocation.y})`}
              className="pointer-events-none"
            >
              {/* User Location Halo */}
              <circle cx="0" cy="0" r="24" fill="#3b82f6" opacity="0.2" className="animate-pulse" />
              <circle cx="0" cy="0" r="8" fill="#3b82f6" stroke="white" strokeWidth="2" className="drop-shadow-md" />
            </g>
          )}

          {/* Draw Single Selected Product Marker */}
          {selectedProduct && !showAllOnMap && !activeRoute && (
            <g 
              transform={`translate(${selectedProduct.location.x}, ${selectedProduct.location.y})`}
              className="drop-shadow-md"
              style={{ transition: 'all 0.3s ease' }}
            >
              <circle cx="0" cy="0" r="16" fill="#22c55e" stroke="white" strokeWidth="3" />
              <circle cx="0" cy="0" r="6" fill="white" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
