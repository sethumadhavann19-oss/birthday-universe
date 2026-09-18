import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import timelineData from '../data/timeline.json';

export default function Timeline({ onNext }) {
  const [active, setActive] = useState(null);

  return (
    <div className="section">
      <h2 className="section-title">Our Friendship Timeline</h2>
      <p className="section-subtitle">Click a moment to relive it</p>

      <div style={{ position: 'relative', width: '100%', maxWidth: 700 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 3,
            background: 'linear-gradient(var(--accent), var(--accent-2))',
            transform: 'translateX(-50%)',
          }}
        />
        {timelineData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
              margin: '20px 0',
              position: 'relative',
            }}
          >
            <div
              className="glass"
              style={{ padding: 18, maxWidth: 280, cursor: 'pointer', textAlign: 'left' }}
              onClick={() => setActive(active === item.id ? null : item.id)}
            >
              <div style={{ fontSize: '1.6rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.1rem' }}>{item.year} — {item.title}</h3>
              <AnimatePresence>
                {active === item.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="btn-primary mt-32" onClick={onNext}>Continue ↓</button>
    </div>
  );
}
