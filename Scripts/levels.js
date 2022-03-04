class Level {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.health = 150;
    this.speed = speed;
  }
  levelUp() {}

  draw() {
    this.landmarks.push(
      new Landmark(this, 200, 80, 15, 50),
      new Landmark(this, 400, 90, 15, 50),
      new Landmark(this, 500, 100, 15, 50),
      new Landmark(this, 350, 550, 15, 50),
      new Landmark(this, 450, 650, 15, 50),
      new Landmark(this, 550, 700, 15, 50),
      new Landmark(this, 750, 650, 15, 50)
    );
  }
}
