'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Trophy, Flame, CheckCircle, Star } from 'lucide-react';
import { MatchFixture, Team } from '@/lib/phcl-data';

interface MatchScheduleProps {
  fixtures: MatchFixture[];
  teams: Team[];
  onOpenTeamModal: (teamId: string) => void;
}

export const MatchSchedule: React.FC<MatchScheduleProps> = ({
  fixtures,
  teams,
  onOpenTeamModal
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredFixtures = fixtures.filter(f => {
    return filterStatus === 'ALL' || f.status === filterStatus;
  });

  const getTeam = (teamId: string) => {
    return teams.find(t => t.id === teamId);
  };

  return (
    <div className="space-y-8 py-6" id="fixtures">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">PHCL Matches & Schedule</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track live clashes, upcoming fixtures, and final match scorelines with Player of the Match honors.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {['ALL', 'Live', 'Completed', 'Upcoming'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Fixtures List */}
      <div className="space-y-4">
        {filteredFixtures.map((fix) => {
          const teamA = getTeam(fix.teamAId);
          const teamB = getTeam(fix.teamBId);
          const isWinnerA = fix.winnerTeamId === fix.teamAId;
          const isWinnerB = fix.winnerTeamId === fix.teamBId;

          return (
            <div
              key={fix.id}
              className={`bg-slate-800 rounded-2xl p-6 border transition-all ${
                fix.status === 'Live'
                  ? 'border-red-500 bg-red-950/20'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Event & Stage Meta */}
                <div className="space-y-1 lg:w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{fix.eventIcon}</span>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      {fix.eventName}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-300">{fix.stage}</div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{fix.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{fix.venue}</span>
                  </div>
                </div>

                {/* Match Scoreboard Clash */}
                <div className="flex-1 grid grid-cols-7 items-center gap-2 bg-slate-950/90 p-4 rounded-2xl border border-slate-800 text-center">
                  
                  {/* Team A */}
                  <div className="col-span-3 flex flex-col items-center sm:flex-row sm:items-center justify-end gap-3">
                    <div className="text-right">
                      <button
                        onClick={() => teamA && onOpenTeamModal(teamA.id)}
                        className={`font-black text-base hover:text-amber-400 transition-colors block ${
                          isWinnerA ? 'text-amber-400 font-black' : 'text-white'
                        }`}
                      >
                        {teamA ? teamA.name : fix.teamAId}
                      </button>
                      <span className="text-[11px] text-slate-400 block">Capt. {teamA?.captain}</span>
                    </div>
                    {teamA && (
                      <img
                        src={teamA.captainImage}
                        alt={teamA.captain}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                    )}
                  </div>

                  {/* Score / VS Center */}
                  <div className="col-span-1 flex flex-col items-center justify-center">
                    {fix.status === 'Completed' ? (
                      <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
                        <span className="text-sm font-black text-amber-400 block">{fix.scoreA}</span>
                        <span className="text-[10px] text-slate-500 font-bold block uppercase">FT</span>
                        <span className="text-sm font-black text-amber-400 block">{fix.scoreB}</span>
                      </div>
                    ) : fix.status === 'Live' ? (
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[10px] uppercase animate-pulse">
                          LIVE
                        </span>
                        <span className="text-xs font-black text-white block">VS</span>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        VS
                      </span>
                    )}
                  </div>

                  {/* Team B */}
                  <div className="col-span-3 flex flex-col items-center sm:flex-row sm:items-center justify-start gap-3">
                    {teamB && (
                      <img
                        src={teamB.captainImage}
                        alt={teamB.captain}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                    )}
                    <div className="text-left">
                      <button
                        onClick={() => teamB && onOpenTeamModal(teamB.id)}
                        className={`font-black text-base hover:text-amber-400 transition-colors block ${
                          isWinnerB ? 'text-amber-400 font-black' : 'text-white'
                        }`}
                      >
                        {teamB ? teamB.name : fix.teamBId}
                      </button>
                      <span className="text-[11px] text-slate-400 block">Capt. {teamB?.captain}</span>
                    </div>
                  </div>

                </div>

                {/* MVP & Status Badge */}
                <div className="lg:w-1/4 space-y-2 text-right">
                  {fix.status === 'Completed' && fix.mvp && (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-amber-500/20 text-xs space-y-0.5">
                      <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-amber-400 uppercase">
                        <Star className="w-3 h-3 fill-amber-400" /> Player of the Match
                      </div>
                      <div className="font-semibold text-slate-200">{fix.mvp}</div>
                    </div>
                  )}

                  {fix.status === 'Upcoming' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" /> Scheduled
                    </span>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
