import React from 'react';
import MusicPlayer from './MusicPlayer.jsx';

export default function MusicSection({ onNext }) {
  return (
    <div className="section">
      <h2 className="section-title">
        Birthday Playlist 🎵
      </h2>

      <p className="section-subtitle">
        A soundtrack to celebrate the day ❤️
      </p>

      <MusicPlayer
        variant="playlist"
        url="https://youtu.be/XqRr88sCtEM?si=hDY9fibz0al_UGV3"
      />

      <button
        className="btn-primary mt-32"
        onClick={onNext}
      >
        Continue ↓
      </button>
    </div>
  );
}

