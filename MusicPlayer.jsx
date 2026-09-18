
import React, { useEffect, useRef, useState } from 'react';
import config from '../data/config.json';

export default function MusicPlayer({
  variant = 'toggle',
  url = 'https://youtu.be/XqRr88sCtEM?si=hDY9fibz0al_UGV3'
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const playlist = config.playlist || [];

  // YouTube video ID
  const getYouTubeId = (youtubeUrl) => {
    try {
      const urlObj = new URL(youtubeUrl);

      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.substring(1);
      }

      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }

      return null;
    } catch {
      return null;
    }
  };

  const youtubeId = getYouTubeId(url);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const changeTrack = (dir) => {
    if (playlist.length === 0) return;

    const next =
      (trackIndex + dir + playlist.length) % playlist.length;

    setTrackIndex(next);

    setTimeout(() => {
      if (audioRef.current && playing) {
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const currentTrack = playlist[trackIndex] || {
    title: 'Birthday Song',
    src: ''
  };

  // --------------------------------------------------
  // YOUTUBE PLAYER
  // --------------------------------------------------

  if (youtubeId && variant === 'playlist') {
    return (
      <div>
        <div
          className="glass"
          style={{
            padding: 24,
            maxWidth: 420,
            width: '100%',
            margin: '0 auto'
          }}
        >
          <h3>🎵 Birthday Song</h3>

          <p
            className="section-subtitle"
            style={{ marginBottom: 16 }}
          >
            A special song for a special birthday ❤️
          </p>

          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 20
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="Birthday Song"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

          <p
            style={{
              textAlign: 'center',
              marginBottom: 16
            }}
          >
            🎂 Enjoy the music, Sinchu! ❤️
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ORIGINAL LOCAL AUDIO PLAYER
  // --------------------------------------------------

  return (
    <div>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop={variant === 'toggle'}
        onEnded={() =>
          variant === 'playlist' && changeTrack(1)
        }
      />

      {variant === 'toggle' && (
        <button
          className="btn-icon"
          onClick={togglePlay}
          title="Toggle background music"
          aria-label="Toggle music"
        >
          {playing ? '🔊' : '🔈'}
        </button>
      )}

      {variant === 'playlist' && (
        <div
          className="glass"
          style={{
            padding: 24,
            maxWidth: 420,
            width: '100%'
          }}
        >
          <h3>{currentTrack.title}</h3>

          <p
            className="section-subtitle"
            style={{ marginBottom: 16 }}
          >
            Track {trackIndex + 1} of {playlist.length}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <button
              className="btn-icon"
              onClick={() => changeTrack(-1)}
            >
              ⏮
            </button>

            <button
              className="btn-icon"
              onClick={togglePlay}
            >
              {playing ? '⏸' : '▶️'}
            </button>

            <button
              className="btn-icon"
              onClick={() => changeTrack(1)}
            >
              ⏭
            </button>
          </div>

          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}
          >
            Volume

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                setVolume(parseFloat(e.target.value))
              }
              style={{ width: '100%' }}
            />
          </label>
        </div>
      )}
    </div>
  )}
