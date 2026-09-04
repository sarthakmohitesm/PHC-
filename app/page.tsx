'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { TeamsGrid } from '@/components/TeamsGrid';
import { EventsGrid } from '@/components/EventsGrid';
import { AdminPanel } from '@/components/AdminPanel';
import { Footer } from '@/components/Footer';
import { TeamRosterModal } from '@/components/TeamRosterModal';

import {
  INITIAL_TEAMS,
  INITIAL_EVENT_RESULTS,
  Team,
  EventResult,
  computeLeaderboard
} from '@/lib/phcl-data';

const PRELOADER_INTERVAL_MS = 5 * 60 * 1000;

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPreloader, setShowPreloader] = useState(false);

  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [eventResults, setEventResults] = useState<EventResult[]>(INITIAL_EVENT_RESULTS);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const forcePreloader = params.get('preloader') === '1' || params.get('preloader') === 'true';
    const lastPreloaderTime = Number(window.localStorage.getItem('phcl-preloader-seen'));
    const shouldShowPreloader =
      !Number.isFinite(lastPreloaderTime) || Date.now() - lastPreloaderTime >= PRELOADER_INTERVAL_MS;

    if (forcePreloader) {
      window.localStorage.removeItem('phcl-preloader-seen');
      // Browser-only preloader check cannot be known during SSR, so this must be resolved after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPreloader(true);
      return;
    }

    if (shouldShowPreloader) {
      // Browser-only preloader check cannot be known during SSR, so this must be resolved after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('phcl-preloader-seen', String(Date.now()));
    }
    setShowPreloader(false);
  };

  const loadDataFromApi = useCallback(async () => {
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
    }
  }, []);

  useEffect(() => {
    const runLoad = async () => {
      await loadDataFromApi();
    };

    runLoad();
  }, [loadDataFromApi]);

  // Dynamically compute leaderboard based on current teams & event results from DB/State
  const leaderboard = useMemo(() => {
    return computeLeaderboard(teams, eventResults);
  }, [teams, eventResults]);

  const selectedTeam = selectedTeamId
    ? teams.find(team => team.id === selectedTeamId) || null
    : null;
  const selectedLeaderboardEntry = selectedTeam
    ? leaderboard.find(entry => entry.team.id === selectedTeam.id)
    : undefined;

  const handleOpenTeamModal = (teamId: string) => {
    setSelectedTeamId(teamId);
  };

  return (
    <>
      {showPreloader && (
        <div className="fixed inset-0 z-120 flex items-center justify-center overflow-hidden bg-[#020817]">
          <video
            src="/preloader.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handlePreloaderComplete}
            onError={handlePreloaderComplete}
            className="h-full w-full object-cover"
          />
        </div>
      )}

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

      {/* Footer */}
      <Footer />

      <TeamRosterModal
        team={selectedTeam}
        leaderboardEntry={selectedLeaderboardEntry}
        onClose={() => setSelectedTeamId(null)}
      />

      </div>
    </>
  );
}
