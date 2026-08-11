'use client';

import React, { useState } from 'react';
import { Trophy, Award, Users, ChevronDown, ChevronUp, Search, Info, Grid, Table } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'matrix' | 'standings'>('matrix');
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  // Filter leaderboard by search query
  const filteredList = leaderboard.filter((entry) => {
    const q = searchQuery.toLowerCase();
    const teamMatch = entry.team.name.toLowerCase().includes(q);
    const captainMatch = entry.team.captain.toLowerCase().includes(q);
    const memberMatch = entry.team.members.some(m => m.name.toLowerCase().includes(q));
    return teamMatch || captainMatch || memberMatch;
  });

  const toggleExpand = (teamId: string) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

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

        {/* Search & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'matrix'
                  ? 'bg-[#E87A2D] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>9 Events Points Matrix</span>
            </button>

            <button
              onClick={() => setViewMode('standings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                viewMode === 'standings'
                  ? 'bg-[#E87A2D] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Overall Standings</span>
            </button>
          </div>

          {/* Inline Search input */}
          <div className="relative w-full sm:w-56">
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
      </div>

      {/* VIEW 1: READ-ONLY 9 EVENTS POINTS MATRIX TABLE (Viewer View) */}
      {viewMode === 'matrix' && (
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {/* Matrix Table */}
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
      )}

      {/* VIEW 2: OVERALL STANDINGS TABLE */}
      {viewMode === 'standings' && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4 text-center">Rank</th>
                  <th className="py-4 px-4">Team & Badge</th>
                  <th className="py-4 px-4">Captain</th>
                  <th className="py-4 px-4 text-center">Members</th>
                  <th className="py-4 px-4 text-center">Participated</th>
                  <th className="py-4 px-4 text-center">Gold Wins</th>
                  <th className="py-4 px-4 text-right">Total Points</th>
                  <th className="py-4 px-4 text-center">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                      No teams or captains found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredList.map((entry) => {
                    const isTop1 = entry.rank === 1;
                    const isTop2 = entry.rank === 2;
                    const isTop3 = entry.rank === 3;
                    const isExpanded = expandedTeamId === entry.team.id;

                    return (
                      <React.Fragment key={entry.team.id}>
                        <tr 
                          className={`transition-colors hover:bg-slate-800/50 ${
                            isTop1 ? 'bg-amber-500/5' : isTop2 ? 'bg-slate-400/5' : isTop3 ? 'bg-amber-700/5' : ''
                          }`}
                        >
                          {/* Rank */}
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center">
                              {isTop1 ? (
                                <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                                  🥇 1
                                </span>
                              ) : isTop2 ? (
                                <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                                  🥈 2
                                </span>
                              ) : isTop3 ? (
                                <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                                  🥉 3
                                </span>
                              ) : (
                                <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                                  #{entry.rank}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Team Name */}
                          <td className="py-4 px-4 font-bold text-white">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{entry.team.badgeSymbol}</span>
                              <div>
                                <button
                                  onClick={() => onOpenTeamModal(entry.team.id)}
                                  className="hover:text-amber-400 transition-colors text-left font-extrabold text-base block"
                                >
                                  {entry.team.name}
                                </button>
                                <span className="text-[11px] text-slate-400 font-medium italic block">
                                  "{entry.team.motto}"
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Captain */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={entry.team.captainImage}
                                alt={entry.team.captain}
                                className="w-8 h-8 rounded-full object-cover border border-slate-700"
                              />
                              <div>
                                <span className="text-slate-200 font-bold text-xs block">{entry.team.captain}</span>
                                <span className="text-[10px] text-amber-400 font-semibold uppercase">Captain</span>
                              </div>
                            </div>
                          </td>

                          {/* Members */}
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => onOpenTeamModal(entry.team.id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                            >
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              <span>22 Members</span>
                            </button>
                          </td>

                          {/* Events Participated */}
                          <td className="py-4 px-4 text-center font-semibold text-slate-300">
                            {entry.eventsParticipated} / 9
                          </td>

                          {/* Events Won (Gold) */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#E87A2D]/10 text-[#E87A2D] font-extrabold text-xs border border-[#E87A2D]/30">
                              🏆 {entry.eventsWon}
                            </span>
                          </td>

                          {/* Total Points */}
                          <td className="py-4 px-4 text-right">
                            <span className="text-xl font-black text-amber-400">
                              {entry.totalPoints} <span className="text-xs font-semibold text-slate-400">pts</span>
                            </span>
                          </td>

                          {/* Breakdown Accordion Toggle */}
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => toggleExpand(entry.team.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Toggle event breakdown"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Breakdown Drawer */}
                        {isExpanded && (
                          <tr className="bg-slate-950/90 border-b border-slate-800">
                            <td colSpan={8} className="p-4">
                              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                                    <Info className="w-4 h-4" /> Point Breakdown per Event for {entry.team.name}
                                  </h4>
                                  <span className="text-xs text-slate-400">
                                    🥇 First: 50/30pts • 🥈 Second: 30/20pts • 🥉 Third: 20/10pts • 🎖️ Participated: 10/5pts
                                  </span>
                                </div>

                                {entry.breakdown.length === 0 ? (
                                  <p className="text-xs text-slate-400 italic">No event points scored yet.</p>
                                ) : (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {entry.breakdown.map((b, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs"
                                      >
                                        <div>
                                          <div className="font-bold text-white">{b.eventName}</div>
                                          <div className="text-[11px] text-slate-400">{b.position}</div>
                                        </div>
                                        <span className="font-black text-amber-400 text-sm">+{b.points} pts</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
