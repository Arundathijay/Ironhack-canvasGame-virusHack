const spellVaccine = new Image();
spellVaccine.src = "/Images/img_12.png";

class Spell {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
    this.speed = 2;
  }

  runLogic() {
    this.x += speed;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.drawImage(
      spellVaccine,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.restore();
  }
}
