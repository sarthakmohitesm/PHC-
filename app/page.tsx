'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { LeaderboardPodium } from '@/components/LeaderboardPodium';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { TeamsGrid } from '@/components/TeamsGrid';
import { TeamRosterModal } from '@/components/TeamRosterModal';
import { EventsGrid } from '@/components/EventsGrid';
import { AdminPanel } from '@/components/AdminPanel';
import { Footer } from '@/components/Footer';

import {
  INITIAL_TEAMS,
  INITIAL_EVENT_RESULTS,
  Team,
  EventResult,
  computeLeaderboard
} from '@/lib/phcl-data';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [eventResults, setEventResults] = useState<EventResult[]>(INITIAL_EVENT_RESULTS);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  // Fetch dynamic data from MongoDB API
  const loadDataFromApi = useCallback(async () => {
    const startTime = Date.now();
    setIsLoading(true);

    try {
      // Teams
      const resTeams = await fetch('/api/teams');
      const dataTeams = await resTeams.json();
      if (dataTeams.success && dataTeams.teams && dataTeams.teams.length > 0) {
        setTeams(dataTeams.teams);
      }

      // Results
      const resResults = await fetch('/api/results');
      const dataResults = await resResults.json();
      if (dataResults.success && dataResults.results && dataResults.results.length > 0) {
        setEventResults(dataResults.results);
      }
    } catch (err) {
      console.warn('API fetch error, using local state:', err);
    } finally {
      const elapsed = Date.now() - startTime;
      const minimumDelay = 900;
      const remainingDelay = Math.max(0, minimumDelay - elapsed);

      if (remainingDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingDelay));
      }

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDataFromApi();
  }, [loadDataFromApi]);

  // Dynamically compute leaderboard based on current teams & event results from DB/State
  const leaderboard = useMemo(() => {
    return computeLeaderboard(teams, eventResults);
  }, [teams, eventResults]);

  const topThree = useMemo(() => {
    return leaderboard.slice(0, 3);
  }, [leaderboard]);

  const selectedTeam = useMemo(() => {
    if (!selectedTeamId) return null;
    return teams.find(t => t.id === selectedTeamId) || null;
  }, [selectedTeamId, teams]);

  const selectedLeaderboardEntry = useMemo(() => {
    if (!selectedTeamId) return undefined;
    return leaderboard.find(l => l.team.id === selectedTeamId);
  }, [selectedTeamId, leaderboard]);

  const handleOpenTeamModal = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  const handleCloseTeamModal = () => {
    setSelectedTeamId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#0f172a_35%,_#020817_100%)] text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(232,122,45,0.18),transparent,rgba(59,130,246,0.18))]" />
          <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <div className="relative h-28 w-28 [transform-style:preserve-3d]">
            <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(232,122,45,0.25)] backdrop-blur-sm" />
            <div className="absolute inset-2 rounded-full border border-[#E87A2D]/60 bg-[#E87A2D]/10 shadow-[inset_0_0_25px_rgba(232,122,45,0.3)]" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#E87A2D] border-r-[#fbbf24] border-b-transparent border-l-transparent animate-spin [animation-duration:1.7s] shadow-[0_0_30px_rgba(251,191,36,0.6)]" />
            <div className="absolute inset-5 rounded-full border border-white/20 bg-[#0f172a]/80 shadow-[0_10px_30px_rgba(15,23,42,0.9)]" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-black text-[#E87A2D] [transform:translateZ(28px)]">
              PHCL
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.55em] text-[#fbbf24]">
              Welcome to
            </p>
            <h1 className="text-4xl font-black tracking-[0.08em] text-white sm:text-5xl md:text-6xl [text-shadow:0_10px_25px_rgba(15,23,42,0.9)]">
              PHCL
            </h1>
            <p className="text-lg font-semibold tracking-[0.22em] text-slate-200 uppercase sm:text-xl">
              Pillai HOC College League
            </p>
          </div>

          <div className="w-72 max-w-full">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10 shadow-inner">
              <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,#fbbf24,#E87A2D,#fb7185)] animate-[pulse_1.6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0f172a] text-slate-100">
      
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Render Hero Banner ONLY on initial 'home' view */}
        {activeTab === 'home' && (
          <HeroBanner
            teams={teams}
            topLeaderboard={leaderboard}
            setActiveTab={setActiveTab}
            onOpenTeamModal={handleOpenTeamModal}
          />
        )}

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
          
          {/* Admin Panel View */}
          {activeTab === 'admin' && (
            <AdminPanel
              teams={teams}
              onRefreshData={loadDataFromApi}
            />
          )}

          {/* 3D Top 3 Podium (Visible on Home or Leaderboard view) */}
          {(activeTab === 'home' || activeTab === 'leaderboard') && (
            <LeaderboardPodium
              topThree={topThree}
              onOpenTeamModal={handleOpenTeamModal}
            />
          )}

          {/* Leaderboard Table View */}
          {(activeTab === 'home' || activeTab === 'leaderboard') && (
            <LeaderboardTable
              leaderboard={leaderboard}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenTeamModal={handleOpenTeamModal}
            />
          )}

          {/* Teams & Captains View */}
          {activeTab === 'teams' && (
            <TeamsGrid
              teams={teams}
              leaderboard={leaderboard}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenTeamModal={handleOpenTeamModal}
            />
          )}

          {/* 9 Events Showcase */}
          {activeTab === 'events' && (
            <EventsGrid
              eventResults={eventResults}
              teams={teams}
            />
          )}

        </div>

      </main>

      {/* Roster Modal */}
      <TeamRosterModal
        team={selectedTeam}
        leaderboardEntry={selectedLeaderboardEntry}
        onClose={handleCloseTeamModal}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
