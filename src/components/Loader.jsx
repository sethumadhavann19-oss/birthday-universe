import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="loader-screen">
      <motion.div
        className="loader-heart"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        🎂
      </motion.div>
    </div>
  );
}
