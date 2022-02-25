class level extends Game {
  constructor(screens, health) {
    this.screens = screens;
    this.screenDisplay("playing");
    this.health = health;
    this.gameLoop();
  }
  drawHealth() {
    if (this.health >= 105) {
      this.context.fillText("Level up", 400, 350);
      this.screenDisplay("playing");
    }
  }
  draw() {
    this.drawHealth();
  }
}
