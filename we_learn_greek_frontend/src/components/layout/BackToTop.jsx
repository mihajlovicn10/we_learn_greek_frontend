import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SHOW_AFTER_PX = 900;

/** Floating button that appears on long pages (endless lists) and scrolls smoothly back to the top. */
function BackToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > SHOW_AFTER_PX));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          onClick={() => window.scrollTo({ top: 0 })} // smooth via CSS; instant under reduced motion
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          aria-label={t('list.backToTop')}
          title={t('list.backToTop')}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-card-md transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <FaArrowUp aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;
