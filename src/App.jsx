// App.jsx - Main component
import React from 'react';
import './PixelQuest.css';
import GameContainer from './components/GameContainer';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className="pixel-quest">
      <h1 className="title" data-text="PIXEL QUEST">PIXEL QUEST</h1>
      <p className="controls">ARROW KEYS TO MOVE | SPACE TO JUMP</p>
      
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
}

export default App;