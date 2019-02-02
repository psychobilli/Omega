class gameScene extends Phaser.Scene {

    constructor() {
        console.log('gameScene constructor');
        super({ key: 'gameScene', active: false });
        this.player;
        this.rock;
        this.cursors;
        this.wall1;
        this.wall2;
    }

    preload()
    {
        console.log('gameScene Preload');
        this._player = new Player();
        this.load.image('forest','assets/images/forest.png');
        this._player.preload(this);
        this.load.image('wall',null);
        this.load.image('rock','assets/images/rock.png');
        this.load.image('exit','assets/images/Exit.png');
    }

    create()
    {
        console.log('gameScene Create');
        this.add.image(600,400,'forest');
        //this.matter.add.image(0, 300, 'block')
        this._rock = this.matter.add.image(600,200,'rock');
        //this._walls = this.matter.add.staticGroup();
        this._wall1 = this.matter.add.image(300,400, 'wall', null, { isStatic: true }).setScale(0,50);
        this._wall2 = this.matter.add.image(900,400, 'wall', null, { isStatic: true }).setScale(0,50);

        this._player.create(this);

        this._cursors = this.input.keyboard.createCursorKeys();

        //this.matter.add.collider(this._player.sprite, this._rock);
        // this._rock.setFrictionX(100);
        // this.matter.add.collider(this._player.sprite, this._walls);
        // this.matter.add.collider(this._rock, this._walls);

        const exit = this.add.image(1000, 100, 'exit');
        exit.setInteractive().on('pointerup', this.exitGame, this);
    }

    update()
    {
        console.log('gameScene update');
        this._player.update(this._cursors);
    }

    exitGame() {
        this.scene.start('titleScene');
        this.scene.stop('gameScene');
    }

    pushObject(event) {
        
    }

}