class titleScene extends Phaser.Scene {

    constructor() {
        super({ key: 'titleScene', active: true });
    }

    preload() {
        this.load.image('background','assets/images/Start.png');
    }

    create() {
        this.add.text(100, 64, 'Stick Man',  { font: "32px Arial" });
        this.add.text(100, 96, 'The Ultimate Evil',  { font: "24px Arial" });
        const start = this.add.image(500, 250, 'background');
        start.setInteractive().on('pointerup', this.startGame, this);
    }

    startGame() {
        this.scene.start('gameScene');
    }

}