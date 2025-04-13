// src/components/GameContainer.jsx
import React, { useEffect, useState } from 'react';
import { useGameContext } from '../context/GameContext';
import GameCanvas from './GameCanvas';
import GameOverScreen from './GameOverScreen';
import ScoreDisplay from './ScoreDisplay';
import './GameContainer.css';

const GameContainer = () => {
  const { gameOver, resetGame } = useGameContext();
  const [keys, setKeys] = useState({ left: false, right: false, up: false });
  
  // Handle key events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: true }));
      if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: true }));
      if (e.key === 'ArrowUp' || e.key === ' ') setKeys(prev => ({ ...prev, up: true }));
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') setKeys(prev => ({ ...prev, left: false }));
      if (e.key === 'ArrowRight') setKeys(prev => ({ ...prev, right: false }));
      if (e.key === 'ArrowUp' || e.key === ' ') setKeys(prev => ({ ...prev, up: false }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  return (
    <div className="game-container">
      <GameCanvas keys={keys} />
      <ScoreDisplay />
      {gameOver && <GameOverScreen onRestart={resetGame} />}
    </div>
  );
};

export default GameContainer;