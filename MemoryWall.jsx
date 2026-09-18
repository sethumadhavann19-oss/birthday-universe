import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import memories from '../data/memories.json';

const COLORS = ['#ff6b9d33', '#ffd93d33', '#6bc5ff33', '#a29bfe33', '#55efc433'];

export default function MemoryWall({ onNext }) {
  const [opened, setOpened] = useState(null);

  return (
    <div className="section">
      <h2 className="section-title">Memory Wall</h2>
      <p className="section-subtitle">Click a note to reveal a memory</p>

      <div className="grid-wrap" style={{ maxWidth: 600 }}>
        {memories.map((m, idx) => (
          <motion.div
            key={m.id}
            className="glass memory-note"
            style={{
              background: COLORS[idx % COLORS.length],
              animationDelay: `${idx * 0.3}s`,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpened(m)}
          >
            📝
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: 20,
            }}
            onClick={() => setOpened(null)}
          >
            <motion.div
              className="glass"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              style={{ padding: 30, maxWidth: 420 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '2rem' }}>💌</div>
              <p style={{ marginTop: 12, fontSize: '1.05rem' }}>{opened.message}</p>
              <button className="btn-primary mt-24" onClick={() => setOpened(null)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="btn-primary mt-32" onClick={onNext}>Continue ↓</button>
    </div>
  );
}
