
class GameScene extends Phaser.Scene {
  platforms;
  player;
  cursors;
  score = 0;
  scoreText;
  bombs;
  gameOver = false;
  gems;
  level = 1;
  levelText;
  ping;
  saws;
  greenGems;
  pauseButton;
  isPaused;
  soundSettings;
  quitButton;
  
  constructor() {
    super({ key: "gameScene" });
  }

  init(data) {
    this.score = 0;
    this.gameOver = false;
    this.level = 1;
    this.soundSettings = data.sound
    
  }
  preload() {
    /*
      Preload Backgrounds
    */
    this.load.image("sky_1", "assets/backgrounds/bg_a.jpg");
    this.load.image("sky_2", "assets/backgrounds/bg_b.png");
    this.load.image("sky_3", "assets/backgrounds/bg_c.png");
    this.load.image("sky_4", "assets/backgrounds/bg_d.jpg");
    this.load.image("sky_5", "assets/backgrounds/bg_e.jpg");
    this.load.image("sky_6", "assets/backgrounds/bg_f.jpg");
    this.load.image("sky_7", "assets/backgrounds/bg_g.jpg");
    this.load.image("sky_8", "assets/backgrounds/bg_h.png");
    this.load.image("sky_9", "assets/backgrounds/bg_i.jpg");
    this.load.image("sky_10", "assets/backgrounds/bg_j.jpg");
    this.load.image("sky_11", "assets/backgrounds/bg_k.jpg");

    this.load.image("ground", "assets/tiles/ground.png");
    this.load.image("gem", "assets/objects/gems/blue_gem_4.png");
    this.load.image("greenGem", "assets/objects/gems/green_gem_6.png");
    this.load.image("bomb", "assets/objects/barrel.png");
    this.load.image("tile", "assets/tiles/tiles.png");
    this.load.image("saw", "assets/objects/saw.png");

    this.load.spritesheet("assassin", "assets/assassin.png", {
      frameWidth: 32,
      frameHeight: 47,
    });
    this.load.audio("ping", ["assets/audio/pickup.mp3"]);
    
  }

  create() {

    // Add Sky
    this.backgroundSprite = this.add.sprite(0, 0, 'sky_1').setScale(1,1);
    this.backgroundSprite.setOrigin(0, 0);
    this.backgroundSprite.displayWidth = window.innerWidth;
    this.backgroundSprite.displayHeight = window.innerHeight;

    this.platforms = this.physics.add.staticGroup();

    /*
        Create Ground
    */
    this.createGround(this.platforms);

    let heightLimit = window.innerHeight;
    let widthLimit = window.innerWidth;
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    /*
        Platforms
    */
    this.platforms.create(screenCenterX-450, heightLimit-220, "tile").setScale(0.5).refreshBody();
    this.platforms
      .create(screenCenterX, heightLimit-300, "tile")
      .setScale(0.5, 0.5)
      .refreshBody();
    this.platforms
      .create(0, heightLimit-500, "tile")
      .setScale(0.5)
      .refreshBody();
    this.platforms
      .create(widthLimit - 450, heightLimit - 150, "tile")
      .setScale(0.5)
      .refreshBody();
    this.platforms.create(500, heightLimit - 200, "tile").setScale(0.5).refreshBody();
    this.platforms.create(400, heightLimit - 680, "tile").setScale(0.5).refreshBody();
    this.platforms
      .create(widthLimit - 500, heightLimit - 600, "tile")
      .setScale(0.5)
      .refreshBody();
    this.platforms.create(600, heightLimit - 500, "tile").setScale(0.5).refreshBody();
    this.platforms.create(100, heightLimit -570, "tile").setScale(0.5).refreshBody(); // left 1st
    this.platforms
      .create(widthLimit - 350, heightLimit - 300, "tile")
      .setScale(0.5)
      .refreshBody();

    /*
        Saw Object
    */
    this.saws = this.physics.add.group();

    // Gems
    this.gems = this.physics.add.group({
      key: "gem",
      repeat: 19,
      setXY: { x: 12, y: 0, stepX: 70 },
      setScale: { x: 0.3, y: 0.3 },
    });

    this.gems.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Player
    this.player = this.physics.add.sprite(100, 450, "assassin");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("assassin", {
        start: 5,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "assassin", frame: 0 }],
      frameRate: 30,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("assassin", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Bombs
    this.bombs = this.physics.add.group();

    // Cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Score
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
      fontFamily: "Arial",
      stroke: "#fff",
      strokeThickness:5,
      backgroundColor: "#ffffffb0"
    });

    // Level
    this.levelText = this.add.text(window.innerWidth - 200, 16, "Level: 1", {
      fontSize: "32px",
      fill: "#000",
      fontFamily: "Arial",
      stroke: "#fff",
      strokeThickness: 5,
      backgroundColor: "#ffffffb0"
    });
    
    // Pause Button
    this.pauseButton = this.add.text(window.innerWidth/2, 30, "PAUSE", {
      fontSize: "50px",
      fill: "white",
      fontFamily: "Courier",
    }).setOrigin(0.5);

    this.pauseButton.setShadow(1, 3, "rgba(255,255,255,.5)", 0);
    this.pauseButton.inputEnabled = true;
    this.pauseButton.setInteractive({ useHandCursor: true });
    this.pauseButton.on("pointerdown", () => this.togglePause());



    // Quit Button

    this.quitButton = this.add
      .text(window.innerWidth, window.innerHeight-7, `QUIT`, {
        fontSize: "30px",
        fill: "white",
        fontFamily: "Arial",
        stroke: "#fff",
        strokeThickness: 3,
        backgroundColor:"#00a1ff",
        padding:5
      })
      .setOrigin(1, 1);
    this.quitButton.inputEnabled = true;
    this.quitButton.setInteractive({ useHandCursor: true });
    this.quitButton.on("pointerdown", () => this.quitGame());

    
    // Ping Initialization
    this.ping = this.sound.add("ping");
    this.ping.allowMultiple = true;

    // Add Collider
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.gems, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.saws, this.platforms);
    // this.physics.add.collider(this.saw2, this.platforms);

    this.physics.add.overlap(
      this.player,
      this.gems,
      this.collectStar,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );

    this.physics.add.collider(this.player, this.saws, this.hitBomb, null, this);
  }

  update() {
    /// Saw Spinning
    this.saws.children.iterate(function (child) {
      child.angle += 1;
    });


    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, gem) {
    gem.disableBody(true, true);
    if (this.soundSettings){
      this.ping.play();
    }
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (
      this.gems.countActive(true) === 0 &&
      (!this.greenGems || (this.greenGems && this.greenGems.countActive(true) === 0))
    ) {
      this.changeLevel(player);
    }
  }

  collectGreenGem(player, greenGems) {
    greenGems.disableBody(true, true);
    if (this.soundSettings) {
      this.ping.play();
    }
    this.score += 50;
    this.scoreText.setText("Score: " + this.score);
    if (
      this.greenGems.countActive(true) === 0 &&
      this.gems.countActive(true) === 0
    ) {
      this.changeLevel(player);
    }
  }

  changeLevel = (player) => {
    this.level = this.level + 1;
    this.levelText.setText("Level: " + this.level);
    this.gems.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    /*
      Change Background
    */
    let randomImage = Math.floor(Math.random() * 11) + 1;
    
    this.backgroundSprite.setTexture(`sky_${randomImage}`).setScale(1,1);
    this.backgroundSprite.setOrigin(0, 0);
    this.backgroundSprite.displayWidth = window.innerWidth;
    this.backgroundSprite.displayHeight = window.innerHeight;
    var bomb = this.bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.setScale(0.1,0.1)
    if (this.level !== 2 && this.level % 2 === 0) {
      var saw = this.saws.create(x, 16, "saw").setScale(0.1, 0.1);
      saw.setBounce(1);
      saw.setCollideWorldBounds(true);
      saw.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    if (this.level % 3 === 0) {
      this.greenGems = this.physics.add.group({
        key: "greenGem",
        repeat: 2,
        setXY: { x: 70, y: 0, stepX: 170 },
        setScale: { x: 0.3, y: 0.3 },
      });

      this.greenGems.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });
      // Add Collider
      this.physics.add.collider(this.greenGems, this.platforms);

      this.physics.add.overlap(
        this.player,
        this.greenGems,
        this.collectGreenGem,
        null,
        this
      );
    }
  };

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    // this.gameOver = true;
    console.log("*** Transitioning to Screen 3***");
    setTimeout(()=>{
        this.scene.start("gameOver", { level: this.level, score : this.score });
    },1000)
    
  }

  createGround(platforms) {
    var totalPlatformsRequired = Math.ceil(window.innerWidth / 250);
    let initialPositionOnX = 100;
    for (var i = 0; i < totalPlatformsRequired; i++) {
      platforms
        .create(initialPositionOnX, window.innerHeight, "ground")
        .setScale(1, 0.5)
        .refreshBody();
      initialPositionOnX += 250;
    }
    return platforms;
  }

  end() {}

  togglePause(){

    if (this.isPaused){
      this.physics.resume();
      this.isPaused = false;
      this.pauseButton.setText('PAUSE').updateText();
    }
    else{
      this.isPaused = this.physics.pause().isPaused; 
      this.pauseButton.setText('RESUME').updateText();
      
    }
    
  }

  quitGame() {
    this.sound.stopAll();
    this.scene.start("titleScene");
  }
}

export default GameScene;