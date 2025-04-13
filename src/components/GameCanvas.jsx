import React, { useRef, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';

const GameCanvas = ({ keys }) => {
  const canvasRef = useRef(null);
  const { gameRunning, player, platforms, collectibles, updatePlayer, checkCollisions } = useGameContext();
  
  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Limit to 30 FPS for slower animation
    const frameDelay = 1000 / fps;
    
    const render = (currentTime) => {
      if (!gameRunning) return;
      
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= frameDelay) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        drawBackground(ctx, canvas);
        
        // Update player
        updatePlayer(keys);
        
        // Draw platforms
        drawPlatforms(ctx, platforms);
        
        // Draw collectibles
        drawCollectibles(ctx, collectibles);
        
        // Draw player
        drawPlayer(ctx, player);
        
        // Check collisions
        checkCollisions();
        
        lastTime = currentTime;
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render(0);
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [gameRunning, keys, player, platforms, collectibles, updatePlayer, checkCollisions]);
  
  return <canvas ref={canvasRef} width={800} height={400} />;
};

// Drawing functions
const drawBackground = (ctx, canvas) => {
  // Create a more retro grid background
  ctx.fillStyle = '#0a0a1c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  ctx.strokeStyle = '#1a1a3e';
  ctx.lineWidth = 1;
  
  // Vertical lines
  for (let x = 0; x < canvas.width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  // Horizontal lines
  for (let y = 0; y < canvas.height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Add some retro "stars"
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(Math.random() * canvas.width / 4) * 4;
    const y = Math.floor(Math.random() * canvas.height / 4) * 4;
    const size = 2;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, size, size);
  }
};

const drawPlayer = (ctx, player) => {
  // Draw player body (more pixelated style)
  ctx.fillStyle = '#ff9f1c';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Draw player details in pixel art style
  ctx.fillStyle = '#000';
  // Eyes
  ctx.fillRect(player.x + 8, player.y + 10, 6, 6);
  ctx.fillRect(player.x + 18, player.y + 10, 6, 6);
  
  // Pixel highlights in eyes
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x + 9, player.y + 11, 2, 2);
  ctx.fillRect(player.x + 19, player.y + 11, 2, 2);
  
  // Simple pixel smile
  ctx.fillStyle = '#000';
  ctx.fillRect(player.x + 10, player.y + 22, 12, 2);
  ctx.fillRect(player.x + 8, player.y + 20, 2, 2);
  ctx.fillRect(player.x + 22, player.y + 20, 2, 2);
};

const drawPlatforms = (ctx, platforms) => {
  platforms.forEach(platform => {
    // Main platform color
    ctx.fillStyle = '#4a4e69';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    
    // Add retro platform details
    ctx.fillStyle = '#2b2d42';
    for (let i = 0; i < platform.width; i += 4) {
      ctx.fillRect(platform.x + i, platform.y, 2, 2);
      ctx.fillRect(platform.x + i + 2, platform.y + platform.height - 2, 2, 2);
    }
    
    // Platform highlight
    ctx.fillStyle = '#8d99ae';
    ctx.fillRect(platform.x, platform.y, platform.width, 2);
  });
};

const drawCollectibles = (ctx, collectibles) => {
  collectibles.forEach(collectible => {
    if (!collectible.collected) {
      // Create pixelated coin effect
      const centerX = collectible.x + collectible.width / 2;
      const centerY = collectible.y + collectible.height / 2;
      
      // Outer glow
      ctx.fillStyle = '#ff2d75';
      ctx.fillRect(centerX - 6, centerY - 6, 12, 12);
      
      // Inner color
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(centerX - 4, centerY - 4, 8, 8);
      
      // Shine detail
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(centerX - 2, centerY - 2, 2, 2);
    }
  });
};

export default GameCanvas;