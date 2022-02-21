class Obstacle {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 60;
    this.speed = speed;
  }

  runLogic() {
    this.x -= this.speed;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "red";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
