import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const primaryClasses = "bg-primary text-white hover:bg-primary-hover";
  const secondaryClasses = "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white";
  
  const style = variant === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <motion.button
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`px-6 py-2 font-semibold rounded-md transition-all duration-300 ${style} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;