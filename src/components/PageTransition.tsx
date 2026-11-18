import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

const pageTransition = {
  type: "tween" as const,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  duration: 0.4,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={false}
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="will-change-transform"
    >
      {/* Page reveal overlay */}
      <motion.div
        initial={false}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-50 bg-gradient-to-b from-primary/20 to-violet/20 pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

export default PageTransition;
