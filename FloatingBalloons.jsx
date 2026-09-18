import React, { useMemo } from 'react';

const COLORS = ['#ff6b9d', '#ffd93d', '#6bcBff', '#a29bfe', '#55efc4', '#ff9f43'];

export default function FloatingBalloons({ count = 12 }) {
  const balloons = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 96,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
      color: COLORS[i % COLORS.length],
    }));
  }, [count]);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, ${b.color}cc)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
