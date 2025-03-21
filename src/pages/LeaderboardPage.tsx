
import { motion } from 'framer-motion';
import Leaderboard from '@/components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Leaderboard />
    </motion.div>
  );
};

export default LeaderboardPage;
