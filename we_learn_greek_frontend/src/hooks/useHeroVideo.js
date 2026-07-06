import { useState, useEffect } from 'react';

const VIDEO_LOADERS = {
  background: () => import('../assets/videos/background_video.mp4'),
  sea: () => import('../assets/videos/sea.mp4'),
};

/** Lazy-load hero videos per route so they are not in the initial bundle. */
export function useHeroVideo(name) {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let active = true;
    const loader = VIDEO_LOADERS[name];
    if (!loader) return undefined;

    loader().then((mod) => {
      if (active) setVideo(mod.default);
    });

    return () => {
      active = false;
    };
  }, [name]);

  return video;
}
