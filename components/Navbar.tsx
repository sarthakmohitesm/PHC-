'use client';

import React, { useState } from 'react';
import { Trophy, Shield, Award, Zap, Menu, X, Search, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'teams', label: 'Teams & Captains', icon: Shield },
    { id: 'events', label: '9 Events', icon: Zap },
    { id: 'rules', label: 'Rules & Points', icon: Award }
  ];

  return (
    <header className="sticky top-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand — Click to show Hero */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
            title="Go to Home"
          >
            <img
              src="/phcl-logo.png"
              alt="PHCL Logo"
              className="w-14 h-14 object-contain group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-white">PHCL</span>
                <span className="text-xs px-2 py-0.5 rounded font-bold uppercase tracking-widest bg-[#E87A2D] text-white">
                  Season 5
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Pillai HOC Champions League 2026</p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden xl:flex items-center relative w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search team, captain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#E87A2D] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E87A2D] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Portal Button */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('admin')}
              className="p-2 rounded-lg text-amber-400 bg-slate-800 border border-amber-500/40 text-xs font-bold flex items-center gap-1"
            >
              <Lock className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 border border-slate-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-slate-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700 space-y-2">
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search team, captain, event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E87A2D] text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold text-amber-400 bg-slate-800 border border-amber-500/40"
            >
              <Lock className="w-5 h-5" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
