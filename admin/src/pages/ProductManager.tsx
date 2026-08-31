import React, { useEffect, useState, useRef } from 'react';
import { useAdminStore } from '../stores/adminStore';
import { Plus, Trash2, Edit2, Search, Package, Image as ImageIcon, Crosshair, X, Save, UploadCloud, Map as MapIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  sku: string;
  status: string;
  imageUrl: string | null;
  rackId: string | null;
  rackDivision: number | null;
  locationX: number | null;
  locationY: number | null;
  sectionName: string | null;
  aisle: string | null;
}

interface MapRack { id: string; name: string; sectionId: string; x: number; y: number; width: number; height: number; divisions: number; orientation: string; }
interface MapSection { id: string; name: string; }

export default function ProductManager() {
  const { token } = useAdminStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [racks, setRacks] = useState<MapRack[]>([]);
  const [sections, setSections] = useState<MapSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, mRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/map')
      ]);
      const pData = await pRes.json();
      const mData = await mRes.json();
      setProducts(pData);
      setRacks(mData.racks || []);
      setSections(mData.sections || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct({
        name: '', brand: '', category: 'Grocery', price: 0, sku: '', status: 'Available',
        rackId: null, rackDivision: 1, locationX: null, locationY: null
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;
    setIsSaving(true);

    try {
      // If rack selected, auto-calculate X, Y based on rack position and division
      let locationX = editingProduct.locationX;
      let locationY = editingProduct.locationY;
      let sectionName = editingProduct.sectionName;
      let aisle = editingProduct.aisle;

      if (editingProduct.rackId) {
        const rack = racks.find(r => r.id === editingProduct.rackId);
        if (rack) {
          aisle = rack.name;
          const sec = sections.find(s => s.id === rack.sectionId);
          if (sec) sectionName = sec.name;

          // Simple center of rack for X,Y logic based on slot
          const divIndex = Math.max(0, (editingProduct.rackDivision || 1) - 1);
          if (rack.orientation === 'vertical') {
            const h = rack.height / Math.max(1, rack.divisions);
            locationX = rack.x + (rack.width / 2);
            locationY = rack.y + (divIndex * h) + (h / 2);
          } else {
            const w = rack.width / Math.max(1, rack.divisions);
            locationX = rack.x + (divIndex * w) + (w / 2);
            locationY = rack.y + (rack.height / 2);
          }
        }
      }

      const payload = { ...editingProduct, locationX, locationY, sectionName, aisle };

      const url = editingProduct.id ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await fetchData();
        handleCloseModal();
      } else {
        alert('Failed to save product');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setEditingProduct(prev => prev ? { ...prev, imageUrl: data.url } : null);
      }
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading && products.length === 0) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#0f0f13] overflow-hidden flex-col">
      <header className="px-8 py-6 border-b border-white/10 shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Product Manager</h1>
              <p className="text-sm text-slate-400">{products.length} total items in store</p>
            </div>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-5 py-2.5 gradient-purple text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity purple-glow-sm"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search products by name, SKU, or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </header>

      <div className="flex-1 overflow-auto p-8">
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-black/40 text-slate-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category / SKU</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center shrink-0">
                        {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" /> : <ImageIcon className="w-4 h-4 text-slate-500" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate max-w-[200px]">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.brand || 'No Brand'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{p.category}</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{p.sku}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">₹{p.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      p.status === 'Available' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                      p.status === 'Low Stock' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                      'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.rackId ? (
                      <div className="flex items-center gap-1.5 text-xs text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md w-fit">
                        <Crosshair className="w-3 h-3" />
                        <span>Rack {racks.find(r => r.id === p.rackId)?.name || p.rackId}, Slot {p.rackDivision}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 italic">Not placed on map</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenModal(p)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No products found matching "{search}"
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-bold text-white">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="productForm" onSubmit={handleSave} className="space-y-6 text-sm text-slate-300">
                
                {/* Image Upload */}
                <div className="flex gap-6 items-center bg-black/20 p-4 rounded-xl border border-white/5">
                  <div className="w-24 h-24 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center relative group">
                    {editingProduct.imageUrl ? (
                      <>
                        <img src={editingProduct.imageUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-600" />
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Product Image</h3>
                    <p className="text-xs text-slate-500 mb-3">Upload a PNG or JPG (max 5MB).</p>
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded text-xs text-white transition-colors">
                      {uploadingImage ? <span className="animate-pulse">Uploading...</span> : <><UploadCloud className="w-3.5 h-3.5" /> Upload Image</>}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Product Name *</label>
                    <input required type="text" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Brand</label>
                    <input type="text" value={editingProduct.brand || ''} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">SKU</label>
                    <input type="text" value={editingProduct.sku || ''} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none font-mono text-xs" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
                    <select value={editingProduct.category || ''} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none">
                      <option>Grocery</option><option>Dairy</option><option>Snacks</option><option>Beverages</option><option>Personal Care</option><option>Cleaning</option><option>Household</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Price (₹) *</label>
                    <input required type="number" min="0" step="0.01" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none" />
                  </div>

                  <div className="col-span-2 border-t border-white/5 my-2 pt-4">
                    <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><MapIcon className="w-4 h-4 text-purple-400" /> Map Placement</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Assign to Rack</label>
                        <select value={editingProduct.rackId || ''} onChange={e => setEditingProduct({...editingProduct, rackId: e.target.value || null})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none">
                          <option value="">-- Not Placed --</option>
                          {racks.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                      </div>

                      {editingProduct.rackId && (
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">Shelf Slot (1 to {racks.find(r => r.id === editingProduct.rackId)?.divisions || 5})</label>
                          <input type="number" min="1" max={racks.find(r => r.id === editingProduct.rackId)?.divisions || 5} value={editingProduct.rackDivision || 1} onChange={e => setEditingProduct({...editingProduct, rackDivision: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-black/20 shrink-0">
              <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors">Cancel</button>
              <button form="productForm" type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2 gradient-purple text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
                <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
