import { m } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * Gentle entrance for list items. Items keep their key across renders, so only newly
 * loaded ones animate; `index` staggers each freshly loaded batch.
 */
function AnimatedItem({ children, index = 0, batchSize = 20, className = '' }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE, delay: Math.min(index % batchSize, 10) * 0.03 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default AnimatedItem;
