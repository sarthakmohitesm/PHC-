'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Team, getTeamVisualTheme } from '@/lib/phcl-data';

interface CaptainsShowcaseProps {
  teams: Team[];
  onOpenTeamModal: (teamId: string) => void;
}

export const CaptainsShowcase: React.FC<CaptainsShowcaseProps> = ({
  teams,
  onOpenTeamModal
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const captains = teams
    .filter(team => team && team.id && team.captain)
    .map((team, index) => {
      const visualTheme = getTeamVisualTheme(team);
      return {
        id: team.id,
        name: team.captain,
        teamName: team.name,
        image: team.captainImage,
        themeColor: team.themeColor,
        badgeSymbol: team.badgeSymbol,
        bannerGradient: visualTheme.bannerGradient,
        glowColor: visualTheme.glowColor,
        isReal: true,
        originalIndex: index,
      };
    });

  const totalCaptains = captains.length;
  if (totalCaptains === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
          No captains added yet
        </p>
      </div>
    );
  }

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
            {totalCaptains} Team Captain{totalCaptains === 1 ? '' : 's'} • Season 5
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
        {totalGroups > 1 && (
          <>
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
          </>
        )}

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
                  bannerGradient={captain.bannerGradient}
                  glowColor={captain.glowColor}
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
