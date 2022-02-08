class gameScene extends Phaser.Scene {

    constructor() {
        console.log('gameScene constructor');
        super({ key: 'gameScene', active: false });
        this.player;
        this.monster;
        this.rock;
        this.cursors;
        this.walls;
    }

    preload()
    {
        console.log('gameScene Preload');
        this._player = new Player();
        this._monster = new Monster();
        this.load.image('forest','assets/images/forest.png');
        
        this._player.preload(this);
        this._monster.preload(this);

        this._rock = new ActionObject();
        this._rock.preload(this, 'assets/images/rock.png');

        this.load.image('exit','assets/images/Exit.png');
    }

    create()
    {
        console.log('gameScene Create');
        this.add.image(600,400,'forest');
        this._rock.create(600, 200); 
        this._walls = this.physics.add.staticGroup();
        this._walls.create(300,400).setScale(0,50).refreshBody();
        this._walls.create(900,400).setScale(0,50).refreshBody();

        this._player.create(this);
        this._monster.create(this);

        this._cursors = this.input.keyboard.createCursorKeys();

        this._rock.addPush(this._player.sprite, this._cursors);
        this.physics.add.collider(this._rock.image, this._walls);
        this.physics.add.collider(this._player.sprite, this._walls);
        this.physics.add.collider(this._monster.sprite, this._walls);
        this._monster.sprite.setCollideWorldBounds(true);
        
        const exit = this.add.image(1000, 100, 'exit');
        exit.setInteractive();
        exit.on('pointerup', this.exitGame, this);
    }

    update()
    {
        console.log('gameScene Update');
        this._player.update(this._cursors);
        this._monster.update();
    }

    exitGame() {
        this.scene.start('titleScene');
    }
}