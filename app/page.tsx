'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { LeaderboardTable } from '@/components/LeaderboardTable';
import { TeamsGrid } from '@/components/TeamsGrid';
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

const PRELOADER_INTERVAL_MS = 5 * 60 * 1000;

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPreloader, setShowPreloader] = useState(false);
  
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [eventResults, setEventResults] = useState<EventResult[]>(INITIAL_EVENT_RESULTS);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const forcePreloader = params.get('preloader') === '1' || params.get('preloader') === 'true';
    const lastPreloaderTime = Number(window.localStorage.getItem('phcl-preloader-seen'));
    const shouldShowPreloader =
      !Number.isFinite(lastPreloaderTime) || Date.now() - lastPreloaderTime >= PRELOADER_INTERVAL_MS;

    if (forcePreloader) {
      window.localStorage.removeItem('phcl-preloader-seen');
      setShowPreloader(true);
      return;
    }

    if (shouldShowPreloader) {
      setShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('phcl-preloader-seen', String(Date.now()));
    }
    setShowPreloader(false);
  };

  // Fetch dynamic data from MongoDB API
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
    loadDataFromApi();
  }, [loadDataFromApi]);

  // Dynamically compute leaderboard based on current teams & event results from DB/State
  const leaderboard = useMemo(() => {
    return computeLeaderboard(teams, eventResults);
  }, [teams, eventResults]);

  const handleOpenTeamModal = () => {
    return;
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

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute bottom-5 right-5 flex items-center justify-center rounded-4xl border border-white/10 bg-[#020817]/90 p-2 shadow-[0_0_40px_rgba(255,255,255,0.12)] md:bottom-8 md:right-8 md:p-3">
              <img
                src="/euforia-logo.png"
                alt="Euforia Logo"
                className="h-20 w-20 object-contain drop-shadow-[0_0_16px_rgba(255,255,255,0.4)] md:h-28 md:w-28"
              />
            </div>
          </div>
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

      </div>
    </>
  );
}
