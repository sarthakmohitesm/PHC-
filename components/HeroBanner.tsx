'use client';

import React from 'react';
import { Trophy, Shield, Users, Zap, Award, ChevronRight } from 'lucide-react';
import { Team, TeamLeaderboardEntry } from '@/lib/phcl-data';
import { CaptainsShowcase } from '@/components/CaptainsShowcase';

interface HeroBannerProps {
  teams: Team[];
  topLeaderboard: TeamLeaderboardEntry[];
  setActiveTab: (tab: string) => void;
  onOpenTeamModal: (teamId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  teams,
  topLeaderboard,
  setActiveTab,
  onOpenTeamModal
}) => {
  return (
    <div className="relative overflow-hidden py-12 md:py-16 border-b border-white/10 bg-[#111a2e]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Hero Info */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Season 4 Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
                Pillai HOC College • 8th September 2026
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                PILLAI HOC <br />
                <span className="text-[#E87A2D]">
                  CHAMPIONS LEAGUE
                </span>
              </h1>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs px-3 py-1 rounded font-black uppercase tracking-widest bg-[#E87A2D] text-white">
                  Season 5
                </span>
                <span className="text-sm text-slate-300 font-bold">PHCL 2026</span>
              </div>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed pt-2">
                9 Thrilling Events. 10 Captains. 220 Athletes. The ultimate sports battle for total supremacy at Euforia. Points update live after every victory!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm bg-[#E87A2D] text-white hover:bg-[#d06a20] transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span>View Live Leaderboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('teams')}
                className="glass-card flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm text-white border border-white/20 transition-all hover:bg-white/15"
              >
                <Shield className="w-5 h-5 text-[#1C6E7D]" />
                <span>View All Teams</span>
              </button>
            </div>

            {/* Stats Ticker Banner - Glass Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/10">
              <div className="glass-card p-3 rounded-xl">
                <div className="flex items-center gap-2 text-[#1C6E7D] text-xs font-semibold uppercase">
                  <Shield className="w-4 h-4" /> Teams
                </div>
                <div className="text-2xl font-black text-white mt-1">10 Squads</div>
              </div>

              <div className="glass-card p-3 rounded-xl">
                <div className="flex items-center gap-2 text-[#1C6E7D] text-xs font-semibold uppercase">
                  <Users className="w-4 h-4" /> Roster
                </div>
                <div className="text-2xl font-black text-white mt-1">220 Players</div>
              </div>

              <div className="glass-card p-3 rounded-xl">
                <div className="flex items-center gap-2 text-[#E87A2D] text-xs font-semibold uppercase">
                  <Zap className="w-4 h-4" /> Events
                </div>
                <div className="text-2xl font-black text-white mt-1">9 Sports</div>
              </div>

              <div className="glass-card p-3 rounded-xl">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold uppercase">
                  <Award className="w-4 h-4" /> Winner
                </div>
                <div className="text-2xl font-black text-white mt-1">1 Trophy</div>
              </div>
            </div>
          </div>

          {/* Right: Captains Showcase (replaces 3D scene) */}
          <div className="lg:col-span-6">
            <CaptainsShowcase
              teams={teams}
              onOpenTeamModal={onOpenTeamModal}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
