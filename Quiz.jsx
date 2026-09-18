import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import quizData from '../data/quiz.json';

export default function Quiz({ onNext }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  // Replace the options for the friendship year question
  const updatedQuizData = quizData.map((q) => {
    if (q.question === 'What year did our friendship begin?') {
      return {
        ...q,
        options: ['2020', '2022', '2026', '2025'],
        answerIndex: 2, // 2026 is the correct answer
      };
    }
    return q;
  });

  const question = updatedQuizData[step];

  const answer = (idx) => {
    if (selected !== null) return;

    setSelected(idx);

    const correct = idx === question.answerIndex;

    if (correct) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (step + 1 < updatedQuizData.length) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        setFinished(true);

        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
        });
      }
    }, 700);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <div className="section">
      <h2 className="section-title">Friendship Quiz</h2>

      <p className="section-subtitle">
        How well do we know each other?
      </p>

      {!finished ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass"
          style={{
            padding: 28,
            maxWidth: 460,
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
            }}
          >
            Question {step + 1} of {updatedQuizData.length}
          </p>

          <h3 style={{ margin: '10px 0 20px' }}>
            {question.question}
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {question.options.map((opt, idx) => {
              let bg = 'rgba(255,255,255,0.08)';

              if (selected !== null) {
                if (idx === question.answerIndex) {
                  bg = 'rgba(85,239,196,0.4)';
                } else if (idx === selected) {
                  bg = 'rgba(255,107,157,0.4)';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => answer(idx)}
                  disabled={selected !== null}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 12,
                    border: '1px solid var(--glass-border)',
                    background: bg,
                    color: 'var(--text-primary)',
                    cursor:
                      selected === null ? 'pointer' : 'default',
                    textAlign: 'left',
                    fontSize: '0.95rem',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass"
          style={{
            padding: 30,
            maxWidth: 420,
          }}
        >
          <div style={{ fontSize: '2.5rem' }}>🏆</div>

          <h3>
            You scored {score} / {updatedQuizData.length}!
          </h3>

          <p style={{ color: 'var(--text-secondary)' }}>
            {score === updatedQuizData.length
              ? 'Perfect! You really know our friendship!'
              : 'Not bad — plenty more memories to make!'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              marginTop: 16,
            }}
          >
            <button
              className="btn-primary"
              style={{ opacity: 0.85 }}
              onClick={restart}
            >
              Retry
            </button>

            <button
              className="btn-primary"
              onClick={onNext}
            >
              Continue ↓
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}