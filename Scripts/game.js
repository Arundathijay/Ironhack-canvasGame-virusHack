let x = 0;
const speed = 3;

const backgroundImage = new Image();
backgroundImage.src = "/Images/Flat Nature Art.png";

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext("2d");
    this.screens = screens;
    this.running = false;
    this.enableControls();
    this.jump();
  }

  start() {
    this.running = true;
    this.player = new Player(this);
    this.health = 100;
    this.enemies = [];
    this.obstacles = [];
    this.spells = [];
    this.screenDisplay("playing");
    this.gameLoop();
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }

  gameLoop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.loop();
      this.draw();
      this.gameLoop();
    });
  }

  screenDisplay(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = "none";
    }
    this.screens[name].style.display = "";
  }

  lose() {
    this.running = false;
    this.screenDisplay("end");
  }

  generateObstacle() {
    const obstX = Math.random() * this.canvas.height;
    const obstY = Math.random() * this.canvas.width;
    const obstSpeed = Math.random() + 0.6;
    const obs = new Obstacle(this, obstX, obstY, obstSpeed);
    this.obstacles.push(obs);
  }

  generateEnemy() {
    const enemyX = this.canvas.height;
    const enemyY = (Math.random() * this.canvas.width) / 2 - 90;
    const enemySpeed = Math.random() + 0.5;
    const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
    this.enemies.push(enemy);
  }
  fireSpell() {
    const spellY = this.player.y + this.player.height / 2 - 5 / 2;
    const spell = new Spell(
      this,
      this.player.x + this.player.width / 2,
      spellY
    );
    this.spells.push(spell);
  }
  runLogic() {
    x -= speed;
    if (x < -400) {
      debugger;
    }
    if (backgroundImage.width) {
      x = x % backgroundImage.width;
    }

    for (const spell of this.spells) {
      this.spellIntersection(spell);
    }
    if (this.health <= 0) {
      this.lose();
    }

    if (Math.random() < 0.009) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      const enemyIntersctPlayer = enemy.checkIntersection(this.player);
      const enemyIsOutOfBounds = enemy.x + enemy.width < 0;
      if (enemyIntersctPlayer || enemyIsOutOfBounds) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        this.health -= 10;
      }
      if (Math.random() < 0.0009) {
        this.generateObstacle();
      }
      for (const obs of this.obstacles) {
        obs.runLogic();
        const obsIntersctPlayer = obs.checkIntersection(this.player);
        const obsIsOutOfBounds = obs.x + obs.width < 0;
        if (obsIntersctPlayer || obsIsOutOfBounds) {
          const indexOfObs = this.obstacles.indexOf(obs);
          this.obstacles.splice(indexOfObs, 1);
          this.health -= 5;
        }
      }
    }
  }

  spellIntersection(spell) {
    spell.runLogic();
    for (const enemy of this.enemies) {
      const spellIntersectEnemy = enemy.checkIntersection(spell);
      if (spellIntersectEnemy) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        const indexOfSpell = this.spells.indexOf(spell);
        this.spells.splice(indexOfSpell, 1);
        this.health += 10;
      }
    }
    if (spell.x - spell.width > this.canvas.width) {
      const indexOfSpell = this.spells.indexOf(spell);
      this.spells.splice(indexOfSpell, 1);
    }
  }

  drawHealth() {
    this.context.font = "36px Roboto yellow";
    this.context.fillText(`Antibody ${this.health}`, 20, 600);
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      if (this.running) {
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
          case "ArrowLeft":
            this.player.x += 5;
          case "Space":
            this.fireSpell();
            break;
        }
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
    this.context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    this.context.drawImage(backgroundImage, x, 0);

    this.context.drawImage(backgroundImage, backgroundImage.width + x, 0);

    for (const enemy of this.enemies) {
      enemy.draw();

      for (const obs of this.obstacles) {
        obs.draw();
      }
      for (const spell of this.spells) {
        spell.draw();
      }
    }
    this.jump();
    this.player.draw();
    this.drawHealth();
  }
}
