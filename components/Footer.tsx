'use client';

import React from 'react';
import { Trophy, Heart, Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1222]/80 backdrop-blur-md border-t border-white/10 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand with logos */}
          <div className="flex items-center gap-4">
            <img
              src="/phcl-logo.png"
              alt="PHCL Logo"
              className="w-12 h-12 object-contain"
            />
            <div>
              <div className="text-white font-extrabold text-lg tracking-wider">PHCL Season 5</div>
              <p className="text-[11px] text-slate-400">Pillai HOC Champions League • Euforia 2026</p>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-right space-y-1">
            <div className="text-slate-200 font-bold text-xs">
              Mahatma Education Society
            </div>
            <p className="text-[11px] text-slate-400">
              Pillai HOCL Educational Campus, Rasayani, Panvel, Navi Mumbai
            </p>
          </div>

        </div>

        {/* Social handles */}
        <div className="flex justify-center gap-6 text-[11px] text-slate-400">
          <a
            href="https://www.instagram.com/pillaieuforia?igsi=MWtpZXRwNjAyYjZkNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#E87A2D] font-bold hover:text-[#ff9f4f] transition-colors"
          >
            <span className="text-slate-400">Follow:</span> @pillaieuforia
          </a>
          <span className="text-slate-600">|</span>
          <a
            href="https://www.instagram.com/pillaihoccollege?igsi=MWIyM200dmZvejdpcA=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#E87A2D] font-bold hover:text-[#ff9f4f] transition-colors"
          >
            <span className="text-slate-400">Follow:</span> @pillaihoccollege
          </a>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 PHCL — Pillai HOC Champions League. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>8th September 2026 •</span>
            <span className="text-[#E87A2D] font-bold">Euforia Season 5</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
