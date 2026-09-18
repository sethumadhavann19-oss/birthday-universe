import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wishes from '../data/wishes.json';

export default function WishGenerator({ onNext }) {
  const [current, setCurrent] = useState(wishes[0]);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    // Simulate an "AI thinking" delay for effect
    setTimeout(() => {
      let next = current;
      while (next === current && wishes.length > 1) {
        next = wishes[Math.floor(Math.random() * wishes.length)];
      }
      setCurrent(next);
      setGenerating(false);
    }, 500);
  };

  return (
    <div className="section">
      <h2 className="section-title">✨ Wish Generator ✨</h2>
      <p className="section-subtitle">Click below for a heartfelt birthday wish</p>

      <div className="glass" style={{ padding: 30, maxWidth: 480, minHeight: 120 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={generating ? 'loading' : current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ fontSize: '1.1rem', fontStyle: 'italic' }}
          >
            {generating ? '💭 Thinking of something special...' : `"${current}"`}
          </motion.p>
        </AnimatePresence>
      </div>

      <button className="btn-primary mt-24" onClick={generate} disabled={generating}>
        🎲 Generate New Wish
      </button>

      <button className="btn-primary mt-16" style={{ opacity: 0.85 }} onClick={onNext}>
        Continue ↓
      </button>
    </div>
  );
}
