import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './components/Loader.jsx';
import Welcome from './components/Welcome.jsx';
import Landing from './components/Landing.jsx';
import Countdown from './components/Countdown.jsx';
import Timeline from './components/Timeline.jsx';
import SpecialCards from './components/SpecialCards.jsx';
import MemoryWall from './components/MemoryWall.jsx';
import WishGenerator from './components/WishGenerator.jsx';
import GiftBox from './components/GiftBox.jsx';
import Puzzle from './components/Puzzle.jsx';
import Quiz from './components/Quiz.jsx';
import GreetingCard from './components/GreetingCard.jsx';
import MusicSection from './components/MusicSection.jsx';
import FinalSurprise from './components/FinalSurprise.jsx';

const STEPS = [
  'welcome',
  'landing',
  'countdown',
  'timeline',
  'special',
  'memories',
  'wishes',
  'gift',
  'puzzle',
  'quiz',
  'card',
  'music',
  'final',
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const restart = () => setStepIndex(0);

  if (loading) return <Loader />;

  const step = STEPS[stepIndex];

  const pages = {
    welcome: <Welcome onStart={next} />,
    landing: <Landing onNext={next} />,
    countdown: <Countdown onNext={next} />,
    timeline: <Timeline onNext={next} />,
    special: <SpecialCards onNext={next} />,
    memories: <MemoryWall onNext={next} />,
    wishes: <WishGenerator onNext={next} />,
    gift: <GiftBox onNext={next} />,
    puzzle: <Puzzle onNext={next} />,
    quiz: <Quiz onNext={next} />,
    card: <GreetingCard onNext={next} />,
    music: <MusicSection onNext={next} />,
    final: <FinalSurprise onRestart={restart} />,
  };

  return (
    <div className="app-shell">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {pages[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
