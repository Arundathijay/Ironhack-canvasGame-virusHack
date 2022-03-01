class Landmark extends GameElement {
  constructor(gameInstance, x, y, width, height, speedX, speedY) {
    super(gameInstance, x, y, width, height, speedX, speedY);
  }

  runLogic() {
    //this.x -= 1;
    this.y += 1;

    if (this.y < 680) {
      this.y -= 1;
    }
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "red";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.restore();
  }
}
