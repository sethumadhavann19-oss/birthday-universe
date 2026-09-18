import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const SECRET_WORDS = ['YOU', 'MAKE', 'EVERY', 'DAY', 'BRIGHTER'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Puzzle({ onNext }) {
  const shuffled = useMemo(() => shuffle(SECRET_WORDS), []);
  const [placed, setPlaced] = useState([]);
  const [pool, setPool] = useState(shuffled);

  const progress = Math.round((placed.length / SECRET_WORDS.length) * 100);
  const solved = placed.length === SECRET_WORDS.length &&
    placed.every((w, i) => w === SECRET_WORDS[i]);

  const pickWord = (word, idx) => {
    if (placed.length >= SECRET_WORDS.length) return;
    setPlaced((p) => [...p, word]);
    setPool((p) => p.filter((_, i) => i !== idx));
  };

  const reset = () => {
    setPlaced([]);
    setPool(shuffle(SECRET_WORDS));
  };

  return (
    <div className="section">
      <h2 className="section-title">Secret Message Puzzle</h2>
      <p className="section-subtitle">Tap the words in the correct order to reveal a hidden message</p>

      <div className="progress-bar-track mt-8">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 6 }}>{progress}% complete</p>

      <div className="glass mt-24" style={{ padding: 24, minWidth: 280, minHeight: 70 }}>
        {placed.length === 0 && <span style={{ color: 'var(--text-secondary)' }}>Your message will appear here...</span>}
        {placed.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginRight: 8, fontWeight: 700, fontSize: '1.2rem' }}
          >
            {w}
          </motion.span>
        ))}
      </div>

      {!solved ? (
        <div className="grid-wrap mt-24">
          {pool.map((word, idx) => (
            <motion.button
              key={word + idx}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.95rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pickWord(word, idx)}
            >
              {word}
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-24">
          <div style={{ fontSize: '2rem' }}>🔓</div>
          <p className="glow-text" style={{ fontSize: '1.1rem' }}>Puzzle solved! The message is unlocked.</p>
        </motion.div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        {placed.length > 0 && !solved && (
          <button className="btn-primary" style={{ opacity: 0.8 }} onClick={reset}>Reset</button>
        )}
        <button className="btn-primary" disabled={!solved} style={{ opacity: solved ? 1 : 0.4 }} onClick={onNext}>
          Continue ↓
        </button>
      </div>
    </div>
  );
}
