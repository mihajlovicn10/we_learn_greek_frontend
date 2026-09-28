import { AnimatePresence, m } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function ExpandableCard({
  header,
  badges,
  expanded = false,
  onToggle,
  expandLabel,
  collapseLabel,
  children,
  className = '',
}) {
  const { t } = useTranslation();
  return (
    <article
      className={`mb-6 overflow-hidden rounded-2xl bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-md ${className}`}
    >
      {/* Row is clickable for convenience; the toggle button is the accessible control.
          It can't wrap the header, which may contain its own buttons (e.g. pronunciation). */}
      <div
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-b border-brand-50 px-5 py-4 text-left transition-colors duration-300 hover:bg-brand-50/60"
      >
        <div className="flex flex-wrap items-center gap-2">
          {header}
          {badges}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          aria-expanded={expanded}
          className="flex shrink-0 items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <span className="text-sm font-medium text-brand-600">
            {expanded ? collapseLabel ?? t('common.hideDetails') : expandLabel ?? t('common.showDetails')}
          </span>
          <m.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-brand-500"
            aria-hidden
          >
            <FaChevronDown size={12} />
          </m.span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default ExpandableCard;
