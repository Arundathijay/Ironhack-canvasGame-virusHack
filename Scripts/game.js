let imagespassed = 0;
const speed = 4;

const backgroundImage = new Image();
backgroundImage.src =
  "/Images/_city_of_the_amethyst_nights__by_era_7_dbqldfw.jpg";

const hitSound = new Audio("/sound/mixkit-quick-jump-arcade-game-239.wav");
const gameIntro = new Audio("/sound/414046__tyops__fantasy-gaming-intro.wav");
const shootSound = new Audio(
  "/sound/466831-breviceps-laser-shots_7osXelHx.wav"
);

class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext("2d");
    this.screens = screens;
    this.running = false;
    this.enableControls();
    this.keysPressed = [];
    this.levelPoint = 150;
    gameIntro.play();
  }

  start() {
    this.running = true;
    this.player = new Player(this);
    this.health = 100;
    this.lives = 3;
    this.landmarks = [];
    this.lastTime = 0;
    this.enemies = [];
    this.obstacles = [];
    this.spells = [];
    gameIntro.pause();
    this.addLandmarks();
    this.screenDisplay("playing");

    this.gameLoop();
  }

  gameLoop() {
    window.requestAnimationFrame((timeStamp) => {
      this.runLogic(timeStamp);
      this.draw();
      if (this.running) {
        this.gameLoop(0);
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
    gameIntro.play();
    this.screenDisplay("end");
  }

  levelUp() {
    this.running = false;
    this.screenDisplay("levelUP");
    if (this.screenDisplay === "levelUp") {
      this.levelPoint += 50;
    }
    console.log("levelUp");
  }

  generateObstacle() {
    const obstX = Math.random() * this.context.height;
    const obstY = Math.random() * this.context.width;
    const obstSpeed = 0.4; //random value
    const obs = new Obstacle(this, obstX, obstY, obstSpeed);
    this.obstacles.push(obs);
  }

  generateEnemy(deltaTime) {
    if (!this.lastTime || deltaTime - this.lastTime >= 2 * 1000) {
      this.lastTime = deltaTime;
      const enemyX = this.canvas.height;
      const enemyY = (Math.random() * this.canvas.width) / 2 - 40;
      const enemySpeed = Math.random() + 0.9;

      const enemy = new Enemy(this, enemyX, enemyY, enemySpeed);
      this.enemies.push(enemy);
    }
  }

  fireSpell() {
    const spellY = this.player.y + this.player.height / 2 - 40 / 2;
    const spell = new Spell(
      this,
      this.player.x + this.player.width / 2,
      spellY
    );
    shootSound.play();
    this.spells.push(spell);
  }

  addLandmarks() {
    this.landmarks.push(
      new Landmark(this, 200, 80, 15, 50),
      new Landmark(this, 400, 90, 15, 50),
      new Landmark(this, 500, 100, 15, 50),
      new Landmark(this, 350, 550, 15, 50),
      new Landmark(this, 450, 650, 15, 50),
      new Landmark(this, 550, 700, 15, 50)
    );
  }

  runLogic(timeStamp) {
    //background animation
    imagespassed -= speed;
    if (imagespassed < -2000) {
    }
    if (backgroundImage.width) {
      imagespassed = imagespassed % backgroundImage.width;
    }

    for (const spell of this.spells) {
      this.spellIntersection(spell);
    }
    if (this.health <= 0) {
      this.lose();
    } else if (this.lives <= 0) {
      this.lose();
    } else if (this.health >= this.levelPoint) {
      this.levelUp();
      if (this.levelUp) {
        this.levelPoint += 100;
      }
      console.log(this.levelPoint);
    }

    this.generateEnemy(timeStamp);

    for (const enemy of this.enemies) {
      this.enemyIntersection(enemy);
    }
    if (Math.random() < 0.1) {
      this.generateObstacle();
    }

    for (const landmark of this.landmarks) {
      this.landmarkIntersection(landmark);
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
  enemyIntersection(enemy) {
    enemy.runLogic();
    const enemyIntersctPlayer = enemy.checkIntersection(this.player);
    const enemyIsOutOfBounds = enemy.x + enemy.width < 0;

    if (enemyIntersctPlayer) {
      const indexOfEnemy = this.enemies.indexOf(enemy);
      this.enemies.splice(indexOfEnemy, 1);
      this.health -= 10;

      if (enemyIsOutOfBounds) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
      }
    }
  }

  landmarkIntersection(landmark) {
    landmark.runLogic();
    const landmarkIntersect = landmark.checkIntersection(this.player);
    if (landmarkIntersect) {
      hitSound.play();
      this.player.x -= 20;
      this.lives -= 1;
      this.health -= 10;
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

  //display scores

  drawHealth() {
    this.context.font = "24px Roboto";
    this.context.fillText(`Antibodies ${this.health}`, 20, 680);
  }
  drawLife() {
    this.context.font = "24px monospace, cursive;";
    this.context.fillText(`lives ${this.lives}`, 20, 700);
  }

  enableControls() {
    window.addEventListener("keydown", (event) => {
      if (this.running) {
        event.preventDefault();
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
            this.player.x -= 5;
            break;
          case "Space":
            this.fireSpell();
            break;
        }
      }
    });
  }

  draw() {
    this.context.clearRect(0, 0, 800, 700);

    this.context.drawImage(backgroundImage, imagespassed, 0);
    this.context.drawImage(
      backgroundImage,
      backgroundImage.width + imagespassed,
      0
    );

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
    this.drawLife();
  }
}
