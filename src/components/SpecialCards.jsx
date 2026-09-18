import React, { useState } from 'react';
import { motion } from 'framer-motion';
import qualities from '../data/qualities.json';

export default function SpecialCards({ onNext }) {
  const [flipped, setFlipped] = useState({});

  const toggle = (id) => setFlipped((f) => ({ ...f, [id]: !f[id] }));

  return (
    <div className="section">
      <h2 className="section-title">Why You Are Special</h2>
      <p className="section-subtitle">Click each card to find out</p>

      <div className="grid-wrap">
        {qualities.map((q) => (
          <motion.div
            key={q.id}
            className={`flip-card ${flipped[q.id] ? 'flipped' : ''}`}
            onClick={() => toggle(q.id)}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front glass">
                <div style={{ fontSize: '2.5rem' }}>{q.icon}</div>
                <h3>{q.title}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tap to reveal</p>
              </div>
              <div
                className="flip-card-back"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
              >
                <p style={{ fontSize: '0.95rem', color: '#fff' }}>{q.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="btn-primary mt-32" onClick={onNext}>Continue ↓</button>
    </div>
  );
}
