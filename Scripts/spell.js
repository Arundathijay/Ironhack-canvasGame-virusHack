const spellVaccine = new Image();
spellVaccine.src = "/Images/Mask Button.png";

class Spell {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 20;
  }

  runLogic() {
    this.x += 2;
  }

  draw() {
    this.game.context.save();

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
