import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingBalloons from './FloatingBalloons.jsx';
import ParticlesBackground from './ParticlesBackground.jsx';
import MusicPlayer from './MusicPlayer.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const FULL_TEXT = 'A special surprise for a special friend.';

export default function Landing({ onNext }) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="section" style={{ minHeight: '100vh' }}>
      <ParticlesBackground />
      <FloatingBalloons />

      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 5, display: 'flex', gap: 10 }}>
        <MusicPlayer variant="toggle" />
        <ThemeToggle />
      </div>

      <motion.h1
        className="section-title glow-text"
        style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🎈 Happy Birthday! 🎈
      </motion.h1>

      <p style={{ fontSize: '1.2rem', minHeight: '1.6em', color: 'var(--text-secondary)' }}>
        {typed}
        <span className="typing-cursor">&nbsp;</span>
      </p>

      <motion.button
        className="btn-primary mt-32"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
      >
        Continue the Surprise ↓
      </motion.button>
    </div>
  );
}
