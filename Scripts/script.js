const canvasElement = document.querySelector("canvas");

const startScreenElement = document.getElementById("start-screen");
const playingScreenElement = document.getElementById("playing-screen");
const endScreenElement = document.getElementById("game-over-screen");
const levelScreenElement = document.getElementById("level-up-screen");

//refer to buttons
const startButton = document.getElementById("play-btn");
const tryAgainButton = document.getElementById("game-over");
const levelupButton = document.getElementById("level-up");

//different screens
const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement,
  levelUP: levelScreenElement
};

const game = new Game(canvasElement, screenElements);

startButton.addEventListener("click", () => {
  game.start();
});

tryAgainButton.addEventListener("click", () => {
  game.start();
});

levelupButton.addEventListener("click", () => {
  game.continue();
  console.log(game.health);
});
