'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Team } from '@/lib/phcl-data';

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
  'Sarthak Mohite', 'Captain 2', 'Captain 3', 'Captain 4', 'Captain 5',
  'Captain 6', 'Captain 7', 'Captain 8', 'Captain 9', 'Captain 10',
];

const DEFAULT_TEAM_NAMES = [
  'Team Unknown', 'Team Bravo', 'Team Charlie', 'Team Delta', 'Team Echo',
  'Team Foxtrot', 'Team Golf', 'Team Hotel', 'Team India', 'Team Juliet',
];

const BANNER_GRADIENTS = [
  'from-amber-500 via-orange-600 to-[#E87A2D]',   // #1 Gold/Orange
  'from-blue-600 via-indigo-600 to-blue-800',     // #2 Blue
  'from-emerald-600 via-teal-600 to-green-800',   // #3 Green
  'from-red-600 via-rose-600 to-red-900',         // #4 Crimson
  'from-purple-600 via-fuchsia-700 to-indigo-900',// #5 Purple
  'from-teal-500 via-cyan-600 to-teal-800',       // #6 Cyan
  'from-rose-500 via-pink-600 to-rose-900',       // #7 Pink
  'from-amber-700 via-orange-800 to-amber-950',   // #8 Bronze
  'from-lime-600 via-emerald-600 to-lime-900',    // #9 Lime/Green
  'from-cyan-600 via-blue-700 to-indigo-950',     // #10 Ocean
];

const GLOW_COLORS = [
  'rgba(245, 158, 11, 0.45)',  // Amber/Gold
  'rgba(59, 130, 246, 0.45)',   // Blue
  'rgba(16, 185, 129, 0.45)',  // Green
  'rgba(239, 68, 68, 0.45)',   // Red
  'rgba(168, 85, 247, 0.45)',  // Purple
  'rgba(20, 184, 166, 0.45)',  // Teal
  'rgba(244, 63, 94, 0.45)',   // Pink
  'rgba(217, 119, 6, 0.45)',   // Bronze
  'rgba(132, 204, 22, 0.45)',  // Lime
  'rgba(6, 182, 212, 0.45)',   // Cyan
];

interface CaptainsShowcaseProps {
  teams: Team[];
  onOpenTeamModal: (teamId: string) => void;
}

export const CaptainsShowcase: React.FC<CaptainsShowcaseProps> = ({
  teams,
  onOpenTeamModal
}) => {
  // Build array of 10 captains: use real teams if available, fill rest with placeholders
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

  // Layout: 4 Top, 2 Center, 4 Bottom
  const topRow = captains.slice(0, 4);      // #1, #2, #3, #4
  const centerRow = captains.slice(4, 6);   // #5, #6
  const bottomRow = captains.slice(6, 10);  // #7, #8, #9, #10

  return (
    <div className="w-full relative py-2">
      {/* Background Animated Ambient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E87A2D]/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Header section with subtle animated wheat icons */}
      <div className="text-center mb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-400 text-sm inline-block"
          >
            🌾
          </motion.span>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white">
            10 Team Captains • Season 5
          </h3>
          <motion.span
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-amber-400 text-sm inline-block"
          >
            🌾
          </motion.span>
        </motion.div>
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
          Leading. Competing. Winning Together.
        </p>
      </div>

      {/* 3-Tier Layout: 4 Top, 2 Center, 4 Bottom */}
      <div className="space-y-3.5">
        {/* Top Row: 4 Captains */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {topRow.map((captain) => (
            <CaptainCard
              key={captain.id}
              captain={captain}
              index={captain.originalIndex}
              bannerGradient={BANNER_GRADIENTS[captain.originalIndex]}
              glowColor={GLOW_COLORS[captain.originalIndex]}
              onOpenTeamModal={onOpenTeamModal}
            />
          ))}
        </div>

        {/* Center Row: 2 Captains (Centered) */}
        <div className="flex justify-center gap-2.5 sm:gap-3.5">
          {centerRow.map((captain) => (
            <div key={captain.id} className="w-[calc(25%-0.5rem)]">
              <CaptainCard
                captain={captain}
                index={captain.originalIndex}
                bannerGradient={BANNER_GRADIENTS[captain.originalIndex]}
                glowColor={GLOW_COLORS[captain.originalIndex]}
                onOpenTeamModal={onOpenTeamModal}
              />
            </div>
          ))}
        </div>

        {/* Bottom Row: 4 Captains */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {bottomRow.map((captain) => (
            <CaptainCard
              key={captain.id}
              captain={captain}
              index={captain.originalIndex}
              bannerGradient={BANNER_GRADIENTS[captain.originalIndex]}
              glowColor={GLOW_COLORS[captain.originalIndex]}
              onOpenTeamModal={onOpenTeamModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
      initial={{ opacity: 0, y: 25, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 18
      }}
      whileHover={{ y: -7, scale: 1.04 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#0d1322] border transition-all duration-300 flex flex-col justify-between ${
        captain.isReal
          ? 'border-slate-700/80'
          : 'border-slate-800/50 opacity-70'
      } ${captain.isReal ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        boxShadow: isHovered ? `0 10px 25px -5px ${glowColor}, 0 0 15px ${glowColor}` : '0 4px 12px rgba(0,0,0,0.3)',
        borderColor: isHovered ? glowColor : undefined
      }}
      onClick={() => captain.isReal ? onOpenTeamModal(captain.id) : undefined}
    >
      {/* Dynamic Sheen Sweep Reflection on Hover */}
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

      {/* Top Image Container with Smooth Zoom */}
      <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-slate-950">
        <img
          src={captain.image}
          alt={captain.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Dark Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Middle Team Banner Ribbon with Shimmer Line */}
      <div className={`w-full py-1.5 px-1 bg-gradient-to-r ${bannerGradient} flex items-center justify-center shadow-md relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="text-[9px] sm:text-[11px] font-black text-white truncate tracking-wide uppercase drop-shadow-sm relative z-10">
          {captain.teamName}
        </span>
      </div>

      {/* Bottom Name & Role Section */}
      <div className="py-2.5 px-1.5 text-center bg-[#0a0f1b] transition-colors duration-300">
        <div className={`text-[10px] sm:text-xs font-black truncate leading-tight transition-all duration-300 ${
          isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'text-slate-100'
        }`}>
          {captain.name}
        </div>
        <div className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 group-hover:text-amber-400 transition-colors duration-300">
          Captain
        </div>
      </div>
    </motion.div>
  );
};
