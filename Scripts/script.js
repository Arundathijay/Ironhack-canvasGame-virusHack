const canvasElement = document.querySelector("canvas");

canvasElement.width = innerWidth;
canvasElement.height = innerHeight;

const startScreenElement = document.getElementById("start-screen");
const playingScreenElement = document.getElementById("playing-screen");
const endScreenElement = document.getElementById("game-over-screen");
//refer to buttons
const startButton = startScreenElement.querySelector("button");
const tryAgainButton = endScreenElement.querySelector("button");

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement
};
const game = new Game(canvasElement, screenElements);

startButton.addEventListener("click", () => {
  game.start();
});

tryAgainButton.addEventListener("click", () => {
  game.start();
});

/*window.onload = function () {
  let imageHeight = 0;
  let scrollSpeed = 10;

  function loop() {
    this.game.context.drawImage(backgroundImg, 0, imageHeight);
    this.game.context.drawImage(
      backgroundImg,
      0,
      imageHeight - canvasElement.height
    );
    imageHeight += scrollSpeed;
    if (imageHeight == canvasElement.height) imageHeight = 0;
    window.requestAnimationFrame(loop);
  }
  loop();
};*/
