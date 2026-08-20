'use client';

import React from 'react';
import { Shield, Users, Trophy, Award, ChevronRight, Search } from 'lucide-react';
import { Team, TeamLeaderboardEntry, getTeamVisualTheme } from '@/lib/phcl-data';

interface TeamsGridProps {
  teams: Team[];
  leaderboard: TeamLeaderboardEntry[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenTeamModal: (teamId: string) => void;
}

export const TeamsGrid: React.FC<TeamsGridProps> = ({
  teams,
  leaderboard,
  searchQuery,
  setSearchQuery,
  onOpenTeamModal
}) => {
  const getLeaderboardEntry = (teamId: string) => {
    return leaderboard.find(l => l.team.id === teamId);
  };

  const filteredTeams = teams.filter(t => {
    const q = searchQuery.toLowerCase();
    const nameMatch = t.name.toLowerCase().includes(q);
    const captainMatch = t.captain.toLowerCase().includes(q);
    const memberMatch = t.members.some(m => m.name.toLowerCase().includes(q));
    return nameMatch || captainMatch || memberMatch;
  });

  return (
    <div className="space-y-8 py-6" id="teams">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">8 League Teams & Captains</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Every team consists of exactly 23 members competing across 9 PHCL events. Click any squad to view full player details!
          </p>
        </div>

        {/* Search Input */}
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

      {/* Grid of 10 Teams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => {
          const entry = getLeaderboardEntry(team.id);
          const rank = entry ? entry.rank : '-';
          const points = entry ? entry.totalPoints : 0;
          const theme = getTeamVisualTheme(team);

          return (
            <div
              key={team.id}
              className="glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between group transition-all duration-300 hover:border-white/30"
              style={{
                borderColor: undefined
              }}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{team.badgeSymbol}</span>
                    <span className={`text-xs font-black tracking-wider uppercase ${theme.textColor}`}>
                      RANK #{rank}
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${theme.badgeBg}`}>
                    22 Members
                  </span>
                </div>

                {/* Team Captain Card */}
                <div className="flex items-center gap-4">
                  <img
                    src={team.captainImage}
                    alt={team.captain}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:scale-105 transition-all shadow-md"
                    style={{ borderColor: theme.accentColor }}
                  />
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-300">
                      Captain: <span className="text-white">{team.captain}</span>
                    </p>
                    <p className={`text-[11px] italic mt-0.5 font-medium ${theme.textColor}`}>
                      &quot;{team.motto}&quot;
                    </p>
                  </div>
                </div>

                {/* Captain Bio */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {team.captainBio}
                </p>
              </div>

              {/* Stats & Roster Trigger */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                <div className="text-center bg-black/30 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">League Points</span>
                  <span className={`text-lg font-black ${theme.textColor}`}>{points} pts</span>
                </div>

                <button
                  onClick={() => onOpenTeamModal(team.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <Users className="w-4 h-4" />
                  <span>Inspect 22-Member Roster</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
