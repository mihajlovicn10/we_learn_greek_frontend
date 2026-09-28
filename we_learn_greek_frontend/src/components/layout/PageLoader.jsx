import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SkeletonList } from '../ui';

// Most page chunks load (or are prefetched) in well under this, so the loader never flashes.
const SHOW_AFTER_MS = 150;

function PageLoader() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  // Reserve space so the footer doesn't jump up while the page loads.
  if (!visible) return <div className="min-h-[60vh]" aria-hidden="true" />;
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="page-container section-padding max-w-content"
      role="status"
      aria-live="polite"
      aria-label={t('common.loadingPage')}
    >
      <div className="mb-8 flex items-center gap-3">
        <m.span
          className="inline-block h-9 w-9 rounded-full border-[3px] border-brand-200 border-t-brand-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
        />
        <span className="text-sm font-medium text-brand-700">{t('common.loadingPage')}</span>
      </div>
      <SkeletonList count={3} />
    </m.div>
  );
}

export default PageLoader;
