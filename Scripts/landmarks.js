const fireAttack = new Image();
fireAttack.src = "/Images/Shuriken pronta 2.png";

class Landmark extends GameElement {
  constructor(gameInstance, x, y, width, height) {
    super(gameInstance, x, y, width, height);
    this.width = 40;
    this.height = 40;
    this.random = randomInt(1, 2.5);
    this.accelerationY = this.random;
  }

  runLogic() {
    //  this.y += this.y > 680 ? -this.accelerationY : this.accelerationY;

    if (this.y >= 700 - 50) {
      this.accelerationY = -this.accelerationY;
    }
    if (this.y <= 0) {
      this.accelerationY = this.random;
    }
    this.y += this.accelerationY;
  }

  draw() {
    this.game.context.save();
    this.game.context.drawImage(
      fireAttack,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }

  checkIntersection(item) {
    return (
      item.x + item.width > this.x &&
      item.x < this.x + this.width &&
      item.y + item.height > this.y &&
      item.y < this.y + this.height
    );
  }
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
