const obsImage = new Image();
obsImage.src = "/Images/explosion01.png";

class Obstacle {
  constructor(gameInstance, x, y, speed) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.speed = speed;
  }
  runLogic() {
    this.x -= this.speed;
  }

  checkIntersection(item) {
    return (
      item.x + item.width > this.x &&
      item.x < this.x + this.width &&
      item.y + item.height > this.y &&
      item.y < this.y + this.height
    );
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      obsImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
