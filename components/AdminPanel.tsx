'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Trophy, Lock, LogOut, RefreshCw, Save, Award, UserPlus, Plus, Trash2, Users, X, UserCheck } from 'lucide-react';
import { Team, PHCL_EVENTS } from '@/lib/phcl-data';

interface AdminPanelProps {
  teams: Team[];
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  teams,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('phcl_admin_auth') === 'true';
    }
    return false;
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'matrix' | 'captains'>('captains');

  // Matrix Points State: teamId -> { eventId -> number }
  const [matrixScores, setMatrixScores] = useState<Record<string, Record<string, number>>>({});
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Captain Box Add Member Inline State
  const [activeAddingTeamId, setActiveAddingTeamId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState<'Captain' | 'Vice Captain' | 'Core Athlete' | 'Squad Member'>('Core Athlete');
  const [memberDept, setMemberDept] = useState('Computer Engg');
  const [memberYear, setMemberYear] = useState('TE');
  const [memberEvent, setMemberEvent] = useState('Box Cricket');

  // Add Captain Modal / Form State
  const [showAddCaptainModal, setShowAddCaptainModal] = useState<boolean>(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newCaptainName, setNewCaptainName] = useState('');
  const [newCaptainBio, setNewCaptainBio] = useState('');
  const [newMotto, setNewMotto] = useState('');
  const [newBadge, setNewBadge] = useState('⚡');
  const [newCaptainImage, setNewCaptainImage] = useState('');
  const [captainMessage, setCaptainMessage] = useState('');

  // Sync state from props teams when mounted or refreshed
  useEffect(() => {
    const initialMatrix: Record<string, Record<string, number>> = {};
    teams.forEach(t => {
      initialMatrix[t.id] = { ...(t.eventScores || {}) };
    });
    setMatrixScores(initialMatrix);
  }, [teams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('phcl_admin_auth', 'true');
      } else {
        setLoginError(data.message || 'Authentication failed');
      }
    } catch {
      setLoginError('Server error connecting to authentication endpoint.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('phcl_admin_auth');
  };

  const handleScoreChange = (teamId: string, eventId: string, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
    setMatrixScores(prev => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || {}),
        [eventId]: num
      }
    }));
  };

  const handleSaveAllScores = async () => {
    setIsSaving(true);
    setSaveStatus('Saving points matrix...');

    try {
      for (const team of teams) {
        const teamScores = matrixScores[team.id] || {};
        await fetch(`/api/teams/${team.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'updateScores',
            eventScores: teamScores
          })
        });
      }

      setSaveStatus('✅ All team points updated & saved successfully!');
      onRefreshData();
    } catch {
      setSaveStatus('Error saving points matrix.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateCaptain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teams.length >= 10) {
      setCaptainMessage('Maximum limit of 10 Captains reached!');
      return;
    }
    if (!newTeamName || !newCaptainName) return;

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTeamName,
          captain: newCaptainName,
          captainBio: newCaptainBio || 'Official PHCL Team Captain',
          motto: newMotto || 'Strive for Glory!',
          badgeSymbol: newBadge || '⭐',
          captainImage: newCaptainImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCaptainMessage(`Captain "${newCaptainName}" added successfully!`);
        setNewTeamName('');
        setNewCaptainName('');
        setNewCaptainBio('');
        setNewMotto('');
        setNewCaptainImage('');
        setShowAddCaptainModal(false);
        onRefreshData();
      }
    } catch {
      setCaptainMessage('Failed to create captain.');
    }
  };

  const handleAddMemberToTeam = async (teamId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName) return;

    try {
      const newMember = {
        id: `${teamId}-mem-${Date.now()}`,
        name: memberName,
        role: memberRole,
        specialtyEvent: memberEvent,
        department: memberDept,
        year: memberYear
      };

      const res = await fetch(`/api/teams/${teamId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addMember',
          member: newMember
        })
      });
      const data = await res.json();
      if (data.success) {
        setMemberName('');
        setActiveAddingTeamId(null);
        onRefreshData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMember = async (teamId: string, memberId: string) => {
    try {
      const res = await fetch(`/api/teams/${teamId}?memberId=${memberId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCaptain = async (teamId: string, captainName: string) => {
    if (!confirm(`Are you sure you want to delete Captain "${captainName}" and their team?`)) return;
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 glass-card rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#E87A2D]/20 text-[#E87A2D] rounded-full flex items-center justify-center mx-auto border border-[#E87A2D]">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white">PHCL Admin Portal</h2>
          <p className="text-xs text-slate-400">Log in to add new Captains, team squad members, and assign game points.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Admin Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E87A2D]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E87A2D]"
              required
            />
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs text-red-300">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-black text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Authenticate Admin</span>
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-400">Default: Username: <code className="text-amber-400 font-bold">admin</code> | Password: <code className="text-amber-400 font-bold">admin123</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 my-8 px-2 sm:px-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#E87A2D]/20 text-[#E87A2D] border border-[#E87A2D]/40">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">PHCL Admin Dashboard</h2>
            </div>
            <p className="text-xs text-slate-400">Add up to 10 Captains with Team Names, squad members, and assign points.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshData}
            className="px-3.5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sync Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-slate-700 gap-2">
        <button
          onClick={() => setActiveTab('captains')}
          className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs rounded-t-lg transition-colors border-b-2 ${
            activeTab === 'captains'
              ? 'border-[#E87A2D] bg-slate-800 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-[#E87A2D]" />
          <span>1. Manage Captains & Squad Rosters ({teams.length} / 10)</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs rounded-t-lg transition-colors border-b-2 ${
            activeTab === 'matrix'
              ? 'border-[#E87A2D] bg-slate-800 text-white'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>2. Games Points Matrix Table ({teams.length} Teams x 9 Games)</span>
        </button>
      </div>

      {/* TAB 1: CAPTAINS & SQUAD ROSTERS BOXES */}
      {activeTab === 'captains' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-4 rounded-xl">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#E87A2D]" />
                Official Captains Boxes ({teams.length} / 10)
              </h3>
              <p className="text-xs text-slate-400">Click &quot;Add New Captain&quot; to create a captain box with team name, image, and squad members.</p>
            </div>

            {teams.length < 10 && (
              <button
                onClick={() => setShowAddCaptainModal(true)}
                className="px-5 py-2.5 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-black text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Captain ({teams.length}/10)</span>
              </button>
            )}
          </div>

          {/* 10 CAPTAIN BOXES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Show Add Captain Card if less than 10 captains */}
            {teams.length < 10 && (
              <div
                onClick={() => setShowAddCaptainModal(true)}
                className="bg-slate-800/40 border-2 border-dashed border-slate-600 hover:border-[#E87A2D] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[280px] group"
              >
                <div className="w-14 h-14 rounded-full bg-[#E87A2D]/10 text-[#E87A2D] group-hover:scale-110 flex items-center justify-center mb-3 transition-transform border border-[#E87A2D]/30">
                  <UserPlus className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-white group-hover:text-[#E87A2D] transition-colors">
                  + Add Captain #{teams.length + 1}
                </h4>
                <p className="text-xs text-slate-400 mt-1">Enter Captain Name, Team Name & Photo</p>
                <span className="mt-4 px-3 py-1 bg-slate-800 text-amber-400 font-bold text-xs rounded-md border border-slate-600">
                  {10 - teams.length} Captain Slots Remaining
                </span>
              </div>
            )}

            {/* List of Captain Cards */}
            {teams.map((team, index) => (
              <div
                key={team.id}
                className="glass-card-hover rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
              >
                {/* Captain Header Box */}
                <div>
                  <div className="relative h-32 bg-slate-900 border-b border-slate-700 p-4 flex items-end justify-between overflow-hidden">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="text-xs px-2.5 py-1 rounded-md font-black bg-slate-950/80 text-amber-400 border border-amber-500/30">
                        Captain #{index + 1}
                      </span>
                    </div>

                    {/* Delete Captain Button */}
                    <button
                      onClick={() => handleDeleteCaptain(team.id, team.captain)}
                      className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/50 transition-colors"
                      title="Delete Captain"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Captain Info & Image */}
                    <div className="flex items-center gap-3.5 z-10 w-full pt-6">
                      <img
                        src={team.captainImage}
                        alt={team.captain}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-[#E87A2D] shadow-lg shrink-0"
                      />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{team.badgeSymbol}</span>
                          <h4 className="font-black text-white text-base truncate">{team.name}</h4>
                        </div>
                        <p className="text-xs font-bold text-amber-300 truncate">Capt: {team.captain}</p>
                        <p className="text-[10px] text-slate-400 italic truncate">&quot;{team.motto}&quot;</p>
                      </div>
                    </div>
                  </div>

                  {/* Roster & Squad Members List inside Box */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                        Squad Members ({team.members ? team.members.length : 0})
                      </span>

                      <button
                        onClick={() => setActiveAddingTeamId(activeAddingTeamId === team.id ? null : team.id)}
                        className="px-2.5 py-1 rounded bg-[#1C6E7D] hover:bg-[#155460] text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Add Member</span>
                      </button>
                    </div>

                    {/* Inline Add Member Form */}
                    {activeAddingTeamId === team.id && (
                      <form onSubmit={(e) => handleAddMemberToTeam(team.id, e)} className="p-3 bg-slate-900 border border-slate-600 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                          <span className="font-bold text-amber-400">Add Athlete to {team.name}</span>
                          <button
                            type="button"
                            onClick={() => setActiveAddingTeamId(null)}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Full Athlete Name"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-600 rounded px-2.5 py-1.5 text-xs text-white"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={memberRole}
                            onChange={(e: any) => setMemberRole(e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[11px] text-white"
                          >
                            <option value="Vice Captain">Vice Captain</option>
                            <option value="Core Athlete">Core Athlete</option>
                            <option value="Squad Member">Squad Member</option>
                          </select>

                          <select
                            value={memberYear}
                            onChange={(e) => setMemberYear(e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[11px] text-white"
                          >
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Dept (e.g. Comp)"
                            value={memberDept}
                            onChange={(e) => setMemberDept(e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[11px] text-white"
                          />
                          <input
                            type="text"
                            placeholder="Sport (e.g. Cricket)"
                            value={memberEvent}
                            onChange={(e) => setMemberEvent(e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[11px] text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-1.5 rounded bg-[#E87A2D] hover:bg-[#d06a20] text-white font-bold text-xs transition-colors"
                        >
                          Confirm Add Member
                        </button>
                      </form>
                    )}

                    {/* Member List inside Box */}
                    {team.members && team.members.length > 0 ? (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {team.members.map(m => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between p-2 rounded bg-slate-900/90 border border-slate-700/60 text-xs text-slate-200"
                          >
                            <div className="truncate pr-2">
                              <span className="font-extrabold text-white">{m.name}</span>{' '}
                              <span className="text-[10px] text-amber-400">({m.role})</span>
                              <div className="text-[10px] text-slate-400">{m.department} {m.year} • {m.specialtyEvent}</div>
                            </div>

                            <button
                              onClick={() => handleDeleteMember(team.id, m.id)}
                              className="text-red-400 hover:text-red-300 p-1 shrink-0"
                              title="Remove Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-500 italic py-2 text-center">No squad members assigned yet.</p>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border-t border-slate-700 text-center">
                  <span className="text-[11px] font-bold text-slate-400">
                    Total Squad Members: <strong className="text-amber-400">{team.members ? team.members.length : 0}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ADD CAPTAIN MODAL */}
          {showAddCaptainModal && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#E87A2D]" />
                    Add Captain ({teams.length + 1} / 10)
                  </h3>
                  <button onClick={() => setShowAddCaptainModal(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateCaptain} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Captain Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Siddharth Patil"
                      value={newCaptainName}
                      onChange={(e) => setNewCaptainName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Team Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Red Strikers / Team Alpha"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Badge Symbol</label>
                      <input
                        type="text"
                        placeholder="e.g. ⚡"
                        value={newBadge}
                        onChange={(e) => setNewBadge(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Team Motto</label>
                      <input
                        type="text"
                        placeholder="e.g. Strive for Victory!"
                        value={newMotto}
                        onChange={(e) => setNewMotto(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Captain Photo (File Upload or URL)</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewCaptainImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#E87A2D] file:text-white hover:file:bg-[#d06a20] file:cursor-pointer cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Or paste image URL (https://...)"
                        value={newCaptainImage}
                        onChange={(e) => setNewCaptainImage(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white"
                      />
                      {newCaptainImage && (
                        <div className="flex items-center gap-2 pt-1">
                          <img src={newCaptainImage} alt="Preview" className="w-10 h-10 rounded-lg object-cover border border-[#E87A2D]" />
                          <span className="text-[10px] text-green-400 font-bold">Image Ready</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Captain Bio</label>
                    <textarea
                      placeholder="Brief achievements..."
                      value={newCaptainBio}
                      onChange={(e) => setNewCaptainBio(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-xs text-white h-16"
                    />
                  </div>

                  {captainMessage && (
                    <div className="p-2 bg-red-950/60 border border-red-500/50 rounded text-xs text-red-300">
                      {captainMessage}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCaptainModal(false)}
                      className="w-1/2 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-bold text-xs"
                    >
                      Create Captain Box
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: MATRIX TABLE VIEW */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-600">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E87A2D]" />
                Points Assignment Matrix Table
              </h3>
              <p className="text-xs text-slate-400">Type points in any cell below. Click &quot;Save Points Matrix to DB&quot; to update the live user leaderboard instantly.</p>
            </div>

            <button
              onClick={handleSaveAllScores}
              disabled={isSaving || teams.length === 0}
              className="px-6 py-3 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-black text-xs transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Points Matrix to DB'}</span>
            </button>
          </div>

          {saveStatus && (
            <div className="p-3 bg-green-950/70 border border-green-500/60 rounded-xl text-xs font-bold text-green-300">
              {saveStatus}
            </div>
          )}

          {/* Matrix Table */}
          {teams.length === 0 ? (
            <div className="p-12 text-center bg-slate-800 rounded-2xl border border-slate-600 space-y-3">
              <Users className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className="text-base font-extrabold text-white">No Captains Added Yet</h4>
              <p className="text-xs text-slate-400">Please switch to Tab 1 (&quot;Manage Captains & Squad Rosters&quot;) to add your first captain!</p>
              <button
                onClick={() => setActiveTab('captains')}
                className="px-5 py-2 rounded-lg bg-[#E87A2D] text-white font-bold text-xs"
              >
                Go to Add Captains
              </button>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-2xl border border-slate-600 overflow-hidden shadow-xl w-full">
              <div className="w-full">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-700 text-[10px] text-slate-300 uppercase font-black tracking-wider">
                      <th className="py-3 px-2 sm:px-3 w-[18%] sticky left-0 bg-slate-900 z-10 border-r border-slate-700">
                        Team & Captain
                      </th>
                      {PHCL_EVENTS.map(ev => {
                        const shortName = ev.name.includes('Box Cricket') ? 'Cricket' :
                          ev.name.includes('Athletics') ? 'Athletics' :
                          ev.name.includes('GK Quiz') ? 'GK Quiz' : ev.name;

                        return (
                          <th key={ev.id} className="py-2.5 px-0.5 sm:px-1 text-center w-[8%] border-r border-slate-800">
                            <div className="text-base sm:text-lg">{ev.icon}</div>
                            <div className="font-extrabold text-white text-[9px] sm:text-[10px] truncate px-0.5" title={ev.name}>{shortName}</div>
                            <div className="text-[8px] sm:text-[9px] text-[#E87A2D] font-bold">Max {ev.pointsScale.first}P</div>
                          </th>
                        );
                      })}
                      <th className="py-3 px-1 sm:px-2 text-center w-[10%] bg-slate-950 text-amber-400 font-black">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 text-xs">
                    {teams.map(team => {
                      const teamScores = matrixScores[team.id] || {};
                      const totalScore = PHCL_EVENTS.reduce((sum, ev) => {
                        return sum + (Number(teamScores[ev.id]) || 0);
                      }, 0);

                      return (
                        <tr key={team.id} className="hover:bg-slate-700/40 transition-colors">
                          
                          {/* Team Name Column */}
                          <td className="py-2.5 px-2 sm:px-3 font-extrabold text-white sticky left-0 bg-slate-800 z-10 border-r border-slate-700">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="text-base sm:text-lg shrink-0">{team.badgeSymbol}</span>
                              <div className="min-w-0 truncate">
                                <div className="font-extrabold text-xs sm:text-sm truncate">{team.name}</div>
                                <span className="text-[10px] text-slate-400 font-normal truncate block">{team.captain}</span>
                              </div>
                            </div>
                          </td>

                          {/* Event Points Input Cells */}
                          {PHCL_EVENTS.map(ev => {
                            const currentScore = teamScores[ev.id] !== undefined ? teamScores[ev.id] : 0;
                            return (
                              <td key={ev.id} className="py-2 px-0.5 text-center border-r border-slate-700/50">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={currentScore}
                                  onChange={(e) => handleScoreChange(team.id, ev.id, e.target.value)}
                                  className={`w-10 sm:w-12 text-center py-1 rounded font-extrabold text-xs border focus:outline-none transition-colors ${
                                    currentScore > 0
                                      ? 'bg-[#E87A2D]/20 text-amber-300 border-[#E87A2D]'
                                      : 'bg-slate-900 text-slate-400 border-slate-700'
                                  }`}
                                />
                              </td>
                            );
                          })}

                          {/* Total Score Cell */}
                          <td className="py-2.5 px-1 sm:px-2 text-center font-black text-xs sm:text-sm text-amber-400 bg-slate-950/70">
                            {totalScore} <span className="text-[9px] text-slate-400 font-bold hidden sm:inline">pts</span>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {teams.length > 0 && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveAllScores}
                disabled={isSaving}
                className="px-8 py-3 rounded-lg bg-[#E87A2D] hover:bg-[#d06a20] text-white font-black text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                <span>{isSaving ? 'Saving...' : 'Save Points Matrix to DB'}</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
