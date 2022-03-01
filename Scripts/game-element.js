class GameElement {
  constructor(
    gameInstance,
    x,
    y,
    width,
    height,
    speedX,
    speedY,
    accelerationX,
    accelerationY
  ) {
    this.game = gameInstance;
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.speedX = speedX;
    this.speedY = speedY;
    this.accelerationX = accelerationX || 0;
    this.accelerationY = accelerationY || 0;
  }

  checkIntersection(item) {
    return (
      item.x + item.width > this.x &&
      item.x < this.x + this.width &&
      item.y + item.height > this.y &&
      item.y < this.y + this.height
    );
  }
  runLogic() {}
  draw() {}
}
