class TitleScene extends Phaser.Scene {
  theme;
  soundToggle;
  constructor() {
    super({ key: "titleScene" });
  }

  preload() {
    this.load.image("background", "assets/backgrounds/bg_a.jpg");
    this.load.audio("theme", ["assets/audio/theme.mp3"]);
    
  }

  create() {
    var bg = this.add.sprite(0, 0, "background").setScale(1);
    bg.setOrigin(0, 0);
    bg.displayWidth = window.innerWidth;
    bg.displayHeight = window.innerHeight;

    const screenCenterX =
        this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
        this.cameras.main.worldView.y + this.cameras.main.height / 2;

    var titleText = this.add.text(
      screenCenterX,
      screenCenterY,
      "The Adventures of Bob",
      {
        fontSize: "60px",
        fill: "#000",
        fontFamily: "Courier",
        fontWeight: "bold",
        stroke: "#fff",
        strokeThickness: 5,
        fontWeight:'bold'
      }
    ).setOrigin(0.5, 2);
    titleText.setShadow(-2, 9, "rgba(255,255,255,.5)", 0);

    // Start Button
    var startBtn = this.add
      .text(screenCenterX, screenCenterY, "START", {
        fontSize: "42px",
        fill: "#fff",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 2,
      })
      .setOrigin(0.5);
    startBtn.inputEnabled = true;
    startBtn.setInteractive({ useHandCursor: true });
    startBtn.on("pointerdown", () => this.clickButton());

    // Help Button
    var helpBtn = this.add
      .text(screenCenterX, screenCenterY, "HELP", {
        fontSize: "42px",
        fill: "#fff",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 2,
      })
      .setOrigin(0.5, -0.5);
    helpBtn.inputEnabled = true;
    helpBtn.setInteractive({ useHandCursor: true });
    helpBtn.on("pointerdown", () => this.gotoHelp());

    // High Score Button
    var highScoreBtn= this.add
      .text(screenCenterX, 40, `High Score : ${localStorage.getItem('high_score') ? localStorage.getItem('high_score') : 0}`, {
        fontSize: "36px",
        fill: "white",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 1,
      })
      .setOrigin(0.5, 0.5);
    highScoreBtn.inputEnabled = true;

    this.soundToggle= this.add
      .text(screenCenterX, screenCenterY, `SOUND:${localStorage.getItem('sound_setting')==='OFF'?'OFF':'ON'}`, {
        fontSize: "42px",
        fill: "#fff",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 2,
      })
      .setOrigin(0.5, -1.6);
    this.soundToggle.inputEnabled = true;
    this.soundToggle.setInteractive({ useHandCursor: true });
    this.soundToggle.on("pointerdown", () => this.toggleSound());

    // Credits
    var credits = this.add
      .text(screenCenterX, window.innerHeight - 20, "Developed with ❤️ By Kaustubh Saxena", {
        fontSize: "22px",
        fill: "white",
        fontFamily: "Courier",
        stroke: "#fff",
      })
      .setOrigin(0.5, 1);
    credits.inputEnabled = true;
    credits.setInteractive({ useHandCursor: true });
    credits.on("pointerdown", () => this.gotoCredits());

    
    /*
      Theme
    */
    this.theme = this.sound.add("theme");
    this.theme.allowMultiple = true;
    if (!localStorage.getItem('sound_setting') || localStorage.getItem('sound_setting')==='ON'){
      this.theme.play({ loop: true });
    }

  }

  clickButton() {
    console.log('*** Transitioning to Screen 2***');
    // Settings
    let sound = localStorage.getItem('sound_setting')==='OFF' ? false:true;
    this.scene.start("gameScene", { sound: sound});
  }

  gotoHelp() {
    console.log('*** Transitioning to Screen 3***');
    this.scene.start("helpScene")
  }

  toggleSound(){
    if (localStorage.getItem('sound_setting') === 'OFF'){
      localStorage.setItem('sound_setting', 'ON');
      this.soundToggle.setText('SOUND : ON').updateText();
      this.theme.resume();
    }
    else{
      localStorage.setItem('sound_setting', 'OFF');
      this.soundToggle.setText('SOUND : OFF').updateText();
      this.theme.pause();
    }
  }

  gotoCredits(){
    window.open('https://www.kaustubh.dev','_blank')
  }
}

export default TitleScene;