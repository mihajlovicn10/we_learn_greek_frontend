import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRotatingText } from '../../hooks/useRotatingText';

const HEIGHTS = {
  sm: 'h-72 sm:h-80',
  md: 'h-96 sm:h-[440px]',
  lg: 'h-80 sm:h-[547px]',
};

function PageHero({ video, headlines = [], height = 'lg', interval = 3000, className = '' }) {
  const index = useRotatingText(headlines, interval);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 639px)');

    const update = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    update();
    motionQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
  }, []);

  const showVideo = video && !reducedMotion && !isMobile;

  return (
    <div className={`relative w-full overflow-hidden ${HEIGHTS[height] ?? HEIGHTS.lg} ${className}`}>
      {showVideo ? (
        <video
          src={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-brand" />
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-hero-overlay px-4">
        {headlines.length > 0 && (
          <motion.h1
            key={index}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
            className="z-10 max-w-4xl text-center font-display text-3xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            {headlines[index]}
          </motion.h1>
        )}
      </div>
    </div>
  );
}

export default PageHero;
