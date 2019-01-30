class gameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'gameScene', active: true });
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
    }

    update()
    {
        this._player.update(this._cursors);
    }

}