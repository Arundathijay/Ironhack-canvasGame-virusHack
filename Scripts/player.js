const playerImg = new Image();
playerImg.src = "/Images/Player.png";

class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 20;
    this.y = 350;
    this.width = 100;
    this.height = 90;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      playerImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
