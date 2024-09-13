import React, { useState, useEffect } from "react";
import wall from "./images/wall.png";
import coin from "./images/coin.png";
import pacmann from "./images/pacman.png";
import bg from "./images/bg.png";
import ghost from "./images/ghost2.png";
import "./App.css";

const App = () => {
  // State for PacMan and ghost positions and game map
  const [pacman, setPacman] = useState({ x: 6, y: 4 });
  const [coins, setCoins] = useState(1);
  const [ghostPos, setGhostPos] = useState({ x: 7, y: 7 });
  const [map, setMap] = useState([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 1, 1, 5, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  const [gameOver, setGameOver] = useState(false);

  // Function to handle PacMan movement
  const handleKeyDown = (event) => {
    if (gameOver) {
      return; // If the game is over, don't handle key events
    }

    let newX = pacman.x;
    let newY = pacman.y;

    if (
      event.keyCode === 37 &&
      pacman.x > 0 &&
      map[pacman.y][pacman.x - 1] !== 1
    ) {
      newX = pacman.x - 1;
      if (map[pacman.y][pacman.x - 1] !== 3) {
        setCoins(coins + 1);
      }
    } else if (
      event.keyCode === 38 &&
      pacman.y > 0 &&
      map[pacman.y - 1][pacman.x] !== 1
    ) {
      newY = pacman.y - 1;
      if (map[pacman.y - 1][pacman.x] !== 3) {
        setCoins(coins + 1);
      }
    } else if (
      event.keyCode === 39 &&
      pacman.x < map[0].length - 1 &&
      map[pacman.y][pacman.x + 1] !== 1
    ) {
      newX = pacman.x + 1;
      if (map[pacman.y][pacman.x + 1] !== 3) {
        setCoins(coins + 1);
      }
    } else if (
      event.keyCode === 40 &&
      pacman.y < map.length - 1 &&
      map[pacman.y + 1][pacman.x] !== 1
    ) {
      newY = pacman.y + 1;
      if (map[pacman.y + 1][pacman.x] !== 3) {
        setCoins(coins + 1);
      }
    }

    setPacman({ x: newX, y: newY });
    updateMap(newX, newY, 5);
    checkWinningCondition();
  };

  const updateMap = (x, y, type) => {
    setMap((prevMap) => {
      const newMap = [...prevMap];
      newMap[pacman.y][pacman.x] = 3;
      newMap[y][x] = type;
      return newMap;
    });
  };

  const checkWinningCondition = () => {
    if (!map.some((row) => row.includes(2))) {
      setGameOver(true);
      alert("Congratulations! You collected all the coins. You win!");
    } else if (pacman.x === ghostPos.x && pacman.y === ghostPos.y) {
      setGameOver(true);
      alert("Game over! You collided with the ghost.");
    }
  };

  // Function to move the ghost toward PacMan
  const moveGhost = () => {
    if (gameOver) return;

    let newGhostX = ghostPos.x;
    let newGhostY = ghostPos.y;

    if (ghostPos.x < pacman.x && map[ghostPos.y][ghostPos.x + 1] !== 1) {
      newGhostX = ghostPos.x + 1;
    } else if (ghostPos.x > pacman.x && map[ghostPos.y][ghostPos.x - 1] !== 1) {
      newGhostX = ghostPos.x - 1;
    }

    if (ghostPos.y < pacman.y && map[ghostPos.y + 1][ghostPos.x] !== 1) {
      newGhostY = ghostPos.y + 1;
    } else if (ghostPos.y > pacman.y && map[ghostPos.y - 1][ghostPos.x] !== 1) {
      newGhostY = ghostPos.y - 1;
    }

    setGhostPos({ x: newGhostX, y: newGhostY });
    updateMap(newGhostX, newGhostY, 4);
    checkWinningCondition();
  };

  // Move the ghost every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      moveGhost();
    }, 300);

    return () => clearInterval(interval);
  }, [ghostPos, pacman]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      id="world"
      style={{
        backgroundColor: "#242424",
        textAlign: "center",
      }}
    >
      <h2>Your Coins : {coins}</h2>
      {/* Render the game map */}
      {map.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={
                cell === 1
                  ? "wall"
                  : cell === 2
                  ? "coin"
                  : cell === 3
                  ? "ground"
                  : cell === 4
                  ? "ghost"
                  : cell === 5
                  ? "pacman"
                  : null
              }
              style={
                cell === 1
                  ? { backgroundImage: `url(${wall})` }
                  : cell === 2
                  ? { backgroundImage: `url(${coin})` }
                  : cell === 3
                  ? { backgroundImage: `url(${bg})` }
                  : cell === 4
                  ? { backgroundImage: `url(${ghost})` }
                  : cell === 5
                  ? { backgroundImage: `url(${pacmann})` }
                  : null
              }
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
