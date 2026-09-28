import { useState, useEffect } from 'react';

/** Full-width video hero (Home only). Falls back to a gradient on mobile and for reduced motion. */
function PageHero({ video, title, subtitle, children, className = '' }) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setShowVideo(!motionQuery.matches && !mobileQuery.matches);

    update();
    motionQuery.addEventListener('change', update);
    mobileQuery.addEventListener('change', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      mobileQuery.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Gradient first; the video fades in over it once a frame is ready (no pop-in). */}
      <div className="absolute inset-0 bg-gradient-brand" />
      {video && showVideo && (
        <video
          src={video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoReady(true)}
          aria-hidden="true"
        />
      )}
      {/* Strong, even overlay so text stays readable over any video frame. */}
      <div className="absolute inset-0 bg-brand-900/65" />
      <div className="relative z-10 flex min-h-[26rem] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[32rem]">
        <h1 className="max-w-4xl font-display text-4xl font-bold text-white sm:text-6xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </div>
  );
}

export default PageHero;
