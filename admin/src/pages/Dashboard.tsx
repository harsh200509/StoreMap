import React from 'react';
import { useAdminStore } from '../stores/adminStore';
import { Map, Package, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { admin } = useAdminStore();

  return (
    <div className="p-8">
      <header className="mb-8 fade-in-up">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {admin?.username}</h1>
        <p className="text-slate-400">Here's what's happening in your store today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Total Products</h3>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">128</p>
          <div className="mt-2 flex items-center text-xs">
            <TrendingUp className="w-3 h-3 text-emerald-400 mr-1" />
            <span className="text-emerald-400 font-medium">+4%</span>
            <span className="text-slate-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Map Sections</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">7</p>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-slate-500">Active zones in store</span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400">Active Routes</h3>
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">24</p>
          <div className="mt-2 flex items-center text-xs">
            <TrendingUp className="w-3 h-3 text-emerald-400 mr-1" />
            <span className="text-emerald-400 font-medium">+12%</span>
            <span className="text-slate-500 ml-1">customers navigating</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/map-editor" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group">
              <Map className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Edit Map</span>
            </Link>
            <Link to="/products" className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group">
              <Package className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-white">Manage Products</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
