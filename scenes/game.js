class gameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene', active: false });
        this.player;
        this.cursors;
        this.walls;
    }

    preload()
    {
        this._player = new Player();
        this.load.image('forest','assets/images/forest.png');
        this._player.preload(this);
        this.load.image('wall',null);
        this.load.image('exit','assets/images/Exit.png');
    }

    create()
    {
        this.add.image(600,400,'forest');
        this._walls = this.physics.add.staticGroup();
        this._walls.create(300,400, 'wall').setScale(0,50).refreshBody();
        this._walls.create(900,400, 'wall').setScale(0,50).refreshBody();

        this._player.create(this);

        this._cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this._player.sprite, this._walls);

        const exit = this.add.image(1000, 100, 'exit');
        exit.setInteractive();
        exit.on('pointerup', this.exitGame, this);
    }

    update()
    {
        this._player.update(this._cursors);
    }

    exitGame() {
        this.scene.start('titleScene');
    }

}