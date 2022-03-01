const spellVaccine = new Image();
spellVaccine.src = "/Images/Mask Button.png";

class Spell {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
    this.speed = speed;
  }

  runLogic() {
    this.x += speed;
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = "black";
    this.game.context.fillRect(this.x, this.y, this.width, this.height);

    this.game.context.restore();
  }
}
