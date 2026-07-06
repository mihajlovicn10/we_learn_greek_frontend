function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-brand-100 ${className}`} />;
}

function SkeletonCard({ lines = 3 }) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-card">
      <Skeleton className="mb-4 h-6 w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`mb-2 h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}

function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} lines={2} />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonList };
