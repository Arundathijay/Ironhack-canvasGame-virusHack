const canvasElement = document.querySelector("canvas");

const startScreenElement = document.getElementById("start-screen");
const playingScreenElement = document.getElementById("playing-screen");
const endScreenElement = document.getElementById("game-over-screen");
const levelScreenElement = document.getElementById("level-up-screen");

//refer to buttons
const startButton = startScreenElement.querySelector("button");
const tryAgainButton = endScreenElement.querySelector("button");
const levelupButton = levelScreenElement.querySelector("button");

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
  game.start();
  game.levelUp();
});
