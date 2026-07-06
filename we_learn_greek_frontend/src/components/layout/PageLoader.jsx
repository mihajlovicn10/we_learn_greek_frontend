import { motion } from 'framer-motion';
import { SkeletonList } from '../ui';

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="page-container section-padding max-w-content"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="mb-8 flex items-center gap-3">
        <motion.span
          className="inline-block h-9 w-9 rounded-full border-[3px] border-brand-200 border-t-brand-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
        />
        <span className="text-sm font-medium text-brand-700">Loading page…</span>
      </div>
      <SkeletonList count={3} />
    </motion.div>
  );
}

export default PageLoader;
