'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder images — replace these with your actual uploaded images
const SLIDER_IMAGES = [
  {
    url: '/phcl-logo.png',
    caption: 'PHCL Season 5',
  },
  {
    url: '/euforia-logo.png',
    caption: 'Euforia 2026',
  },
];

interface ImageSliderProps {
  images?: { url: string; caption?: string }[];
  autoPlayInterval?: number;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images = SLIDER_IMAGES,
  autoPlayInterval = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Autoplay every 2 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [goToNext, autoPlayInterval, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/12"
      style={{
        background: 'rgba(30, 41, 59, 0.35)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Glass inner glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
        }}
      />

      {/* Slides */}
      
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-video overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
