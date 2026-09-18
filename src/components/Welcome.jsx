import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';
import config from '../data/config.json';

export default function Welcome({ onStart }) {
  return (
    <div className="section" style={{ minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 5 }}>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ fontSize: '4rem', marginBottom: 10 }}>🎉</div>
        <h1 className="script-font glow-text" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}>
          A Surprise Awaits
        </h1>
        <p className="section-subtitle" style={{ marginTop: 16 }}>
          Something special has been made just for you, {config.friendName}.
        </p>

        <motion.button
          className="btn-primary mt-32"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
        >
          🎁 Start Surprise
        </motion.button>
      </motion.div>

      <div className="scroll-hint">No login needed — just click and enjoy ✨</div>
    </div>
  );
}
