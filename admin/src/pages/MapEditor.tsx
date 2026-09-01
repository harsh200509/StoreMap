import React, { useEffect, useState, useRef } from 'react';
import { useAdminStore } from '../stores/adminStore';
import { Save, Trash2, Crosshair, Map as MapIcon, Grid, Layout, RotateCw, ZoomIn, ZoomOut, CheckCircle2, AlertCircle, Maximize2, Move } from 'lucide-react';
import { API_BASE_URL } from '../lib/api';

interface MapSection {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

interface MapRack {
  id: string;
  name: string;
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  divisions: number;
  orientation: string;
}

export default function MapEditor() {
  const { token } = useAdminStore();
  const [sections, setSections] = useState<MapSection[]>([]);
  const [racks, setRacks] = useState<MapRack[]>([]);
  const [config, setConfig] = useState<{
    entrance: { x: number; y: number };
    checkout: { x: number; y: number };
    canvasWidth?: number;
    canvasHeight?: number;
  }>({
    entrance: { x: 100, y: 760 },
    checkout: { x: 800, y: 700 },
    canvasWidth: 1000,
    canvasHeight: 800,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ type: 'section' | 'rack' | 'entrance' | 'checkout'; id?: string } | null>(null);
  const [showCanvasMenu, setShowCanvasMenu] = useState(false);

  // Zoom and Drag
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Canvas Resize Dragging State
  const [isResizingCanvas, setIsResizingCanvas] = useState<'right' | 'bottom' | 'corner' | null>(null);
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 1000, h: 800 });

  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMapData = () => {
    fetch(`${API_BASE_URL}/map`)
      .then((r) => r.json())
      .then((data) => {
        setSections(data.sections || []);
        setRacks(data.racks || []);
        if (data.config) {
          setConfig((c) => ({
            ...c,
            entrance: (data.config.entrance as { x: number; y: number }) || c.entrance,
            checkout: (data.config.checkout as { x: number; y: number }) || c.checkout,
            canvasWidth: Number(data.config.canvasWidth) || 1000,
            canvasHeight: Number(data.config.canvasHeight) || 800,
          }));
        }
        setLoading(false);
      })
      .catch(() => {
        showToast('Failed to load map data', 'error');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMapData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Save sections
      const secRes = await fetch(`${API_BASE_URL}/map/sections`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sections }),
      });
      if (!secRes.ok) {
        const errData = await secRes.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Failed to save sections');
      }

      // 2. Save racks
      const rackRes = await fetch(`${API_BASE_URL}/map/racks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ racks }),
      });
      if (!rackRes.ok) {
        const errData = await rackRes.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Failed to save racks');
      }

      // 3. Save configs (entrance, checkout, canvas dimensions)
      await fetch(`${API_BASE_URL}/map/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'entrance', value: config.entrance }),
      });
      await fetch(`${API_BASE_URL}/map/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'checkout', value: config.checkout }),
      });
      await fetch(`${API_BASE_URL}/map/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'canvasWidth', value: config.canvasWidth || 1000 }),
      });
      await fetch(`${API_BASE_URL}/map/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'canvasHeight', value: config.canvasHeight || 800 }),
      });

      showToast('Map & Canvas Size saved successfully!');
      fetchMapData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save map', 'error');
    } finally {
      setSaving(false);
    }
  };

  const getPointerPos = (e: React.PointerEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d,
    };
  };

  const onPointerDown = (e: React.PointerEvent, type: 'section' | 'rack' | 'entrance' | 'checkout', id?: string) => {
    e.stopPropagation();
    setSelectedItem({ type, id });
    setIsDragging(true);

    const pos = getPointerPos(e);
    let itemX = 0, itemY = 0;

    if (type === 'section') {
      const s = sections.find((x) => x.id === id);
      if (s) { itemX = s.x; itemY = s.y; }
    } else if (type === 'rack') {
      const r = racks.find((x) => x.id === id);
      if (r) { itemX = r.x; itemY = r.y; }
    } else if (type === 'entrance') {
      itemX = config.entrance.x; itemY = config.entrance.y;
    } else if (type === 'checkout') {
      itemX = config.checkout.x; itemY = config.checkout.y;
    }

    setDragOffset({ x: pos.x - itemX, y: pos.y - itemY });
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !selectedItem) return;
    const pos = getPointerPos(e);
    const newX = Math.round(pos.x - dragOffset.x);
    const newY = Math.round(pos.y - dragOffset.y);

    if (selectedItem.type === 'section') {
      setSections((prev) => prev.map((s) => (s.id === selectedItem.id ? { ...s, x: newX, y: newY } : s)));
    } else if (selectedItem.type === 'rack') {
      setRacks((prev) => prev.map((r) => (r.id === selectedItem.id ? { ...r, x: newX, y: newY } : r)));
    } else if (selectedItem.type === 'entrance') {
      setConfig((prev) => ({ ...prev, entrance: { x: newX, y: newY } }));
    } else if (selectedItem.type === 'checkout') {
      setConfig((prev) => ({ ...prev, checkout: { x: newX, y: newY } }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  // Canvas Resize Handlers (Drag bottom-right corner or edges to expand map)
  const startCanvasResize = (e: React.PointerEvent, handle: 'right' | 'bottom' | 'corner') => {
    e.stopPropagation();
    setIsResizingCanvas(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: config.canvasWidth || 1000,
      h: config.canvasHeight || 800,
    });
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onCanvasResizeMove = (e: React.PointerEvent) => {
    if (!isResizingCanvas) return;
    const dx = (e.clientX - resizeStart.x) / zoom;
    const dy = (e.clientY - resizeStart.y) / zoom;

    let newW = resizeStart.w;
    let newH = resizeStart.h;

    if (isResizingCanvas === 'right' || isResizingCanvas === 'corner') {
      newW = Math.max(600, Math.round((resizeStart.w + dx) / 50) * 50);
    }
    if (isResizingCanvas === 'bottom' || isResizingCanvas === 'corner') {
      newH = Math.max(500, Math.round((resizeStart.h + dy) / 50) * 50);
    }

    setConfig((prev) => ({
      ...prev,
      canvasWidth: newW,
      canvasHeight: newH,
    }));
  };

  const onCanvasResizeUp = (e: React.PointerEvent) => {
    setIsResizingCanvas(null);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const cWidth = config.canvasWidth || 1000;
  const cHeight = config.canvasHeight || 800;

  const addNewSection = () => {
    const newId = `sec-${Date.now()}`;
    const newSec: MapSection = {
      id: newId,
      name: `Section ${sections.length + 1}`,
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      color: '#f1f5f9',
    };
    setSections([...sections, newSec]);
    setSelectedItem({ type: 'section', id: newId });
  };

  const addNewRack = () => {
    const newId = `r-${Date.now()}`;
    const newRack: MapRack = {
      id: newId,
      name: `R-${racks.length + 1}`,
      sectionId: sections[0]?.id || '',
      x: 150,
      y: 150,
      width: 40,
      height: 120,
      divisions: 5,
      orientation: 'vertical',
    };
    setRacks([...racks, newRack]);
    setSelectedItem({ type: 'rack', id: newId });
  };

  const rotateSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            width: s.height,
            height: s.width,
          };
        }
        return s;
      })
    );
  };

  const rotateRack = (id: string) => {
    setRacks((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextOrientation = r.orientation === 'vertical' ? 'horizontal' : 'vertical';
          return {
            ...r,
            width: r.height,
            height: r.width,
            orientation: nextOrientation,
          };
        }
        return r;
      })
    );
  };

  const deleteSelected = async () => {
    if (!selectedItem || selectedItem.type === 'entrance' || selectedItem.type === 'checkout') return;

    if (selectedItem.type === 'section') {
      setSections(sections.filter((s) => s.id !== selectedItem.id));
      setRacks((prev) => prev.map((r) => (r.sectionId === selectedItem.id ? { ...r, sectionId: '' } : r)));
      if (selectedItem.id) {
        await fetch(`${API_BASE_URL}/map/sections/${selectedItem.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } else {
      setRacks(racks.filter((r) => r.id !== selectedItem.id));
      if (selectedItem.id) {
        await fetch(`${API_BASE_URL}/map/racks/${selectedItem.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    }
    setSelectedItem(null);
    showToast('Item deleted');
  };

  const applyCanvasPreset = (w: number, h: number) => {
    setConfig((c) => ({ ...c, canvasWidth: w, canvasHeight: h }));
    setShowCanvasMenu(false);
  };

  if (loading) return <div className="p-8 text-white">Loading Map...</div>;

  const selectedSection = selectedItem?.type === 'section' ? sections.find((s) => s.id === selectedItem.id) : null;
  const selectedRack = selectedItem?.type === 'rack' ? racks.find((r) => r.id === selectedItem.id) : null;

  return (
    <div className="flex h-screen bg-[#0f0f13] overflow-hidden text-white flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-sm font-semibold shadow-xl border flex items-center gap-2 animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'success' ? 'bg-purple-900/90 text-purple-200 border-purple-500/30 backdrop-blur' : 'bg-red-900/90 text-red-200 border-red-500/30 backdrop-blur'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="px-6 py-3 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <MapIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Map Editor</h1>
            <p className="text-xs text-slate-400">Drag items · Drag bottom-right corner to enlarge map</p>
          </div>
        </div>

        {/* Toolbar: Canvas Size, Zoom, Add, Save */}
        <div className="flex items-center gap-2">
          {/* Canvas Size Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCanvasMenu(!showCanvasMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors border border-white/10 text-purple-300"
              title="Change Map Dimensions"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Map: {cWidth} × {cHeight}px</span>
            </button>

            {showCanvasMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-[#181824] border border-white/15 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Map Size Presets</div>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  <button onClick={() => applyCanvasPreset(1000, 800)} className="px-2 py-1.5 bg-white/5 hover:bg-purple-600/30 rounded text-xs text-left border border-white/5">
                    Standard (1000×800)
                  </button>
                  <button onClick={() => applyCanvasPreset(1500, 1000)} className="px-2 py-1.5 bg-white/5 hover:bg-purple-600/30 rounded text-xs text-left border border-white/5">
                    Large (1500×1000)
                  </button>
                  <button onClick={() => applyCanvasPreset(2000, 1200)} className="px-2 py-1.5 bg-white/5 hover:bg-purple-600/30 rounded text-xs text-left border border-white/5">
                    XL Store (2000×1200)
                  </button>
                  <button onClick={() => applyCanvasPreset(2500, 1500)} className="px-2 py-1.5 bg-white/5 hover:bg-purple-600/30 rounded text-xs text-left border border-white/5">
                    Huge (2500×1500)
                  </button>
                </div>

                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Custom Dimensions</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Width (px)</label>
                    <input
                      type="number"
                      value={config.canvasWidth || 1000}
                      onChange={(e) => setConfig((c) => ({ ...c, canvasWidth: Math.max(500, Number(e.target.value)) }))}
                      className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-0.5">Height (px)</label>
                    <input
                      type="number"
                      value={config.canvasHeight || 800}
                      onChange={(e) => setConfig((c) => ({ ...c, canvasHeight: Math.max(400, Number(e.target.value)) }))}
                      className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button onClick={() => setZoom((z) => Math.max(0.3, z - 0.15))} className="p-1 hover:bg-white/10 rounded text-slate-300">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs px-1.5 text-slate-300 font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(2, z + 0.15))} className="p-1 hover:bg-white/10 rounded text-slate-300">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button onClick={addNewSection} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors border border-white/10">
            <Layout className="w-3.5 h-3.5 text-purple-400" /> Add Section
          </button>
          <button onClick={addNewRack} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium transition-colors border border-white/10">
            <Grid className="w-3.5 h-3.5 text-purple-400" /> Add Rack
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 gradient-purple text-white rounded-lg text-xs font-bold transition-all hover:opacity-90 active:scale-95 disabled:opacity-50">
            <Save className="w-3.5 h-3.5" /> {saving ? 'Saving...' : 'Save Map'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" onClick={() => setShowCanvasMenu(false)}>
        {/* SVG Canvas Area */}
        <div className="flex-1 overflow-auto bg-[#1a1a24] p-10 relative flex items-center justify-center">
          <div
            ref={canvasRef}
            style={{
              width: `${cWidth}px`,
              height: `${cHeight}px`,
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isResizingCanvas ? 'none' : 'transform 0.1s ease-out',
            }}
            className="bg-white rounded-xl shadow-2xl shrink-0 relative cursor-crosshair border-2 border-slate-600"
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${cWidth} ${cHeight}`}
              className="w-full h-full select-none"
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {/* Floor background grid */}
              <rect width={cWidth} height={cHeight} fill="#f8fafc" />

              {/* Sections */}
              {sections.map((sec) => {
                const isSelected = selectedItem?.type === 'section' && selectedItem.id === sec.id;
                return (
                  <g key={sec.id} transform={`translate(${sec.x}, ${sec.y})`} className="cursor-move touch-none">
                    <rect
                      width={sec.width}
                      height={sec.height}
                      fill={sec.color || '#f1f5f9'}
                      stroke={isSelected ? '#9333ea' : '#cbd5e1'}
                      strokeWidth={isSelected ? '3' : '1'}
                      strokeDasharray={isSelected ? 'none' : '4 4'}
                      rx="8"
                      onPointerDown={(e) => onPointerDown(e, 'section', sec.id)}
                    />
                    <text x="10" y="22" fill="#64748b" fontSize="13" fontWeight="600" className="pointer-events-none select-none">
                      {sec.name}
                    </text>
                  </g>
                );
              })}

              {/* Racks */}
              {racks.map((rack) => {
                const isSelected = selectedItem?.type === 'rack' && selectedItem.id === rack.id;
                return (
                  <g key={rack.id} transform={`translate(${rack.x}, ${rack.y})`} className="cursor-move touch-none">
                    <rect
                      width={rack.width}
                      height={rack.height}
                      fill={isSelected ? '#f3e8ff' : '#e2e8f0'}
                      stroke={isSelected ? '#9333ea' : '#94a3b8'}
                      strokeWidth={isSelected ? '3' : '1'}
                      rx="4"
                      onPointerDown={(e) => onPointerDown(e, 'rack', rack.id)}
                    />

                    {/* Shelf Divisions */}
                    {Array.from({ length: Math.max(1, rack.divisions || 5) }).map((_, i) => {
                      if (rack.orientation === 'vertical') {
                        const h = rack.height / (rack.divisions || 5);
                        return i > 0 ? (
                          <line key={i} x1="0" y1={i * h} x2={rack.width} y2={i * h} stroke="#cbd5e1" strokeWidth="1" className="pointer-events-none" />
                        ) : null;
                      } else {
                        const w = rack.width / (rack.divisions || 5);
                        return i > 0 ? (
                          <line key={i} x1={i * w} y1="0" x2={i * w} y2={rack.height} stroke="#cbd5e1" strokeWidth="1" className="pointer-events-none" />
                        ) : null;
                      }
                    })}

                    <text
                      x={rack.width / 2}
                      y={rack.height / 2}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      fill="#64748b"
                      fontSize="11"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {rack.name}
                    </text>
                  </g>
                );
              })}

              {/* Entrance */}
              <g transform={`translate(${config.entrance.x}, ${config.entrance.y})`} className="cursor-move touch-none" onPointerDown={(e) => onPointerDown(e, 'entrance')}>
                <rect x="-40" y="0" width="80" height="20" fill="#22c55e" rx="4" stroke={selectedItem?.type === 'entrance' ? '#000' : 'none'} strokeWidth="2" />
                <text x="0" y="14" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" className="pointer-events-none select-none">Entrance</text>
              </g>

              {/* Checkout */}
              <g transform={`translate(${config.checkout.x}, ${config.checkout.y})`} className="cursor-move touch-none" onPointerDown={(e) => onPointerDown(e, 'checkout')}>
                <rect x="-50" y="0" width="100" height="36" fill="#9333ea" rx="4" stroke={selectedItem?.type === 'checkout' ? '#000' : 'none'} strokeWidth="2" />
                <text x="0" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" className="pointer-events-none select-none">Checkout</text>
              </g>
            </svg>

            {/* Interactive Corner Resize Handle (Drag to enlarge canvas!) */}
            <div
              onPointerDown={(e) => startCanvasResize(e, 'corner')}
              onPointerMove={onCanvasResizeMove}
              onPointerUp={onCanvasResizeUp}
              className="absolute -bottom-3 -right-3 w-7 h-7 bg-purple-600 hover:bg-purple-500 border-2 border-white rounded-full shadow-lg cursor-nwse-resize flex items-center justify-center z-30 transition-transform active:scale-125"
              title="Drag to resize map canvas"
            >
              <Move className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Right edge handle */}
            <div
              onPointerDown={(e) => startCanvasResize(e, 'right')}
              onPointerMove={onCanvasResizeMove}
              onPointerUp={onCanvasResizeUp}
              className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-12 bg-purple-600/70 hover:bg-purple-600 border border-white rounded-full cursor-ew-resize z-30 flex items-center justify-center"
              title="Drag right edge to widen map"
            />

            {/* Bottom edge handle */}
            <div
              onPointerDown={(e) => startCanvasResize(e, 'bottom')}
              onPointerMove={onCanvasResizeMove}
              onPointerUp={onCanvasResizeUp}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-12 bg-purple-600/70 hover:bg-purple-600 border border-white rounded-full cursor-ns-resize z-30 flex items-center justify-center"
              title="Drag bottom edge to lengthen map"
            />
          </div>
        </div>

        {/* Properties Sidebar */}
        <div className="w-80 bg-[#12121a] border-l border-white/10 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-purple-400" /> Properties
          </h2>

          {!selectedItem ? (
            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">Map Canvas Size</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Width (px)</label>
                    <input
                      type="number"
                      value={config.canvasWidth || 1000}
                      onChange={(e) => setConfig((c) => ({ ...c, canvasWidth: Math.max(400, Number(e.target.value)) }))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Height (px)</label>
                    <input
                      type="number"
                      value={config.canvasHeight || 800}
                      onChange={(e) => setConfig((c) => ({ ...c, canvasHeight: Math.max(400, Number(e.target.value)) }))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  💡 Tip: You can also drag the purple handle on the bottom-right corner of the map to resize!
                </p>
              </div>

              <div className="text-center text-slate-500 mt-6">
                <p className="text-sm">Click any Section, Rack, Entrance, or Checkout to inspect and customize.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">{selectedItem.type}</span>
                <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-purple-300">{selectedItem.id || 'system'}</span>
              </div>

              {selectedSection && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Section Name</label>
                    <input
                      type="text"
                      value={selectedSection.name}
                      onChange={(e) => setSections((s) => s.map((x) => (x.id === selectedSection.id ? { ...x, name: e.target.value } : x)))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Width</label>
                      <input
                        type="number"
                        value={selectedSection.width}
                        onChange={(e) => setSections((s) => s.map((x) => (x.id === selectedSection.id ? { ...x, width: Number(e.target.value) } : x)))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Height</label>
                      <input
                        type="number"
                        value={selectedSection.height}
                        onChange={(e) => setSections((s) => s.map((x) => (x.id === selectedSection.id ? { ...x, height: Number(e.target.value) } : x)))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => rotateSection(selectedSection.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium transition-colors border border-purple-500/20"
                  >
                    <RotateCw className="w-4 h-4" /> Rotate Section (Swap W/H)
                  </button>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={selectedSection.color || '#f1f5f9'}
                        onChange={(e) => setSections((s) => s.map((x) => (x.id === selectedSection.id ? { ...x, color: e.target.value } : x)))}
                        className="w-10 h-9 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={selectedSection.color || ''}
                        onChange={(e) => setSections((s) => s.map((x) => (x.id === selectedSection.id ? { ...x, color: e.target.value } : x)))}
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {selectedRack && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Rack Name</label>
                    <input
                      type="text"
                      value={selectedRack.name}
                      onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, name: e.target.value } : x)))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Assigned Section</label>
                    <select
                      value={selectedRack.sectionId}
                      onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, sectionId: e.target.value } : x)))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="">None</option>
                      {sections.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Width</label>
                      <input
                        type="number"
                        value={selectedRack.width}
                        onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, width: Number(e.target.value) } : x)))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Height</label>
                      <input
                        type="number"
                        value={selectedRack.height}
                        onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, height: Number(e.target.value) } : x)))}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => rotateRack(selectedRack.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg text-sm font-medium transition-colors border border-purple-500/20"
                  >
                    <RotateCw className="w-4 h-4" /> Rotate Rack ({selectedRack.orientation === 'vertical' ? '→ Horizontal' : '→ Vertical'})
                  </button>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Divisions (Shelf Slots)</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={selectedRack.divisions}
                      onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, divisions: Number(e.target.value) } : x)))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Orientation</label>
                    <select
                      value={selectedRack.orientation}
                      onChange={(e) => setRacks((s) => s.map((x) => (x.id === selectedRack.id ? { ...x, orientation: e.target.value } : x)))}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="vertical">Vertical</option>
                      <option value="horizontal">Horizontal</option>
                    </select>
                  </div>
                </>
              )}

              {(selectedItem.type === 'entrance' || selectedItem.type === 'checkout') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">X Position</label>
                    <input
                      type="number"
                      value={selectedItem.type === 'entrance' ? config.entrance.x : config.checkout.x}
                      disabled
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Y Position</label>
                    <input
                      type="number"
                      value={selectedItem.type === 'entrance' ? config.entrance.y : config.checkout.y}
                      disabled
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}

              {/* Delete Button */}
              {(selectedItem.type === 'section' || selectedItem.type === 'rack') && (
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={deleteSelected}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" /> Delete {selectedItem.type === 'section' ? 'Section' : 'Rack'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
