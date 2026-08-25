'use client';

import React from 'react';
import { Trophy, Award, Users } from 'lucide-react';
import { TeamLeaderboardEntry } from '@/lib/phcl-data';

interface LeaderboardPodiumProps {
  topThree: TeamLeaderboardEntry[];
  onOpenTeamModal: (teamId: string) => void;
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({
  topThree,
  onOpenTeamModal
}) => {
  if (topThree.length < 3) return null;
  if (topThree.every(entry => entry.totalPoints === 0)) return null;

  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <div className="py-8 my-4">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded glass-card text-[#E87A2D] text-xs font-bold uppercase tracking-widest">
          <Trophy className="w-4 h-4" /> Championship Standings
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Top 3 League Leaders</h2>
        <p className="text-sm text-slate-400">Current top performing captains and teams based on points</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto px-4">
        
        {/* 2nd Place */}
        <div className="order-2 md:order-1 glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-slate-600 text-white font-extrabold text-xs">
            RANK #2
          </div>
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={second.team.captainImage}
                alt={second.team.captain}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-slate-400 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-500 text-white font-black text-sm flex items-center justify-center border-2 border-slate-800">
                2nd
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">
                {second.team.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Capt. {second.team.captain}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Points</span>
              <span className="text-2xl font-black text-slate-200">{second.totalPoints} pts</span>
            </div>

            <button
              onClick={() => onOpenTeamModal(second.team.id)}
              className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Inspect Roster</span>
            </button>
          </div>
        </div>

        {/* 1st Place */}
        <div className="order-1 md:order-2 glass-card rounded-2xl p-7 border-2 !border-amber-500/60 relative overflow-hidden group hover:!border-amber-400/80 transition-all transform md:-translate-y-4" style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.08), 0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
          <div className="absolute top-0 right-0 px-5 py-1.5 rounded-bl-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
            RANK #1
          </div>

          <div className="text-center space-y-4">
            <div className="relative inline-block mt-2">
              <img
                src={first.team.captainImage}
                alt={first.team.captain}
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-amber-500 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center border-2 border-slate-800">
                1st
              </span>
            </div>

            <div>
              <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/40 inline-block mb-1">
                {first.team.badgeSymbol} {first.team.name}
              </span>
              <h3 className="text-2xl font-black text-white">
                {first.team.name}
              </h3>
              <p className="text-sm text-slate-300 font-semibold">Captain: {first.team.captain}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-amber-500/20 text-center">
              <span className="block text-[11px] text-amber-500 font-bold uppercase">Total Points</span>
              <span className="text-3xl font-black text-amber-400">{first.totalPoints} pts</span>
            </div>

            <button
              onClick={() => onOpenTeamModal(first.team.id)}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-colors flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Captain & Roster Details</span>
            </button>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
          <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-slate-700 text-slate-200 font-extrabold text-xs">
            RANK #3
          </div>
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={third.team.captainImage}
                alt={third.team.captain}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-slate-600 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-600 text-white font-black text-sm flex items-center justify-center border-2 border-slate-800">
                3rd
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">
                {third.team.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Capt. {third.team.captain}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center">
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Points</span>
              <span className="text-2xl font-black text-slate-200">{third.totalPoints} pts</span>
            </div>

            <button
              onClick={() => onOpenTeamModal(third.team.id)}
              className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Inspect Roster</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
