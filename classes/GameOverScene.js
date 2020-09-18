class GameOverScene extends Phaser.Scene {
  level = 0;
  score = 0;
  constructor() {
    super({ key: "gameOver" });
  }

  init(data){
    if(data){
          this.level = data.level;
          this.score = data.score;
          if (localStorage.getItem('high_score') < data.score || !localStorage.setItem('high_score', data.score)){
            localStorage.setItem('high_score', data.score);
          }
          
    }
  }

  preload() {
    this.load.image("background", "assets/backgrounds/bg.jpg");
  }

  create() {
    var bg = this.add.sprite(0, 0, "background").setScale(1);
    bg.setOrigin(0, 0);
    bg.displayWidth = window.innerWidth;
    bg.displayHeight = window.innerHeight;
    // const screenCenterX = window.innerWidth / 2 - 150;
    // const screenCenterY = window.innerHeight / 2;

    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    
    var titleText = this.add.text(
      screenCenterX,
      screenCenterY,
      "Game Over",
      {
        fontSize: "90px",
        fill: "#000",
        fontFamily: "Courier",
        fontWeight: "extraBold",
        stroke: "#fff",
        strokeThickness: 5,
      }
    ).setOrigin(0.5, 2);
    titleText.setShadow(-2, 9, "rgba(255,255,255,.5)", 0);
      
    var scoreText = this.add
      .text(screenCenterX, screenCenterY, `Your Score : ${this.score}`, {
        fontSize: "56px",
        fill: "Aqua",
        fontFamily: "Courier",
        fontWeight: "extraBold",
        stroke: "#fff",
        strokeThickness: 5,
      }).setOrigin(0.5, 1);
    // scoreText.setShadow(-2, 9, "rgba(255,255,255,.5)", 0);
    
    var levelText = this.add
      .text(screenCenterX, screenCenterY, `Level : ${this.level}`, {
        fontSize: "56px",
        fill: "Aqua",
        fontFamily: "Courier",
        fontWeight: "extraBold",
        stroke: "#fff",
        strokeThickness: 5,
      }).setOrigin(0.5, 0);
    // levelText.setShadow(-2, 9, "rgba(255,255,255,.5)", 0);

    // New Game Button
    var startBtn = this.add.text(
      screenCenterX,
      screenCenterY,
      "New Game",
      {
        fontSize: "56px",
        fill: "Aqua",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 5,
      }
    ).setOrigin(0.5, -5);

    startBtn.setShadow(-2, 3, "rgba(0,0,0,0.5)", 0);
    startBtn.inputEnabled = true;
    startBtn.setInteractive({ useHandCursor: true });
    startBtn.on("pointerdown", () => this.clickButton());
    
  }

  clickButton() {
    console.log('*** Transitioning to Screen 1***');
    this.sound.stopAll();
    this.scene.start("titleScene");
  }
}

export default GameOverScene;