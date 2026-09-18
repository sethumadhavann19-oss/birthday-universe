import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import config from '../data/config.json';

function getTimeLeft() {
  const target = new Date(config.birthdayDate).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ onNext }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isBirthdayToday = timeLeft === null;

  return (
    <div className="section">
      <h2 className="section-title">
        {isBirthdayToday ? "🎉 It's Your Birthday! 🎉" : 'Counting Down To The Big Day'}
      </h2>
      <p className="section-subtitle">
        {isBirthdayToday
          ? "Today is all about celebrating you!"
          : `Until ${config.friendName}'s birthday`}
      </p>

      {isBirthdayToday ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
          style={{ fontSize: '4rem' }}
        >
          🥳🎂🎊
        </motion.div>
      ) : (
        <div className="grid-wrap">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="glass"
              style={{ padding: '20px 26px', minWidth: 90 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{value}</div>
              <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {unit}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button className="btn-primary mt-32" onClick={onNext}>Keep Exploring ↓</button>
    </div>
  );
}
