import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import config from '../data/config.json';

export default function GreetingCard({ onNext }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = `birthday-card-${config.friendName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      alert('Could not generate image download in this environment.');
    }
  };

  return (
    <div className="section">
      <h2 className="section-title">Digital Greeting Card</h2>
      <p className="section-subtitle">Click the card to open it</p>

      <div
        ref={cardRef}
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: 'pointer', perspective: 1200 }}
      >
        <motion.div
          animate={{ rotateY: open ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            width: 300,
            height: 380,
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Front */}
          <div
            className="glass"
            style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            }}
          >
            <div style={{ fontSize: '3rem' }}>🎂</div>
            <h2 className="script-font" style={{ color: '#fff', fontSize: '1.8rem' }}>Happy Birthday</h2>
            <p style={{ color: '#fff', fontSize: '0.8rem' }}>Click to open</p>
          </div>
          {/* Back */}
          <div
            className="glass"
            style={{
              position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}
          >
            <p className="script-font" style={{ fontSize: '1.4rem', marginBottom: 12 }}>
              Dear {config.friendName},
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              {config.greetingCardNote}
            </p>
            <p className="script-font mt-16" style={{ fontSize: '1.2rem' }}>
              — {config.yourName}
            </p>
          </div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
        <button className="btn-primary" style={{ opacity: 0.85 }} onClick={downloadImage}>
          ⬇ Download Card
        </button>
        <button className="btn-primary" onClick={onNext}>Continue ↓</button>
      </div>
    </div>
  );
}
