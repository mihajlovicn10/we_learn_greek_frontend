import { LazyMotion, MotionConfig } from 'framer-motion';

const loadFeatures = () => import('./features').then((mod) => mod.default);

/**
 * App-wide animation setup:
 * - LazyMotion: components use the lightweight `m.*` and animation features load after first paint.
 *   `strict` makes a stray full `motion.*` import fail loudly instead of silently re-bloating the bundle.
 * - reducedMotion="user": honour the OS "reduce motion" setting for every animation.
 */
function MotionProvider({ children }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export default MotionProvider;
