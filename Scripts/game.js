let x = 0;
const speed = 3;

const backgroundImage = new Image();
backgroundImage.src = "/Images/Flat Nature Art.png";

const healthImg = new Image();
healthImg.src =
  "/Images/pngtree-cute-cartoon-syringe-for-vaccination-campaign-png-image_6451436.jpg";

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext("2d");
    this.screens = screens;
    this.running = false;
    this.enableControls();
  }

  start() {
    this.running = true;
    this.player = new Player(this);
    this.landmarks = [];
    this.health = 100;
    this.enemies = [];
    this.obstacles = [];
    this.spells = [];

    this.addLandmarks();
    this.screenDisplay("playing");

    this.gameLoop();
  }

  gameLoop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.gameLoop();
      }
    });
  }

  // displaying different screens
  screenDisplay(name) {
    const selectedScreen = this.screens[name];
    selectedScreen.style.display = "";
    for (let screenName in this.screens) {
      const iterationScreen = this.screens[screenName];
      if (iterationScreen !== selectedScreen) {
        iterationScreen.style.display = "none";
      }
    }
  }
  lose() {
    this.running = false;
    this.screenDisplay("end");
  }
  levelUp() {
    this.screenDisplay("levelUP");
    this.running = true;
  }

  generateObstacle() {
    const obstX = Math.random() * this.context.height;
    const obstY = Math.random() * this.context.width;
    const obstSpeed = 0.4;
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
    const spellY = this.player.y + this.player.height / 2 - 40 / 2;
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
    }
    if (backgroundImage.width) {
      x = x % backgroundImage.width;
    }

    for (const spell of this.spells) {
      this.spellIntersection(spell);
    }
    if (this.health <= 0) {
      this.lose();
    } else if (this.health >= 150) {
      this.levelUp();
      this.running = true;
    }

    if (Math.random() < 0.007) {
      this.generateEnemy();
    }
    for (const enemy of this.enemies) {
      enemy.runLogic();
      const enemyIntersctPlayer = enemy.checkIntersection(this.player);
      const enemyIsOutOfBounds = enemy.x + enemy.width < 0;
      if (enemyIntersctPlayer) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        this.health -= 10;

        // remove enemies that are out of bound without reducing scores

        if (enemyIsOutOfBounds) {
          const indexOfEnemy = this.enemies.indexOf(enemy);
          this.enemies.splice(indexOfEnemy, 1);
        }
        if (Math.random() < 0.1) {
          this.generateObstacle();
        }
        for (const obs of this.obstacles) {
          obs.runLogic();
          const obsIntersctPlayer = obs.checkIntersection(this.player);
          const obsIsOutOfBounds = obs.x + obs.width < 0;
          if (obsIntersctPlayer) {
            const indexOfObs = this.obstacles.indexOf(obs);
            this.obstacles.splice(indexOfObs, 1);
            this.health -= 5;
            // remove obs that are out of bound without reducing scores

            if (obsIsOutOfBounds) {
              const indexOfObs = this.obstacles.indexOf(obs);
              this.obstacles.splice(indexOfObs, 1);
            }
          }
        }
      }
    }

    /*const fps = 60;
    const gravity = 200;
    const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

    Landmark.y = clamp(Landmark.y, Landmark.height, 700 - Landmark.height);
    Landmark.x = clamp(Landmark.x, Landmark.width, 800 - Landmark.width);

    Landmark.speedY += gravity / fps;
    Landmark.y += Landmark.speedY / fps;

    if (Landmark.y + Landmark.height > 700 || Landmark.y - Landmark.width < 0) {
      Landmark.speedY = Landmark.speedY * -1;
    }
    if (Landmark.x + Landmark.width > 800 || Landmark.x - Landmark.width < 0) {
      Landmark.speedX = Landmark.speedX * -1;
    }*/

    for (let landmarks of this.landmarks) {
      landmarks.runLogic();
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

  addLandmarks() {
    this.landmarks.push(
      new Landmark(this, 350, 80, 15, 70),
      new Landmark(this, 450, 200, 15, 70),
      new Landmark(this, 500, 550, 15, 70),
      new Landmark(this, 600, 80, 15, 70)
    );
  }

  //display scores

  drawHealth() {
    this.context.font = "36px Roboto";
    this.context.drawImage(
      healthImg,
      17,
      700,
      canvasElement.width,
      canvasElement.height
    );
    this.context.fillText(`ANTIBODIES ${this.health}`, 20, 700);
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      if (this.running) {
        const code = event.code;
        switch (code) {
          case "ArrowUp":
            this.player.y -= 10;
            break;
          case "ArrowDown":
            this.player.y += 5;
            break;
          case "ArrowRight":
            this.player.x += 10;
            break;
          case "ArrowLeft":
            this.player.x -= 5;
          case "Space":
            this.fireSpell();
            break;
        }
      }
    });
  }

  draw() {
    this.context.clearRect(0, 0, 800, 700);

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
      for (const landmark of this.landmarks) {
        landmark.draw();
      }
    }
    this.player.draw();
    this.drawHealth();
  }
}
