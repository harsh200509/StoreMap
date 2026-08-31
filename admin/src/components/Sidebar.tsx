import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Map, Package, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';
import { useAdminStore } from '../stores/adminStore';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map-editor', icon: Map, label: 'Map Editor' },
  { to: '/products', icon: Package, label: 'Products' },
];

export default function Sidebar() {
  const { admin, logout } = useAdminStore();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    logout();
  };

  return (
    <aside className="w-64 h-full flex flex-col bg-[#0c0a14] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center purple-glow-sm">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">SmartMap</p>
            <p className="text-purple-400/60 text-[10px] mt-0.5 font-medium uppercase tracking-widest">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive
                  ? 'bg-purple-600/15 text-purple-300 border border-purple-500/20'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-500 rounded-full" />
                )}
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                {label}
                {isActive && <ChevronRight className="w-3 h-3 ml-auto text-purple-500/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-4 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 rounded-full gradient-purple flex items-center justify-center text-white text-xs font-bold">
            {admin?.username?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-slate-300 text-xs font-semibold truncate">{admin?.username ?? 'Admin'}</p>
            <p className="text-slate-600 text-[10px]">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition-all group"
        >
          <LogOut className="w-4 h-4 group-hover:text-red-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
