'use client';

import React from 'react';
import { Trophy, Search } from 'lucide-react';
import { TeamLeaderboardEntry, PHCL_EVENTS } from '@/lib/phcl-data';

interface LeaderboardTableProps {
  leaderboard: TeamLeaderboardEntry[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenTeamModal: (teamId: string) => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboard,
  searchQuery,
  setSearchQuery,
  onOpenTeamModal
}) => {
  // Filter leaderboard by search query
  const filteredList = leaderboard.filter((entry) => {
    const q = searchQuery.toLowerCase();
    const teamMatch = entry.team.name.toLowerCase().includes(q);
    const captainMatch = entry.team.captain.toLowerCase().includes(q);
    const memberMatch = entry.team.members.some(m => m.name.toLowerCase().includes(q));
    return teamMatch || captainMatch || memberMatch;
  });

  return (
    <div className="space-y-6 py-6" id="leaderboard">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">PHCL Tournament Scoreboard</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official live points matrix across all 9 PHCL events. Updated in real-time by event judges!
          </p>
        </div>

        {/* Inline Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search team or captain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* 9 EVENTS POINTS MATRIX TABLE */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
        <div className="w-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-700 text-[10px] text-slate-300 uppercase font-black tracking-wider">
                <th className="py-3 px-2 sm:px-3 w-[18%] sticky left-0 bg-[#0f172a] z-10 border-r border-slate-700">
                  Team & Captain
                </th>
                {PHCL_EVENTS.map(ev => {
                  // Short labels for clean fitting
                  const shortName = ev.name.includes('Box Cricket') ? 'Cricket' :
                    ev.name.includes('Athletics') ? 'Athletics' :
                    ev.name.includes('GK Quiz') ? 'GK Quiz' : ev.name;

                  return (
                    <th key={ev.id} className="py-2.5 px-0.5 sm:px-1 text-center w-[8%] border-r border-slate-800/60">
                      <div className="text-base sm:text-lg">{ev.icon}</div>
                      <div className="font-black text-white text-[9px] sm:text-[10px] uppercase leading-tight truncate px-0.5" title={ev.name}>
                        {shortName}
                      </div>
                      <div className="text-[8px] sm:text-[9px] text-[#E87A2D] font-bold mt-0.5">
                        {ev.pointsScale.first}P
                      </div>
                    </th>
                  );
                })}
                <th className="py-3 px-1 sm:px-2 text-center w-[10%] bg-slate-950 text-amber-400 font-black">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 text-sm">
                    No teams or captains found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredList.map((entry) => {
                  const team = entry.team;
                  const eventScores = team.eventScores || {};

                  return (
                    <tr key={team.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Team & Captain Column */}
                      <td className="py-2.5 px-2 sm:px-3 font-extrabold text-white sticky left-0 bg-[#111a2e] z-10 border-r border-slate-700">
                        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                          <span className="text-base sm:text-xl shrink-0">{team.badgeSymbol}</span>
                          <div className="min-w-0 truncate">
                            <button
                              onClick={() => onOpenTeamModal(team.id)}
                              className="font-extrabold text-xs sm:text-sm text-white hover:text-[#E87A2D] transition-colors truncate block text-left w-full"
                            >
                              {team.name}
                            </button>
                            <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal truncate block">
                              {team.captain}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 9 Event Cells */}
                      {PHCL_EVENTS.map(ev => {
                        const score = Number(eventScores[ev.id]) || 0;

                        return (
                          <td key={ev.id} className="py-2.5 px-0.5 text-center border-r border-slate-800/40">
                            <div className="flex items-center justify-center">
                              <div
                                className={`w-9 sm:w-11 py-1 rounded text-center font-black text-[11px] sm:text-xs transition-all ${
                                  score > 0
                                    ? 'bg-[#E87A2D]/20 text-amber-400 border border-[#E87A2D]/70 shadow-[0_0_8px_rgba(232,122,45,0.25)]'
                                    : 'bg-slate-900/80 text-slate-500 border border-slate-800'
                                }`}
                              >
                                {score}
                              </div>
                            </div>
                          </td>
                        );
                      })}

                      {/* Total Score Column */}
                      <td className="py-2.5 px-1 sm:px-2 text-center font-black text-xs sm:text-sm text-amber-400 bg-slate-950/70">
                        {entry.totalPoints} <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">pts</span>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
