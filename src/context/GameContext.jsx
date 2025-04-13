const React = require('react');
const { createContext, useState, useContext } = React;

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [player, setPlayer] = useState({
    x: 50,
    y: 300,
    width: 32,
    height: 48,
    color: '#ff9f1c',
    speed: 0.8,        
    jumpForce: 12,      
    velocityY: 0,
    isJumping: false,
    gravity: 0.45      
  });

  const [platforms] = useState([
    { x: 0, y: 350, width: 200, height: 20, color: '#4a4e69' },
    { x: 250, y: 300, width: 150, height: 20, color: '#4a4e69' },
    { x: 450, y: 250, width: 150, height: 20, color: '#4a4e69' },
    { x: 650, y: 200, width: 150, height: 20, color: '#4a4e69' },
    { x: 0, y: 400, width: 800, height: 50, color: '#4a4e69' }
  ]);

  const [collectibles, setCollectibles] = useState([
    { x: 100, y: 320, width: 16, height: 16, collected: false },
    { x: 300, y: 270, width: 16, height: 16, collected: false },
    { x: 500, y: 220, width: 16, height: 16, collected: false },
    { x: 700, y: 170, width: 16, height: 16, collected: false },
    { x: 150, y: 200, width: 16, height: 16, collected: false },
    { x: 350, y: 150, width: 16, height: 16, collected: false }
  ]);

  const resetGame = () => {
    setPlayer({
      ...player,
      x: 50,
      y: 300,
      velocityY: 0,
      isJumping: false
    });
    
    setCollectibles(collectibles.map(collectible => ({
      ...collectible,
      collected: false
    })));
    
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
  };

  const updatePlayer = (keys) => {
    setPlayer(prevPlayer => {
      let newPlayer = { ...prevPlayer };
      
      if (keys.left) newPlayer.x -= newPlayer.speed;
      if (keys.right) newPlayer.x += newPlayer.speed;
      
      newPlayer.velocityY += newPlayer.gravity;
      newPlayer.y += newPlayer.velocityY;
      
      if (keys.up && !newPlayer.isJumping) {
        newPlayer.velocityY = -newPlayer.jumpForce;
        newPlayer.isJumping = true;
      }
      
      if (newPlayer.x < 0) newPlayer.x = 0;
      if (newPlayer.x + newPlayer.width > 800) newPlayer.x = 800 - newPlayer.width;
      
      return newPlayer;
    });
  };

  const checkCollisions = () => {
    let onPlatform = false;
    
    platforms.forEach(platform => {
      if (
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width &&
        player.y + player.height >= platform.y &&
        player.y + player.height <= platform.y + platform.height &&
        player.velocityY > 0
      ) {
        setPlayer(prevPlayer => ({
          ...prevPlayer,
          y: platform.y - prevPlayer.height,
          velocityY: 0,
          isJumping: false
        }));
        onPlatform = true;
      }
    });
    
    collectibles.forEach((collectible, index) => {
      if (
        !collectible.collected &&
        player.x + player.width > collectible.x &&
        player.x < collectible.x + collectible.width &&
        player.y + player.height > collectible.y &&
        player.y < collectible.y + collectible.height
      ) {
        const newCollectibles = [...collectibles];
        newCollectibles[index].collected = true;
        setCollectibles(newCollectibles);
        setScore(prevScore => prevScore + 100);
        
        if (newCollectibles.every(c => c.collected)) {
          setTimeout(() => {
            alert('Congratulations! You collected all the pixels!');
            resetGame();
          }, 500);
        }
      }
    });
    
    if (!onPlatform) {
      setPlayer(prevPlayer => ({
        ...prevPlayer,
        isJumping: true
      }));
    }
    
    if (player.y > 400) {
      setGameRunning(false);
      setGameOver(true);
    }
  };

  return (
    <GameContext.Provider value={{
      score,
      gameRunning,
      gameOver,
      player,
      platforms,
      collectibles,
      resetGame,
      updatePlayer,
      checkCollisions
    }}>
      {children}
    </GameContext.Provider>
  );
};