'use client';

import React from 'react';
import { Award, Shield, CheckCircle, Info, Zap, Star, Trophy, Users, MapPin, AlertTriangle } from 'lucide-react';
import { PHCL_EVENTS, COMMON_RULES } from '@/lib/phcl-data';

export const RulesScoringSection: React.FC = () => {
  return (
    <div className="space-y-8 py-6" id="rules">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-black text-white tracking-wide">PHCL Season 4 Official Rulebook</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official guidelines, scoring breakdown, participant quotas, and event rules from the Pillai HOC College League Season 4 Manual.
          </p>
        </div>
      </div>

      {/* Points System Comparison Banner (Group vs Individual) */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Season 4 Official Points System Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Group Events Points Box */}
          <div className="bg-slate-800 rounded-2xl p-6 border-2 border-amber-500 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Category 1</span>
                <h4 className="text-xl font-black text-white">Group Events</h4>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                Box Cricket, Futsal, Basketball, Athletics, GK Quiz, Debate
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥇 1st Place</span>
                <span className="text-2xl font-black text-amber-400">50 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥈 2nd Place</span>
                <span className="text-2xl font-black text-slate-200">30 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥉 3rd Place</span>
                <span className="text-2xl font-black text-amber-600">20 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🎖️ Participated</span>
                <span className="text-2xl font-black text-cyan-400">10 Pts</span>
              </div>
            </div>
          </div>

          {/* Individual Events Points Box */}
          <div className="bg-slate-800 rounded-2xl p-6 border-2 border-[#1C6E7D] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">Category 2</span>
                <h4 className="text-xl font-black text-white">Individual Events</h4>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                Badminton, Table Tennis, Chess
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-cyan-500/30">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥇 1st Place</span>
                <span className="text-2xl font-black text-amber-400">30 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-700">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥈 2nd Place</span>
                <span className="text-2xl font-black text-slate-200">20 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🥉 3rd Place</span>
                <span className="text-2xl font-black text-amber-600">10 Pts</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">🎖️ Participated</span>
                <span className="text-2xl font-black text-cyan-400">5 Pts</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Common Rules from Season 4 Manual */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-600 space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Season 4 Common Regulations & Student Eligibility
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          {COMMON_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                {idx + 1}
              </span>
              <p className="leading-relaxed text-slate-200 font-normal">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed 9 Event Specifications Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Season 4 Event-Specific Regulations & Venues
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PHCL_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-600 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ev.icon}</span>
                  <div>
                    <h4 className="text-lg font-black text-white">{ev.name}</h4>
                    <span className="text-[11px] text-amber-400 font-semibold uppercase">{ev.eventType} • {ev.category}</span>
                  </div>
                </div>

                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                  {ev.teamSize}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Venue: <strong className="text-slate-200">{ev.venue}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quota: <strong className="text-slate-200">{ev.teamSize}</strong></span>
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {ev.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
