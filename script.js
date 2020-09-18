import TitleScene from './classes/TitleScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';
import HelpScene from './classes/HelpScene.js';

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

/*
    Game Scene
*/
var gameScene = new GameScene();
var titleScene = new TitleScene();
var gameOverScene = new GameOverScene();
var helpScene = new HelpScene();

var game = new Phaser.Game(config);
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);
game.scene.add("gameOver", gameOverScene);
game.scene.add("helpScene", helpScene);

// Start Title Scene
game.scene.start('titleScene');
