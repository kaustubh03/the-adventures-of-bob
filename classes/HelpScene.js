class HelpScene extends Phaser.Scene {
  constructor() {
    super({ key: "helpScene" });
  }

  preload() {
    this.load.image("background", "assets/backgrounds/bg_a.jpg");
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

    // Start Button
    var startBtn = this.add
      .text(screenCenterX, screenCenterY, "Use Arrow keys to Navigate to respective direction. \n Collect all gems to proceed to next level while \n dodging all other lethal objects on the way.", {
        fontSize: "22px",
        fill: "#fff",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 1,
      })
      .setOrigin(0.5);

    // Credits
    var credits = this.add
      .text(screenCenterX, window.innerHeight - 20, "**** All the assets like backgrounds, sound etc are \n sole property of there owners. Got them from Public Domain.\n If any problems please reach out to me @ saxena.kaustubh@rediffmail.com \n or click this text ****", {
        fontSize: "15px",
        fill: "white",
        fontFamily: "Courier",
        stroke: "#fff",
        align:'center'
      })
      .setOrigin(0.5, 1);
    credits.inputEnabled = true;
    credits.setInteractive({ useHandCursor: true });
    credits.on("pointerdown", () => this.gotoCredits());

    var backBtn = this.add
      .text(screenCenterX, 40, `Back to Menu`, {
        fontSize: "36px",
        fill: "white",
        fontFamily: "Courier",
        stroke: "#fff",
        strokeThickness: 1,
      })
      .setOrigin(0.5, 0.5);
    backBtn.inputEnabled = true;
    backBtn.setInteractive({ useHandCursor: true });
    backBtn.on("pointerdown", () => this.gotoMenu());

  }

  gotoMenu () {
    this.sound.stopAll();
    this.scene.start('titleScene');
  }
  gotoCredits(){
    window.open('https://www.kaustubh.dev','_blank')
  }
}

export default HelpScene;