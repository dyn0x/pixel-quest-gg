// src/components/ScoreDisplay.jsx
import React from 'react';
import { useGameContext } from '../context/GameContext';
import './ScoreDisplay.css';

const ScoreDisplay = () => {
  const { score } = useGameContext();
  
  return (
    <div className="score-display">
      SCORE: <span>{score}</span>
    </div>
  );
};

export default ScoreDisplay;