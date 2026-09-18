import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import config from '../data/config.json';

function launchFireworks() {
  const duration = 2000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
  confetti({ particleCount: 150, spread: 160, startVelocity: 45, origin: { y: 0.5 } });
}

export default function GiftBox({ onNext }) {
  const [opened, setOpened] = useState(false);

  const openGift = () => {
    setOpened(true);
    launchFireworks();
  };

  return (
    <div className="section">
      <h2 className="section-title">Your Surprise Gift</h2>
      <p className="section-subtitle">Click the box to open it</p>

      {!opened ? (
        <motion.div
          onClick={openGift}
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ y: { repeat: Infinity, duration: 2 } }}
          style={{ fontSize: '7rem', cursor: 'pointer' }}
        >
          🎁
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <div style={{ fontSize: '5rem' }}>🎆🎂🎆</div>
          <h1 className="script-font glow-text mt-16" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.6rem)' }}>
            Happy Birthday {config.friendName}!
          </h1>
        </motion.div>
      )}

      <button className="btn-primary mt-32" onClick={onNext}>Continue ↓</button>
    </div>
  );
}
