'use client';

import React, { useState } from 'react';
import { Flame, Trophy, Award, Check, RefreshCw, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventInfo, EventResult, Team, PHCL_EVENTS } from '@/lib/phcl-data';

interface LiveScoreSimulatorProps {
  teams: Team[];
  eventResults: EventResult[];
  onUpdateResults: (newResults: EventResult[]) => void;
  onResetResults: () => void;
}

export const LiveScoreSimulator: React.FC<LiveScoreSimulatorProps> = ({
  teams,
  eventResults,
  onUpdateResults,
  onResetResults
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(PHCL_EVENTS[0].id); // Box Cricket
  const [firstTeamId, setFirstTeamId] = useState<string>(teams[0]?.id || '');
  const [secondTeamId, setSecondTeamId] = useState<string>(teams[1]?.id || '');
  const [thirdTeamId, setThirdTeamId] = useState<string>(teams[2]?.id || '');

  const activeEvent = PHCL_EVENTS.find(e => e.id === selectedEventId) || PHCL_EVENTS[0];
  const scale = activeEvent.pointsScale;

  const handleSimulateWinner = (e: React.FormEvent) => {
    e.preventDefault();

    if (firstTeamId === secondTeamId || firstTeamId === thirdTeamId || secondTeamId === thirdTeamId) {
      alert('Please select three distinct teams for 1st, 2nd, and 3rd place!');
      return;
    }

    const otherTeams = teams
      .map(t => t.id)
      .filter(id => id !== firstTeamId && id !== secondTeamId && id !== thirdTeamId);

    const updated = eventResults.map(res => {
      if (res.eventId === selectedEventId) {
        return {
          ...res,
          firstTeamId,
          secondTeamId,
          thirdTeamId,
          participatingTeamIds: otherTeams
        };
      }
      return res;
    });

    if (!updated.some(r => r.eventId === selectedEventId)) {
      updated.push({
        eventId: selectedEventId,
        eventName: activeEvent.name,
        firstTeamId,
        secondTeamId,
        thirdTeamId,
        participatingTeamIds: otherTeams
      });
    }

    onUpdateResults(updated);

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 py-6" id="simulator">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">Season 4 Live Score Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate or input live Season 4 event victories! Points dynamically calculate based on Group vs Individual event rules.
          </p>
        </div>

        <button
          onClick={onResetResults}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Reset Season 5 Results</span>
        </button>
      </div>

      {/* Main Simulator Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-amber-400" />
        </div>

        <form onSubmit={handleSimulateWinner} className="space-y-6 relative z-10">
          
          {/* Select Event */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
              Step 1: Select Season 5 Event to Declare Winner
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {PHCL_EVENTS.map((ev) => {
                const isSelected = selectedEventId === ev.id;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => setSelectedEventId(ev.id)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold scale-105 shadow-lg'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl block">{ev.icon}</span>
                    <span className="text-[10px] font-bold mt-1 line-clamp-1 block">{ev.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Event Banner */}
          <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeEvent.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-white">{activeEvent.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 uppercase">
                    {activeEvent.eventType}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{activeEvent.category} • Venue: {activeEvent.venue} ({activeEvent.teamSize})</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-amber-400 font-bold uppercase block">Season 4 Points Scale</span>
              <span className="text-xs text-slate-300 font-bold">🥇 {scale.first} | 🥈 {scale.second} | 🥉 {scale.third} | 🎖️ {scale.participation}</span>
            </div>
          </div>

          {/* Step 2: Select Winners */}
          <div className="space-y-4">
            <label className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
              Step 2: Assign Podium Victories
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* 1st Place */}
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-amber-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                    <span>🥇</span>
                    <span>FIRST PLACE</span>
                  </div>
                  <span className="text-xs font-black text-amber-400">+{scale.first} PTS</span>
                </div>
                <select
                  value={firstTeamId}
                  onChange={(e) => setFirstTeamId(e.target.value)}
                  className="w-full bg-slate-900 border border-amber-500/40 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-amber-400"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Capt. {t.captain})
                    </option>
                  ))}
                </select>
              </div>

              {/* 2nd Place */}
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300 font-extrabold text-xs">
                    <span>🥈</span>
                    <span>SECOND PLACE</span>
                  </div>
                  <span className="text-xs font-black text-slate-200">+{scale.second} PTS</span>
                </div>
                <select
                  value={secondTeamId}
                  onChange={(e) => setSecondTeamId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-slate-400"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Capt. {t.captain})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3rd Place */}
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-amber-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-xs">
                    <span>🥉</span>
                    <span>THIRD PLACE</span>
                  </div>
                  <span className="text-xs font-black text-amber-500">+{scale.third} PTS</span>
                </div>
                <select
                  value={thirdTeamId}
                  onChange={(e) => setThirdTeamId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-bold focus:outline-none focus:border-amber-600"
                >
                  {teams.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (Capt. {t.captain})
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:brightness-110 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Trophy className="w-5 h-5" />
            <span>Update Official Leaderboard & Launch Confetti</span>
          </button>

        </form>
      </div>
    </div>
  );
};
