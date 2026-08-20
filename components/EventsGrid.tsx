'use client';

import React, { useState } from 'react';
import { Zap, MapPin, Users, X, Info, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { EventInfo, EventResult, Team, PHCL_EVENTS, COMMON_RULES } from '@/lib/phcl-data';

interface EventsGridProps {
  eventResults: EventResult[];
  teams: Team[];
}

export const EventsGrid: React.FC<EventsGridProps> = ({
  eventResults,
  teams
}) => {
  const [activeRuleModal, setActiveRuleModal] = useState<EventInfo | null>(null);
  const [showCommonRules, setShowCommonRules] = useState(false);

  return (
    <div className="space-y-8 py-6" id="events">
      
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-black text-white tracking-wide">PHCL Season 5 Official Events</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Exact regulations, venues, and match rules from the Season 5 Manual. Event points are calculated live and displayed on the Leaderboard!
        </p>
      </div>

      {/* Common Rules Section */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowCommonRules(!showCommonRules)}
          className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-black text-white">Common Rules & Penalties</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Official PHCL Season 5 tournament-wide regulations — applies to all events</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-red-500/15 text-red-300 font-bold border border-red-500/30">
              {COMMON_RULES.length} Rules
            </span>
            {showCommonRules ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {showCommonRules && (
          <div className="px-5 pb-5 pt-0 border-t border-slate-800/60">
            <ul className="space-y-2 mt-4">
              {COMMON_RULES.map((rule, idx) => {
                const isPenalty = rule.includes('Penalty') || rule.includes('deducted') || rule.includes('disqualified');
                return (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs ${
                      isPenalty
                        ? 'bg-red-950/30 border-red-500/20 text-red-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className={`font-black text-sm min-w-[24px] text-center ${
                      isPenalty ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Grid of 9 Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PHCL_EVENTS.map((ev) => {
          return (
            <div
              key={ev.id}
              className="glass-card-hover rounded-2xl p-6 relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Event Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{ev.icon}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700 uppercase">
                    {ev.eventType}
                  </span>
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
              <span>Event points calculation:</span>
              <span className="font-bold text-amber-400">Points are displayed on the Leaderboard</span>
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
