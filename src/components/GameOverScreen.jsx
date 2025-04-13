// src/components/GameOverScreen.jsx
import React from 'react';
import './GameOverScreen.css';

const GameOverScreen = ({ onRestart }) => {
  return (
    <div className="game-over">
      GAME OVER
      <button className="restart-btn" onClick={onRestart}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;