import React, { useEffect } from 'react';
import { useShoppingListStore } from '../../../stores/shoppingListStore';
import { useMapStore } from '../../../stores/mapStore';
import { useProductStore } from '../../../stores/productStore';
import { MapPin, Plus, Check } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const getProductImage = (category: string) => {
  const images: Record<string, string> = {
    'Grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    'Snacks': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=400&q=80',
    'Beverages': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    'Personal Care': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80',
    'Cleaning': 'https://images.unsplash.com/photo-1584824486509-11459466ca86?auto=format&fit=crop&w=400&q=80',
    'Dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=400&q=80',
    'Household': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80'
  };
  return images[category] || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80';
};

export function Storefront() {
  const { items, addItem, removeItem } = useShoppingListStore();
  const { setSelectedProduct, setActiveTab } = useMapStore();
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div className="flex-1 flex items-center justify-center p-8 text-gray-500">Loading products...</div>;

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-3 sm:p-4 pb-24 w-full h-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 max-w-7xl mx-auto">
        {products.map(product => {
          const inCart = items.some(i => i.id === product.id);
          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                <img 
                  src={product.imageUrl || getProductImage(product.category)} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-purple-700 shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{product.name}</h3>
                <div className="text-xs text-gray-500 mt-1">{product.brand || 'No Brand'}</div>
                
                <div className="flex items-center justify-between mt-2 mb-3">
                  <div className="font-bold text-gray-900">₹{product.price}</div>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="h-9 w-9 shrink-0 border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => { setSelectedProduct(product); setActiveTab('map'); }}
                    title="Find on Map"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button 
                    className={`flex-1 h-9 text-xs font-semibold ${inCart ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                    onClick={() => inCart ? removeItem(product.id) : addItem(product)}
                  >
                    {inCart ? <><Check className="h-4 w-4 mr-1" /> Added</> : <><Plus className="h-4 w-4 mr-1" /> Add</>}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
