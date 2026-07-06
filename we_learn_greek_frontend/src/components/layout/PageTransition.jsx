import { motion } from 'framer-motion';

const pageTransition = {
  duration: 0.38,
  ease: [0.25, 0.46, 0.45, 0.94],
};

function PageTransition({ children }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
