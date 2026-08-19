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
  
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [eventResults, setEventResults] = useState<EventResult[]>(INITIAL_EVENT_RESULTS);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

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
