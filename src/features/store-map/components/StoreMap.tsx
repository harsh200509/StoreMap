import React, { useMemo, useState, useRef, useEffect } from 'react';
import { sections, aisles, ENTRANCE, CHECKOUT } from '../../../data/store';
import { useMapStore } from '../../../stores/mapStore';
import { useShoppingListStore } from '../../../stores/shoppingListStore';

export function StoreMap() {
  const { selectedProduct, showAllOnMap, activeRoute, currentStopIndex, setSelectedProduct, userLocation } = useMapStore();
  const { items, collectedIds } = useShoppingListStore();
  
  const activeAisle = selectedProduct?.location.aisle;
  
  // Transform-based Pan and Zoom state for true mobile optimization
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Set initial zoom and pan based on screen size to make map instantly readable
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      setZoom(0.85);
      setPan({ x: 0, y: 0 }); // Since element is centered, (0,0) will show the center of the store
    } else {
      setZoom(1);
      setPan({ x: 0, y: 0 });
    }
  }, []);

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
    
    // Using CSS transforms, the pan is exactly 1:1 with screen pixels
    setPan(prev => ({ 
      x: prev.x + dx / zoom, 
      y: prev.y + dy / zoom 
    }));
    
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (mapRef.current) {
      mapRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if we're on desktop, to prevent weird scrolling on mobile
    if (e.pointerType === 'touch') return;
    
    const zoomFactor = 1.1;
    if (e.deltaY < 0) {
      setZoom(z => Math.min(z * zoomFactor, 3));
    } else {
      setZoom(z => Math.max(z / zoomFactor, 0.4));
    }
  };

  const listMarkers = useMemo(() => {
    if (!showAllOnMap && !activeRoute) return [];
    return items.filter(item => !collectedIds.has(item.id));
  }, [showAllOnMap, activeRoute, items, collectedIds]);

  return (
    <div 
      className="w-full h-full bg-gray-50 flex overflow-hidden relative touch-none cursor-grab active:cursor-grabbing"
      ref={mapRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
    >
      {/* 
        This is the inner map container. 
        It has a fixed size matching the SVG's coordinate system (1000x800).
        It is perfectly centered in the wrapper via absolute positioning.
        CSS transforms handle the panning and zooming, completely decoupling 
        the map's aspect ratio from the device screen's aspect ratio.
      */}
      <div 
        className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] bg-white sm:rounded-2xl shadow-sm border border-gray-200"
        style={{
          transform: `translate(calc(-50% + ${pan.x * zoom}px), calc(-50% + ${pan.y * zoom}px)) scale(${zoom})`,
          transformOrigin: 'center',
          transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
          willChange: 'transform'
        }}
      >
        <svg 
          viewBox="0 0 1000 800" 
          className="w-full h-full select-none"
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
                className="transition-all duration-300"
              >
                <rect 
                  x={aisle.x} y={aisle.y} width={aisle.width} height={aisle.height} 
                  fill={isHighlighted ? '#f3e8ff' : '#e2e8f0'} 
                  stroke={isHighlighted ? '#9333ea' : '#cbd5e1'}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  rx="4"
                />
                <text 
                  x={aisle.x + aisle.width / 2} 
                  y={aisle.y + aisle.height / 2} 
                  textAnchor="middle" 
                  alignmentBaseline="middle"
                  fill={isHighlighted ? '#7e22ce' : '#64748b'} 
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
          
          <rect x={CHECKOUT.x - 50} y={CHECKOUT.y} width="100" height="40" fill="#9333ea" rx="4" opacity="0.8" />
          <text x={CHECKOUT.x} y={CHECKOUT.y + 24} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Checkout</text>

          {/* Draw Route Path */}
          {activeRoute && activeRoute.path.length > 1 && (
            <path
              d={`M ${activeRoute.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
              fill="none"
              stroke="#9333ea"
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
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                }}
                className="cursor-pointer"
                style={{ transition: 'all 0.3s ease' }}
              >
                <circle 
                  cx="0" cy="0" r={isCurrentStop ? "16" : "14"} 
                  fill={isCurrentStop ? '#22c55e' : '#a855f7'} 
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
              <circle cx="0" cy="0" r="24" fill="#9333ea" opacity="0.2" className="animate-pulse" />
              <circle cx="0" cy="0" r="8" fill="#9333ea" stroke="white" strokeWidth="2" className="drop-shadow-md" />
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
