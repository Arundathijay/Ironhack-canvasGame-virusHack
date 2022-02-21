const playerImg = new Image();
playerImg.src = "/Images/Player.png";

class Player {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.x = 300;
    this.y = 150;
    this.width = 120;
    this.height = 120;
    this.jumpheight = 12;
    this.shouldJump = false;
    this.jumpCount = 0;
  }
  draw() {
    this.game.context.save();

    this.game.context.fillStyle = "blue";
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
