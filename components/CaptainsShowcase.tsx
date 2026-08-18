'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Team } from '@/lib/phcl-data';

const DEFAULT_CAPTAIN_IMAGES = [
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QtEgIYy6isuo8YkT1Gz795LJicbP2ZkAg5hT59g9Vg&sw=400&h=500&fit=crop&crop=face',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiN7mvAEr11eIfEZ1Wtei5W2O9zd9JPp0xiyTltrFs-w&sw=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&crop=face',
];

const DEFAULT_CAPTAIN_NAMES = [
  'Sarthak Mohite', 'Captain 2', 'Captain 3', 'Captain 4', 'Captain 5',
  'Captain 6', 'Captain 7', 'Captain 8', 'Captain 9', 'Captain 10',
];

const DEFAULT_TEAM_NAMES = [
  'Team Unknown', 'Team Bravo', 'Team Charlie', 'Team Delta', 'Team Echo',
  'Team Foxtrot', 'Team Golf', 'Team Hotel', 'Team India', 'Team Juliet',
];

const BANNER_GRADIENTS = [
  'from-amber-500 via-orange-600 to-[#E87A2D]',
  'from-blue-600 via-indigo-600 to-blue-800',
  'from-emerald-600 via-teal-600 to-green-800',
  'from-red-600 via-rose-600 to-red-900',
  'from-purple-600 via-fuchsia-700 to-indigo-900',
  'from-teal-500 via-cyan-600 to-teal-800',
  'from-rose-500 via-pink-600 to-rose-900',
  'from-amber-700 via-orange-800 to-amber-950',
  'from-lime-600 via-emerald-600 to-lime-900',
  'from-cyan-600 via-blue-700 to-indigo-950',
];

const GLOW_COLORS = [
  'rgba(245, 158, 11, 0.45)',
  'rgba(59, 130, 246, 0.45)',
  'rgba(16, 185, 129, 0.45)',
  'rgba(239, 68, 68, 0.45)',
  'rgba(168, 85, 247, 0.45)',
  'rgba(20, 184, 166, 0.45)',
  'rgba(244, 63, 94, 0.45)',
  'rgba(217, 119, 6, 0.45)',
  'rgba(132, 204, 22, 0.45)',
  'rgba(6, 182, 212, 0.45)',
];

interface CaptainsShowcaseProps {
  teams: Team[];
  onOpenTeamModal: (teamId: string) => void;
}

export const CaptainsShowcase: React.FC<CaptainsShowcaseProps> = ({
  teams,
  onOpenTeamModal
}) => {
  const [startIndex, setStartIndex] = useState(0);

  // Build array of 10 captains
  const captains = Array.from({ length: 10 }, (_, i) => {
    if (i < teams.length) {
      const team = teams[i];
      return {
        id: team.id,
        name: team.captain,
        teamName: team.name,
        image: team.captainImage,
        isReal: true,
        originalIndex: i,
      };
    }
    return {
      id: `placeholder-${i}`,
      name: DEFAULT_CAPTAIN_NAMES[i],
      teamName: DEFAULT_TEAM_NAMES[i],
      image: DEFAULT_CAPTAIN_IMAGES[i],
      isReal: false,
      originalIndex: i,
    };
  });

  const totalCaptains = captains.length;
  const totalGroups = Math.ceil(totalCaptains / 3);
  const activeGroup = Math.floor(startIndex / 3);

  const goToPreviousGroup = () => {
    setStartIndex(((activeGroup - 1 + totalGroups) % totalGroups) * 3);
  };

  const goToNextGroup = () => {
    setStartIndex(((activeGroup + 1) % totalGroups) * 3);
  };

  // Get current 3 captains to display (wraps around)
  const visibleCaptains = Array.from({ length: 3 }, (_, i) => {
    const idx = (startIndex + i) % totalCaptains;
    return captains[idx];
  });

  return (
    <div className="w-full relative py-6">
      {/* Header */}
      <div className="text-center mb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.span
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-400 text-lg inline-block"
          >
            🌾
          </motion.span>
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-[0.25em] text-white">
            10 Team Captains • Season 5
          </h3>
          <motion.span
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-400 text-lg inline-block"
          >
            🌾
          </motion.span>
        </motion.div>
        <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">
          Leading. Competing. Winning Together.
        </p>
      </div>

      {/* 3-Card Animated Slider */}
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={goToPreviousGroup}
          aria-label="Previous captains"
          className="absolute left-1 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-[#111a2e]/90 p-2 text-white shadow-lg transition-colors hover:bg-[#E87A2D]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goToNextGroup}
          aria-label="Next captains"
          className="absolute right-1 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-[#111a2e]/90 p-2 text-white shadow-lg transition-colors hover:bg-[#E87A2D]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleCaptains.map((captain, i) => (
              <motion.div
                key={`${startIndex}-${captain.id}`}
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                }}
              >
                <CaptainCard
                  captain={captain}
                  index={captain.originalIndex}
                  bannerGradient={BANNER_GRADIENTS[captain.originalIndex]}
                  glowColor={GLOW_COLORS[captain.originalIndex]}
                  onOpenTeamModal={onOpenTeamModal}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: totalGroups }, (_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i * 3)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === activeGroup
                ? 'w-8 h-2.5 bg-[#E87A2D]'
                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to group ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Captain Card ──────────────────────────────── */

interface CaptainCardProps {
  captain: {
    id: string;
    name: string;
    teamName: string;
    image: string;
    isReal: boolean;
  };
  index: number;
  bannerGradient: string;
  glowColor: string;
  onOpenTeamModal: (teamId: string) => void;
}

const CaptainCard: React.FC<CaptainCardProps> = ({ captain, index, bannerGradient, glowColor, onOpenTeamModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.04 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0d1322] border transition-all duration-300 flex flex-col justify-between ${
        captain.isReal
          ? 'border-slate-700/80'
          : 'border-slate-800/50 opacity-70'
      } ${captain.isReal ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        boxShadow: isHovered ? `0 12px 30px -5px ${glowColor}, 0 0 20px ${glowColor}` : '0 4px 15px rgba(0,0,0,0.3)',
        borderColor: isHovered ? glowColor : undefined
      }}
      onClick={() => captain.isReal ? onOpenTeamModal(captain.id) : undefined}
    >
      {/* Sheen Sweep on Hover */}
      <motion.div
        animate={{
          x: isHovered ? ['-100%', '200%'] : '-100%'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 z-20 pointer-events-none"
      />



      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-950">
        <img
          src={captain.image}
          alt={captain.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Team Banner */}
      <div className={`w-full py-2 px-3 bg-gradient-to-r ${bannerGradient} flex items-center justify-center shadow-md relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="text-[10px] sm:text-sm font-black text-white truncate tracking-wide uppercase drop-shadow-sm relative z-10">
          {captain.teamName}
        </span>
      </div>

      {/* Name & Role */}
      <div className="py-3 px-3 text-center bg-[#0a0f1b] transition-colors duration-300">
        <div className={`text-xs sm:text-sm font-black truncate leading-tight transition-all duration-300 ${
          isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'text-slate-100'
        }`}>
          {captain.name}
        </div>
        <div className="text-[9px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-1 group-hover:text-amber-400 transition-colors duration-300">
          Captain
        </div>
      </div>
    </motion.div>
  );
};
