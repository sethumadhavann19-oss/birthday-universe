import { useRef, useCallback } from 'react';

/**
 * Lightweight sound-effect hook.
 * Drop actual files into /public/sounds (click.mp3, pop.mp3, success.mp3, reveal.mp3)
 * If the file is missing, playback fails silently — no crash.
 */
export default function useSound(src, volume = 0.5) {
  const audioRef = useRef(null);

  const play = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.volume = volume;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch (e) {
      // Sound file not present — ignore gracefully
    }
  }, [src, volume]);

  return play;
}
