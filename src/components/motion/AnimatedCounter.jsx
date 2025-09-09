import { useEffect } from 'react';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion'; // Import motion

const AnimatedCounter = ({ to }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, to, {
      duration: 2,
      ease: "easeOut",
    });
    return animation.stop;
  }, [to, count]);

  // --- THIS IS THE FIX ---
  // We wrap the output in a `motion.span` component from Framer Motion.
  // This special component knows how to read the `rounded` animation object.
  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedCounter;