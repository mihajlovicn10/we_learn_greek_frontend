import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

function ExpandableCard({
  header,
  badges,
  expanded = false,
  onToggle,
  expandLabel = 'Show details',
  collapseLabel = 'Hide details',
  children,
  className = '',
}) {
  return (
    <article
      className={`mb-6 overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-md ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 border-b border-brand-50 px-5 py-4 text-left transition-colors duration-300 hover:bg-brand-50/60"
      >
        <div className="flex flex-wrap items-center gap-2">
          {header}
          {badges}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-sm font-medium text-brand-600">
            {expanded ? collapseLabel : expandLabel}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-brand-500"
            aria-hidden
          >
            <FaChevronDown size={12} />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default ExpandableCard;
