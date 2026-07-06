import { Link } from 'react-router-dom';
import Card from './Card';

function EmptyState({ title, message, actionLabel, actionTo, onAction }) {
  return (
    <Card className="text-center">
      {title && (
        <h3 className="mb-2 font-display text-lg font-semibold text-brand-900">{title}</h3>
      )}
      {message && <p className="text-gray-600">{message}</p>}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-4 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {actionLabel}
        </button>
      )}
    </Card>
  );
}

export default EmptyState;
