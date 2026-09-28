import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const positions = new Map(); // history entry key → scrollY
const RESTORE_TIMEOUT_MS = 1500;

/**
 * Scroll position per history entry:
 * - New page (PUSH/REPLACE of a new path) → start at the top.
 * - Back/forward (POP) → return to where you were. The browser's own restoration fires before
 *   lazy pages and cached list pages have rendered, so it lands short on long (endless) lists;
 *   here we wait until the page is tall enough, then scroll.
 * Keyed on pathname: typing in a search box updates ?q= and must not jump the page.
 */
function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKey = useRef(location.key);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  // Remember the position of the entry we're on, continuously (cheap: one Map write per frame).
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => positions.set(currentKey.current, window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    currentKey.current = location.key;

    if (navigationType !== 'POP') {
      // 'instant' overrides the global smooth scrolling: a page change shouldn't animate a scroll.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }

    const target = positions.get(location.key) ?? 0;
    const started = performance.now();
    let frame = 0;
    const restore = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll >= target || performance.now() - started > RESTORE_TIMEOUT_MS) {
        window.scrollTo({ top: target, left: 0, behavior: 'instant' });
      } else {
        frame = requestAnimationFrame(restore); // content still rendering; try next frame
      }
    };
    restore();
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default ScrollManager;
