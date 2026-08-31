import React, { useEffect, useState, useRef } from 'react';
import { useAdminStore } from '../stores/adminStore';
import { Save, Trash2, Crosshair, Map as MapIcon, Grid, Layout } from 'lucide-react';

interface MapSection { id: string; name: string; x: number; y: number; width: number; height: number; color?: string; }
interface MapRack { id: string; name: string; sectionId: string; x: number; y: number; width: number; height: number; divisions: number; orientation: string; }

export default function MapEditor() {
  const { token } = useAdminStore();
  const [sections, setSections] = useState<MapSection[]>([]);
  const [racks, setRacks] = useState<MapRack[]>([]);
  const [config, setConfig] = useState<{ entrance: {x:number, y:number}, checkout: {x:number, y:number} }>({
    entrance: { x: 100, y: 760 },
    checkout: { x: 800, y: 700 }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: 'section'|'rack'|'entrance'|'checkout', id?: string } | null>(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch('/api/map')
      .then(r => r.json())
      .then(data => {
        setSections(data.sections || []);
        setRacks(data.racks || []);
        if (data.config?.entrance) setConfig(c => ({ ...c, entrance: data.config.entrance }));
        if (data.config?.checkout) setConfig(c => ({ ...c, checkout: data.config.checkout }));
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/map/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sections })
      });
      await fetch('/api/map/racks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ racks })
      });
      await fetch('/api/map/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'entrance', value: config.entrance })
      });
      await fetch('/api/map/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: 'checkout', value: config.checkout })
      });
      alert('Map saved successfully!');
    } catch (err) {
      alert('Failed to save map');
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
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const onPointerDown = (e: React.PointerEvent, type: 'section'|'rack'|'entrance'|'checkout', id?: string) => {
    e.stopPropagation();
    setSelectedItem({ type, id });
    setIsDragging(true);

    const pos = getPointerPos(e);
    let itemX = 0, itemY = 0;

    if (type === 'section') {
      const s = sections.find(x => x.id === id);
      if (s) { itemX = s.x; itemY = s.y; }
    } else if (type === 'rack') {
      const r = racks.find(x => x.id === id);
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
      setSections(prev => prev.map(s => s.id === selectedItem.id ? { ...s, x: newX, y: newY } : s));
    } else if (selectedItem.type === 'rack') {
      setRacks(prev => prev.map(r => r.id === selectedItem.id ? { ...r, x: newX, y: newY } : r));
    } else if (selectedItem.type === 'entrance') {
      setConfig(prev => ({ ...prev, entrance: { x: newX, y: newY } }));
    } else if (selectedItem.type === 'checkout') {
      setConfig(prev => ({ ...prev, checkout: { x: newX, y: newY } }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const addNewSection = () => {
    const newId = `sec-${Date.now()}`;
    setSections([...sections, { id: newId, name: 'New Section', x: 400, y: 300, width: 200, height: 200, color: '#f1f5f9' }]);
    setSelectedItem({ type: 'section', id: newId });
  };

  const addNewRack = () => {
    const newId = `r-${Date.now()}`;
    setRacks([...racks, { id: newId, name: 'New Rack', sectionId: sections[0]?.id || '', x: 450, y: 350, width: 40, height: 120, divisions: 5, orientation: 'vertical' }]);
    setSelectedItem({ type: 'rack', id: newId });
  };

  const deleteSelected = async () => {
    if (!selectedItem || selectedItem.type === 'entrance' || selectedItem.type === 'checkout') return;
    
    if (selectedItem.type === 'section') {
      setSections(sections.filter(s => s.id !== selectedItem.id));
      await fetch(`/api/map/sections/${selectedItem.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    } else {
      setRacks(racks.filter(r => r.id !== selectedItem.id));
      await fetch(`/api/map/racks/${selectedItem.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    }
    setSelectedItem(null);
  };

  if (loading) return <div className="p-8 text-white">Loading Map...</div>;

  const selectedSection = selectedItem?.type === 'section' ? sections.find(s => s.id === selectedItem.id) : null;
  const selectedRack = selectedItem?.type === 'rack' ? racks.find(r => r.id === selectedItem.id) : null;

  return (
    <div className="flex h-screen bg-[#0f0f13] overflow-hidden text-white flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <MapIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Map Editor</h1>
            <p className="text-xs text-slate-400">Drag to move. Click to select.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={addNewSection} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10">
            <Layout className="w-4 h-4" /> Add Section
          </button>
          <button onClick={addNewRack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10">
            <Grid className="w-4 h-4" /> Add Rack
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 gradient-purple text-white rounded-lg text-sm font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SVG Canvas */}
        <div className="flex-1 overflow-auto bg-[#1a1a24] p-8 relative flex items-center justify-center">
          <div className="w-[1000px] h-[800px] bg-white rounded-xl shadow-2xl shrink-0 overflow-hidden relative cursor-crosshair">
            <svg 
              ref={svgRef}
              viewBox="0 0 1000 800" 
              className="w-full h-full"
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              <rect width="1000" height="800" fill="#f8fafc" />

              {/* Sections */}
              {sections.map(sec => {
                const isSelected = selectedItem?.type === 'section' && selectedItem.id === sec.id;
                return (
                  <g key={sec.id} transform={`translate(${sec.x}, ${sec.y})`} className="cursor-move touch-none">
                    <rect 
                      width={sec.width} height={sec.height} 
                      fill={sec.color || '#f1f5f9'}
                      stroke={isSelected ? '#9333ea' : '#cbd5e1'}
                      strokeWidth={isSelected ? "3" : "1"}
                      strokeDasharray={isSelected ? "none" : "4 4"}
                      rx="8"
                      onPointerDown={(e) => onPointerDown(e, 'section', sec.id)}
                    />
                    <text x="8" y="20" fill="#64748b" fontSize="14" fontWeight="600" className="pointer-events-none">{sec.name}</text>
                  </g>
                );
              })}

              {/* Racks */}
              {racks.map(rack => {
                const isSelected = selectedItem?.type === 'rack' && selectedItem.id === rack.id;
                return (
                  <g key={rack.id} transform={`translate(${rack.x}, ${rack.y})`} className="cursor-move touch-none">
                    <rect 
                      width={rack.width} height={rack.height} 
                      fill={isSelected ? '#f3e8ff' : '#e2e8f0'} 
                      stroke={isSelected ? '#9333ea' : '#94a3b8'}
                      strokeWidth={isSelected ? "3" : "1"}
                      rx="4"
                      onPointerDown={(e) => onPointerDown(e, 'rack', rack.id)}
                    />
                    
                    {/* Render Divisions (Shelf Slots) */}
                    {Array.from({ length: Math.max(1, rack.divisions) }).map((_, i) => {
                      if (rack.orientation === 'vertical') {
                        const h = rack.height / rack.divisions;
                        return i > 0 ? <line key={i} x1="0" y1={i*h} x2={rack.width} y2={i*h} stroke="#cbd5e1" strokeWidth="1" className="pointer-events-none" /> : null;
                      } else {
                        const w = rack.width / rack.divisions;
                        return i > 0 ? <line key={i} x1={i*w} y1="0" x2={i*w} y2={rack.height} stroke="#cbd5e1" strokeWidth="1" className="pointer-events-none" /> : null;
                      }
                    })}

                    <text x={rack.width/2} y={rack.height/2} textAnchor="middle" alignmentBaseline="middle" fill="#64748b" fontSize="12" fontWeight="bold" className="pointer-events-none">{rack.name}</text>
                  </g>
                );
              })}

              {/* Entrance */}
              <g transform={`translate(${config.entrance.x}, ${config.entrance.y})`} className="cursor-move touch-none" onPointerDown={(e) => onPointerDown(e, 'entrance')}>
                <rect x="-40" y="0" width="80" height="20" fill="#22c55e" rx="4" stroke={selectedItem?.type === 'entrance' ? '#000' : 'none'} strokeWidth="2" />
                <text x="0" y="14" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">Entrance</text>
              </g>

              {/* Checkout */}
              <g transform={`translate(${config.checkout.x}, ${config.checkout.y})`} className="cursor-move touch-none" onPointerDown={(e) => onPointerDown(e, 'checkout')}>
                <rect x="-50" y="0" width="100" height="40" fill="#9333ea" rx="4" stroke={selectedItem?.type === 'checkout' ? '#000' : 'none'} strokeWidth="2" />
                <text x="0" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none">Checkout</text>
              </g>

            </svg>
          </div>
        </div>

        {/* Properties Sidebar */}
        <div className="w-80 bg-[#12121a] border-l border-white/10 p-6 flex flex-col overflow-y-auto">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Crosshair className="w-5 h-5 text-purple-400" /> Properties</h2>
          
          {!selectedItem ? (
            <div className="text-center text-slate-500 mt-10">
              <p>Select an item on the map to edit its properties.</p>
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
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Name</label>
                    <input type="text" value={selectedSection.name} onChange={e => setSections(s => s.map(x => x.id === selectedSection.id ? { ...x, name: e.target.value } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Width</label>
                      <input type="number" value={selectedSection.width} onChange={e => setSections(s => s.map(x => x.id === selectedSection.id ? { ...x, width: Number(e.target.value) } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Height</label>
                      <input type="number" value={selectedSection.height} onChange={e => setSections(s => s.map(x => x.id === selectedSection.id ? { ...x, height: Number(e.target.value) } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Color (Hex)</label>
                    <input type="text" value={selectedSection.color || ''} onChange={e => setSections(s => s.map(x => x.id === selectedSection.id ? { ...x, color: e.target.value } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                </>
              )}

              {selectedRack && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Name</label>
                    <input type="text" value={selectedRack.name} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, name: e.target.value } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Section</label>
                    <select value={selectedRack.sectionId} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, sectionId: e.target.value } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500">
                      <option value="">None</option>
                      {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Width</label>
                      <input type="number" value={selectedRack.width} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, width: Number(e.target.value) } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Height</label>
                      <input type="number" value={selectedRack.height} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, height: Number(e.target.value) } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Divisions (Shelf Slots)</label>
                    <input type="number" min="1" max="10" value={selectedRack.divisions} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, divisions: Number(e.target.value) } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Orientation</label>
                    <select value={selectedRack.orientation} onChange={e => setRacks(s => s.map(x => x.id === selectedRack.id ? { ...x, orientation: e.target.value } : x))} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500">
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
                    <input type="number" value={selectedItem.type === 'entrance' ? config.entrance.x : config.checkout.x} disabled className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Y Position</label>
                    <input type="number" value={selectedItem.type === 'entrance' ? config.entrance.y : config.checkout.y} disabled className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-400 cursor-not-allowed" />
                  </div>
                </div>
              )}

              {/* Delete Button */}
              {(selectedItem.type === 'section' || selectedItem.type === 'rack') && (
                <div className="pt-6 mt-6 border-t border-white/10">
                  <button onClick={deleteSelected} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/20">
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
