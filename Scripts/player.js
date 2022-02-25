const playerImg = new Image();
playerImg.src = "/Images/Player.png";

class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 100;
    this.y = 300;
    this.width = 200;
    this.height = 170;
    this.jumpheight = 12;
    this.shouldJump = false;
    this.jumpCount = 0;
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
