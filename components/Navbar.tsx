'use client';

import React, { useState } from 'react';
import { Trophy, Shield, Zap, Menu, X, Search, Lock, RotateCcw } from 'lucide-react';

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
    { id: 'events', label: 'Events & Rules', icon: Zap }
  ];

  const handleReplayPreloader = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('preloader', '1');
    window.location.href = url.toString();
  };

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
              suppressHydrationWarning
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${isActive
                    ? 'bg-[#E87A2D] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={handleReplayPreloader}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 border border-slate-600 bg-slate-800 hover:text-white hover:border-[#E87A2D] transition-all duration-200"
              title="Replay intro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === 'admin'
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
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
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
                handleReplayPreloader();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800 border border-slate-600"
            >
              <RotateCcw className="w-5 h-5 text-slate-300" />
              <span>Replay Intro</span>
            </button>

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

      <div className="ticker-wrap">
        <div className="ticker-track" aria-label="Announcement ticker">
          {[1, 2].map((item) => (
            <div key={item} className="ticker-item">
              <a
                href="https://www.instagram.com/pillaieuforia?igsi=MWtpZXRwNjAyYjZkNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ffb265] transition-colors"
              >
                Follow @pillaieuforia on Instagram for more updates
              </a>
              <span className="ticker-separator">•</span>
              <span>PHCL Season 5</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrap {
          position: relative;
          overflow: hidden;
          background: rgba(11, 18, 34, 0.96);
          border-top: 1px solid rgba(148, 163, 184, 0.18);
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
        }

        .ticker-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          min-width: max-content;
          animation: ticker-scroll 18s linear infinite;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.6rem 1.4rem;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.95);
          font-weight: 700;
        }

        .ticker-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          background: rgba(232, 122, 45, 0.18);
          border: 1px solid rgba(232, 122, 45, 0.6);
          color: #fbbf24;
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .ticker-separator {
          color: rgba(148, 163, 184, 0.8);
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .ticker-item {
            padding: 0.55rem 1rem;
            font-size: 9px;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </header>
  );
};
