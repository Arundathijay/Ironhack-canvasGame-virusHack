let backgroundImg = new Image();
backgroundImg.src = "/Images/Tilesetpreview1.gif";

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext("2d");

    this.player = new Player(this);
    this.enemies = [];
    this.obstacles = [];
    this.spells = [];
    this.enableControls();
    this.jump();
  }
  generateObstacle() {
    const obstX = this.canvas.height;
    const obstY = Math.random() * this.canvas.width - 20;
    const obstSpeed = Math.random() + 0.4;
    const obs = new Obstacle(this, obstX, obstY, obstSpeed);
    this.obstacles.push(obs);
  }

  generateEnemy() {
    const enemyX = this.canvas.height;
    const enemyY = Math.random() * this.canvas.width - 50;
    const enemySpeed = Math.random() + 0.3;
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }
  fireSpell() {
    const spellY = this.player.y + this.player.height / 2 - 5 / 2;
    const spell = new Spell(this, this.player.x, spellY);
    this.spells.push(spell);
  }
  runLogic() {
    for (const spell of this.spells) {
      spell.runLogic();
    }
    if (Math.random() < 0.009) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      const intersection = enemy.checkIntersection(this.player);
      if (intersection) {
        const indexOfVirus = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfVirus, 1);
      }
    }
    if (Math.random() < 0.0009) {
      this.generateObstacle();
    }
    for (const obs of this.obstacles) {
      obs.runLogic();
    }
  }

  gameLoop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.gameLoop();
    });
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      const code = event.code;
      switch (code) {
        case "ArrowUp":
          this.player.y -= 5;
          break;
        case "ArrowDown":
          this.player.y += 5;
          break;
        case "ArrowRight":
          this.player.x += 5;
          break;
        case "Space":
          this.fireSpell();
          break;
      }
    });
  }
  jump() {
    if (this.shouldJump) {
      this.jumpCount++;
      if (this.jumpCount < 15) {
        this.y -= this.jumpHeight;
      } else if (this.jumpCount > 14 && this.jumpCount < 19) {
        this.y += 0;
      } else if (this.jumpCount < 33) {
        this.y += this.jumpHeight;
      }
      if (this.jumpCount >= 32) {
        this.shouldJump = false;
      }
    }
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const enemy of this.enemies) {
      enemy.draw();

      for (const obs of this.obstacles) {
        obs.draw();
      }
      for (const spell of this.spells) {
        spell.draw();
      }
      this.jump();
      this.player.draw();
    }
  }
}
