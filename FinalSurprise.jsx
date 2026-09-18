import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingBalloons from './FloatingBalloons.jsx';
import config from '../data/config.json';

export default function FinalSurprise({ onRestart }) {
  const [typed, setTyped] = useState('');
  const fullText = config.finalMessage;

  useEffect(() => {
    const end = Date.now() + 4000;
    (function frame() {
      confetti({ particleCount: 8, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#ff6b9d', '#ffd93d', '#a29bfe'] });
      confetti({ particleCount: 8, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#ff6b9d', '#ffd93d', '#a29bfe'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({ particleCount: 200, spread: 180, origin: { y: 0.5 } });

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="section" style={{ minHeight: '100vh', background: 'radial-gradient(circle at center, var(--bg-secondary), var(--bg-primary))' }}>
      <FloatingBalloons count={20} />

      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <div style={{ fontSize: '4rem' }}>🎆🎉🎂🎉🎆</div>
        <h1 className="script-font glow-text" style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}>
          Happy Birthday {config.friendName}!
        </h1>
      </motion.div>

      <p style={{ maxWidth: 560, fontSize: '1.1rem', marginTop: 20, minHeight: '4em' }}>
        {typed}
        <span className="typing-cursor">&nbsp;</span>
      </p>

      <button className="btn-primary mt-32" onClick={onRestart}>
        🔁 Replay The Surprise
      </button>
    </div>
  );
}
