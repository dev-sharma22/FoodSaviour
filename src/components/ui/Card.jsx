import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Applying the new theme-aware classes
      className={`bg-light-card dark:bg-dark-card p-6 rounded-lg border border-light-border dark:border-dark-border/20 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;