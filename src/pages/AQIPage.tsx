
import { motion } from 'framer-motion';
import AQIMonitor from '@/components/AQIMonitor';

const AQIPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AQIMonitor />
    </motion.div>
  );
};

export default AQIPage;
