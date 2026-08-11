'use client';

import React, { Suspense } from 'react';
import { Trophy, Shield, Users, Zap, Award, Sparkles, ChevronRight, Flame } from 'lucide-react';
import { TeamLeaderboardEntry } from '@/lib/phcl-data';
import { SportsScene3D } from '@/components/SportsScene3D';

interface HeroBannerProps {
  topLeaderboard: TeamLeaderboardEntry[];
  setActiveTab: (tab: string) => void;
  onOpenTeamModal: (teamId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  topLeaderboard,
  setActiveTab,
  onOpenTeamModal
}) => {
  const currentLeader = topLeaderboard[0];

  return (
    <div className="relative overflow-hidden py-16 md:py-20 border-b border-slate-700 bg-[#111a2e]">
      
      {/* Three.js 3D Sports Objects Floating Over Hero */}
      <Suspense fallback={null}>
        <SportsScene3D />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Information */}
          <div className="lg:col-span-7 space-y-6">
            
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
                  Season 4
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
                onClick={() => setActiveTab('simulator')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-colors"
              >
                <Flame className="w-5 h-5 text-[#E87A2D]" />
                <span>Live Score Simulator</span>
              </button>
            </div>

            {/* Stats Ticker Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-700">
              <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-[#1C6E7D] text-xs font-semibold uppercase">
                  <Shield className="w-4 h-4" /> Teams
                </div>
                <div className="text-2xl font-black text-white mt-1">10 Squads</div>
              </div>

              <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-[#1C6E7D] text-xs font-semibold uppercase">
                  <Users className="w-4 h-4" /> Roster
                </div>
                <div className="text-2xl font-black text-white mt-1">220 Players</div>
              </div>

              <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-[#E87A2D] text-xs font-semibold uppercase">
                  <Zap className="w-4 h-4" /> Events
                </div>
                <div className="text-2xl font-black text-white mt-1">9 Sports</div>
              </div>

              <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold uppercase">
                  <Award className="w-4 h-4" /> Winner
                </div>
                <div className="text-2xl font-black text-white mt-1">1 Trophy</div>
              </div>
            </div>

          </div>

          {/* Current Leader Spotlight Card */}
          <div className="lg:col-span-5">
            {currentLeader && (
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-600 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E87A2D]"></span>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#E87A2D]">
                      Current Rank #1 Leader
                    </span>
                  </div>
                  <span className="text-2xl">👑</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={currentLeader.team.captainImage}
                    alt={currentLeader.team.captain}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-slate-600"
                  />
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      {currentLeader.team.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-300">
                      Captain: <span className="text-white">{currentLeader.team.captain}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium italic mt-0.5">
                      &quot;{currentLeader.team.motto}&quot;
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#0f172a] p-3.5 rounded-lg border border-slate-700 text-center">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Total Points</div>
                    <div className="text-2xl font-black text-amber-500">{currentLeader.totalPoints}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Gold Wins</div>
                    <div className="text-2xl font-black text-[#E87A2D]">{currentLeader.eventsWon}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">Squad</div>
                    <div className="text-2xl font-black text-[#1C6E7D]">22 Members</div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenTeamModal(currentLeader.team.id)}
                  className="w-full py-2.5 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Roster & Captain Breakdown</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
