'use client';

import React, { useState } from 'react';
import { Zap, MapPin, Users, Clock, Award, CheckCircle, Flame, X, Info } from 'lucide-react';
import { EventInfo, EventResult, Team, PHCL_EVENTS } from '@/lib/phcl-data';

interface EventsGridProps {
  eventResults: EventResult[];
  teams: Team[];
}

export const EventsGrid: React.FC<EventsGridProps> = ({
  eventResults,
  teams
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeRuleModal, setActiveRuleModal] = useState<EventInfo | null>(null);

  const categories = ['ALL', 'Outdoor Sports', 'Indoor Sports', 'Mind & Athletics', 'Cultural & Speech'];

  const filteredEvents = PHCL_EVENTS.filter(e => {
    return selectedCategory === 'ALL' || e.category === selectedCategory;
  });

  const getTeamName = (teamId: string) => {
    const found = teams.find(t => t.id === teamId);
    return found ? found.name : teamId;
  };

  const getEventResult = (eventId: string) => {
    return eventResults.find(r => r.eventId === eventId);
  };

  return (
    <div className="space-y-8 py-6" id="events">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">PHCL Season 5 Official Events</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Exact regulations, venues, and points system from the Season 5 Manual. Group events (50/30/20/10 pts) and Individual events (30/20/10/5 pts).
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 9 Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => {
          const res = getEventResult(ev.id);
          const isCompleted = ev.status === 'Completed' || !!res?.firstTeamId;
          const isLive = ev.status === 'Live';
          const scale = ev.pointsScale;

          return (
            <div
              key={ev.id}
              className="glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Event Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{ev.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700 uppercase">
                      {ev.eventType}
                    </span>
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-black border border-red-500/40 animate-pulse">
                        <Flame className="w-3.5 h-3.5" /> LIVE
                      </span>
                    ) : isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1C6E7D]/20 text-[#1C6E7D] text-xs font-bold border border-[#1C6E7D]/40">
                        <CheckCircle className="w-3.5 h-3.5" /> Result
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
                        <Clock className="w-3.5 h-3.5" /> Upcoming
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                    {ev.category}
                  </span>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors mt-0.5">
                    {ev.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {/* Venue & Team Size Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{ev.teamSize}</span>
                  </div>
                </div>

                {/* Winner Card if Completed */}
                {res && (
                  <div className="bg-black/30 backdrop-blur-sm p-3 rounded-xl border border-amber-500/20 space-y-1">
                    <div className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Event Podium Winners
                    </div>
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>🥇 1st: {getTeamName(res.firstTeamId)}</span>
                      <span className="text-amber-400 font-black">+{scale.first} pts</span>
                    </div>
                    <div className="text-[11px] text-slate-300 flex items-center justify-between">
                      <span>🥈 2nd: {getTeamName(res.secondTeamId)}</span>
                      <span className="text-slate-400 font-semibold">+{scale.second} pts</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span>🥉 3rd: {getTeamName(res.thirdTeamId)}</span>
                      <span className="text-amber-600 font-semibold">+{scale.third} pts</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveRuleModal(ev)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Season 5 Official Rules</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Rules Modal */}
      {activeRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-modal-backdrop">
          <div className="relative w-full max-w-lg rounded-2xl glass-modal p-6 space-y-4">
            <button
              onClick={() => setActiveRuleModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeRuleModal.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">{activeRuleModal.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    {activeRuleModal.eventType}
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-semibold">{activeRuleModal.category} • {activeRuleModal.venue}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Season 5 Official Rules</h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeRuleModal.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/20 text-xs flex justify-between items-center text-slate-300">
              <span>Points scale ({activeRuleModal.eventType}):</span>
              <span className="font-bold text-amber-400">🥇 {activeRuleModal.pointsScale.first} | 🥈 {activeRuleModal.pointsScale.second} | 🥉 {activeRuleModal.pointsScale.third} | 🎖️ {activeRuleModal.pointsScale.participation}</span>
            </div>

            <button
              onClick={() => setActiveRuleModal(null)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Rules
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
