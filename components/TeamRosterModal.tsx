'use client';

import React, { useState } from 'react';
import { X, Shield, Users, Award, Trophy, Search, Star } from 'lucide-react';
import { Team, TeamLeaderboardEntry } from '@/lib/phcl-data';

interface TeamRosterModalProps {
  team: Team | null;
  leaderboardEntry?: TeamLeaderboardEntry;
  onClose: () => void;
}

export const TeamRosterModal: React.FC<TeamRosterModalProps> = ({
  team,
  leaderboardEntry,
  onClose
}) => {
  const [filterRole, setFilterRole] = useState<string>('ALL');
  const [memberSearch, setMemberSearch] = useState<string>('');

  if (!team) return null;

  const filteredMembers = team.members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          m.specialtyEvent.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesRole = filterRole === 'ALL' || m.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-modal-backdrop overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl glass-modal text-white overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={team.captainImage}
              alt={team.captain}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
            />
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{team.badgeSymbol}</span>
                <h2 className="text-3xl font-black text-white">{team.name}</h2>
                {leaderboardEntry && (
                  <span className="ml-auto text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                    Rank #{leaderboardEntry.rank} • {leaderboardEntry.totalPoints} Pts
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Captain: <strong className="text-white">{team.captain}</strong></span>
              </div>

              <p className="text-xs text-amber-300/90 italic">"{team.motto}"</p>
              <p className="text-xs text-slate-400 line-clamp-2">{team.captainBio}</p>
            </div>
          </div>
        </div>

        {/* Modal Body & Squad Filter */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">
          
          {/* Squad Summary Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Total Squad</span>
              <span className="text-xl font-black text-white">{team.members.length} Members</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Captain</span>
              <span className="text-xl font-black text-amber-400">{team.captain.split(' ')[0]}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase">Points Scored</span>
              <span className="text-xl font-black text-amber-400">{leaderboardEntry?.totalPoints || 0} pts</span>
            </div>
          </div>

          {/* Roster Controls & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-extrabold text-white">Full 22-Athlete Roster</h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search player, event..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="ALL">All Roles</option>
                <option value="Captain">Captain</option>
                <option value="Vice Captain">Vice Captain</option>
                <option value="Core Athlete">Core Athlete</option>
                <option value="Squad Member">Squad Member</option>
              </select>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredMembers.map((member, idx) => {
              const isCaptain = member.role === 'Captain';
              const isVice = member.role === 'Vice Captain';

              return (
                <div
                  key={member.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCaptain
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                      : isVice
                      ? 'bg-cyan-500/10 border-cyan-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 mr-1.5">#{idx + 1}</span>
                      <span className="font-extrabold text-white text-sm">{member.name}</span>
                    </div>
                    {isCaptain && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>

                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400">Role:</span>
                      <span className={`font-semibold ${isCaptain ? 'text-amber-400' : isVice ? 'text-cyan-300' : 'text-slate-300'}`}>
                        {member.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-[11px] text-slate-400">Primary Event:</span>
                      <span className="font-medium text-[#E87A2D]">{member.specialtyEvent}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Close Roster View
          </button>
        </div>

      </div>
    </div>
  );
};
