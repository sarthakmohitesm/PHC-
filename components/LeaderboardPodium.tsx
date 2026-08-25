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
    <div className="py-5 my-2">
      <div className="text-center max-w-xl mx-auto mb-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#E87A2D]/40 bg-[#0a1224] text-[#E87A2D] text-[10px] font-black uppercase tracking-[0.2em]">
          <Trophy className="w-3.5 h-3.5" /> Championship Standings
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Top 3 League Leaders</h2>
        <p className="text-xs text-slate-400">Current top performing captains and teams based on points</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-5xl mx-auto px-2">
        <div className="order-2 md:order-1 rounded-2xl p-4 border border-slate-700/80 bg-[#0f172a]/90 shadow-[0_10px_30px_rgba(15,23,42,0.6)] hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">Rank #2</span>
            <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold">2nd</span>
          </div>

          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <img
                src={second.team.captainImage}
                alt={second.team.captain}
                className="w-16 h-16 rounded-full mx-auto object-cover border-3 border-slate-400 shadow-lg"
              />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white leading-tight">{second.team.name}</h3>
              <p className="text-[11px] text-slate-400 font-medium">Capt. {second.team.captain}</p>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-2.5 text-center">
              <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]">Points</span>
              <span className="text-xl font-black text-slate-200">{second.totalPoints} pts</span>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 rounded-2xl p-4 border-2 border-amber-500/70 bg-[#111b2c] shadow-[0_14px_40px_rgba(245,158,11,0.18)] relative overflow-hidden transform md:-translate-y-2 transition-all">
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-lg bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em]">
            Rank #1
          </div>

          <div className="text-center space-y-3 pt-2">
            <div className="relative inline-block">
              <img
                src={first.team.captainImage}
                alt={first.team.captain}
                className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              />
              <span className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center border-2 border-slate-900">
                1st
              </span>
            </div>

            <div>
              <span className="inline-block mb-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-300">
                {first.team.badgeSymbol} {first.team.name}
              </span>
              <h3 className="text-xl font-black text-white leading-tight">{first.team.name}</h3>
              <p className="text-[11px] text-slate-300 font-semibold">Captain: {first.team.captain}</p>
            </div>

            <div className="bg-black/30 border border-amber-500/20 rounded-xl p-2.5 text-center">
              <span className="block text-[9px] text-amber-400 font-bold uppercase tracking-[0.15em]">Total Points</span>
              <span className="text-2xl font-black text-amber-400">{first.totalPoints} pts</span>
            </div>
          </div>
        </div>

        <div className="order-3 rounded-2xl p-4 border border-slate-700/80 bg-[#0f172a]/90 shadow-[0_10px_30px_rgba(15,23,42,0.6)] hover:border-slate-600 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">Rank #3</span>
            <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-200 text-[10px] font-bold">3rd</span>
          </div>

          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <img
                src={third.team.captainImage}
                alt={third.team.captain}
                className="w-16 h-16 rounded-full mx-auto object-cover border-3 border-slate-500 shadow-lg"
              />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-white leading-tight">{third.team.name}</h3>
              <p className="text-[11px] text-slate-400 font-medium">Capt. {third.team.captain}</p>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-xl p-2.5 text-center">
              <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-[0.15em]">Points</span>
              <span className="text-xl font-black text-slate-200">{third.totalPoints} pts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
