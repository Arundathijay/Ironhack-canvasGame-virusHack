class Spell {
  constructor(gameInstance, x, y) {
    this.game = gameInstance;
    this.x = x;
    this.y = y;
    this.width = 9;
    this.height = 5;
  }

  runLogic() {
    // spells fly towards the right 1px, everytime runlogc method gets executed
    this.x += 1;
  }

  draw() {
    this.game.context.save();

    this.game.context.fillStyle = "purple";

    this.game.context.fillRect(this.x, this.y, this.width, this.height);

    this.game.context.restore();
  }
}
