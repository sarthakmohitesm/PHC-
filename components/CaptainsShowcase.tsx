'use client';

import React from 'react';
import { Team } from '@/lib/phcl-data';

// 10 default placeholder captain images (diverse professional sports portraits)
const DEFAULT_CAPTAIN_IMAGES = [
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face',
];

const DEFAULT_CAPTAIN_NAMES = [
  'Captain 1', 'Captain 2', 'Captain 3', 'Captain 4', 'Captain 5',
  'Captain 6', 'Captain 7', 'Captain 8', 'Captain 9', 'Captain 10',
];

const DEFAULT_TEAM_NAMES = [
  'Team Alpha', 'Team Bravo', 'Team Charlie', 'Team Delta', 'Team Echo',
  'Team Foxtrot', 'Team Golf', 'Team Hotel', 'Team India', 'Team Juliet',
];

interface CaptainsShowcaseProps {
  teams: Team[];
  onOpenTeamModal: (teamId: string) => void;
}

export const CaptainsShowcase: React.FC<CaptainsShowcaseProps> = ({
  teams,
  onOpenTeamModal
}) => {
  // Build a list of 10 captains: use real teams if available, fill rest with placeholders
  const captains = Array.from({ length: 10 }, (_, i) => {
    if (i < teams.length) {
      const team = teams[i];
      return {
        id: team.id,
        name: team.captain,
        teamName: team.name,
        image: team.captainImage,
        badge: team.badgeSymbol,
        isReal: true,
      };
    }
    return {
      id: `placeholder-${i}`,
      name: DEFAULT_CAPTAIN_NAMES[i],
      teamName: DEFAULT_TEAM_NAMES[i],
      image: DEFAULT_CAPTAIN_IMAGES[i],
      badge: '⚡',
      isReal: false,
    };
  });

  // Split into featured (center captain, index 0) and the side captains
  const featured = captains[0];
  const topRow = captains.slice(1, 5);
  const bottomRow = captains.slice(5, 10);

  return (
    <div className="w-full">
      {/* Section label */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E87A2D]/30" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#E87A2D]">
          10 Captains • Season 5
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E87A2D]/30" />
      </div>

      {/* Main showcase layout */}
      <div className="flex flex-col items-center gap-4">

        {/* Top row — 4 captains flanking the featured captain */}
        <div className="flex items-end justify-center gap-3 w-full">
          {topRow.map((captain, i) => (
            <button
              key={captain.id}
              onClick={() => captain.isReal ? onOpenTeamModal(captain.id) : undefined}
              className={`group relative flex flex-col items-center transition-all duration-300 ${captain.isReal ? 'cursor-pointer' : 'cursor-default opacity-40'}`}
              disabled={!captain.isReal}
            >
              {/* Image container */}
              <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-[#E87A2D]/60 transition-all duration-300 group-hover:scale-105">
                <img
                  src={captain.image}
                  alt={captain.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Jersey number style badge */}
                <div className="absolute top-1 left-1 text-[8px] font-black text-white/70 bg-black/40 backdrop-blur-sm px-1 rounded">
                  #{i + 2}
                </div>
              </div>
              {/* Name label */}
              <div className="mt-1.5 text-center max-w-20">
                <div className="text-[9px] font-extrabold text-white/90 truncate leading-tight">
                  {captain.name.split(' ')[0]}
                </div>
                <div className="text-[8px] text-[#E87A2D]/80 font-semibold truncate">
                  {captain.teamName}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Featured captain (center, larger) */}
        <button
          onClick={() => featured.isReal ? onOpenTeamModal(featured.id) : undefined}
          className={`group relative flex flex-col items-center transition-all duration-300 -mt-2 ${featured.isReal ? 'cursor-pointer' : 'cursor-default opacity-40'}`}
          disabled={!featured.isReal}
        >
          <div className="relative w-24 h-28 sm:w-28 sm:h-34 rounded-2xl overflow-hidden border-2 border-[#E87A2D]/50 group-hover:border-[#E87A2D] transition-all duration-300 group-hover:scale-105" style={{ boxShadow: '0 0 30px rgba(232, 122, 45, 0.15)' }}>
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {/* Crown badge for captain #1 */}
            <div className="absolute top-1.5 left-1.5 text-[10px] font-black text-amber-400 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
              👑 #1
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-[10px] font-black text-white truncate leading-tight">
              {featured.name}
            </div>
            <div className="text-[9px] text-[#E87A2D] font-bold truncate">
              {featured.teamName}
            </div>
          </div>
        </button>

        {/* Bottom row — 5 captains */}
        <div className="flex items-start justify-center gap-3 w-full -mt-2">
          {bottomRow.map((captain, i) => (
            <button
              key={captain.id}
              onClick={() => captain.isReal ? onOpenTeamModal(captain.id) : undefined}
              className={`group relative flex flex-col items-center transition-all duration-300 ${captain.isReal ? 'cursor-pointer' : 'cursor-default opacity-40'}`}
              disabled={!captain.isReal}
            >
              <div className="relative w-14 h-18 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-[#E87A2D]/60 transition-all duration-300 group-hover:scale-105">
                <img
                  src={captain.image}
                  alt={captain.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-1 left-1 text-[8px] font-black text-white/70 bg-black/40 backdrop-blur-sm px-1 rounded">
                  #{i + 6}
                </div>
              </div>
              <div className="mt-1.5 text-center max-w-18">
                <div className="text-[9px] font-extrabold text-white/90 truncate leading-tight">
                  {captain.name.split(' ')[0]}
                </div>
                <div className="text-[8px] text-[#E87A2D]/80 font-semibold truncate">
                  {captain.teamName}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
