class titleScene extends Phaser.Scene {

    constructor() {
        console.log('titleScene constructor');
        super({ key: 'titleScene', active: true });
    }

    preload() {
        console.log('titleScene preload');
        this.load.image('start','assets/images/Start.png');
        this.load.image('startFlat','assets/images/Start_Flat.png');
        this.load.image('mouseActions','assets/images/MouseActions.png');
    }

    create() {
        console.log('titleScene create');
        this.add.text(100, 64, 'Stick Man',  { font: "32px Arial" });
        this.add.text(100, 96, 'The Ultimate Evil',  { font: "24px Arial" });
        const start = this.add.image(500, 250, 'start');
        start.setInteractive();
        start.on('pointerup', this.startGame, this);
        const startFlat = this.add.image(500,350, 'startFlat');
        startFlat.setInteractive();
        startFlat.on('pointerup',this.startFlat, this);
        const startMouse = this.add.image(500,450, 'mouseActions');
        startMouse.setInteractive();
        startMouse.on('pointerup',this.startMouse, this);
    }

    startGame() {
        this.scene.start('gameScene');
    }

    startFlat() {
        this.scene.start('gameScene_flatFile');
    }

    startMouse() {
        this.scene.start('mouseActions');
    }

}