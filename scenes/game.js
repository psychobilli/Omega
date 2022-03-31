class gameScene extends Phaser.Scene {

    constructor() {
        console.log('gameScene constructor');
        super({ key: 'gameScene', active: false });
        this.player;
        this.monster;
        this.rock;
        this.cursors;
        this.walls;
        this.sprites;
    }

    preload()
    {
        console.log('gameScene Preload');
        Player.preload(this);
        Monster.preload(this);
        this.load.image('forest','assets/images/forest.png');

        this._rock = new ActionObject();
        this._rock.preload(this, 'assets/images/rock.png');

        this.load.image('exit','assets/images/Exit.png');
    }

    create()
    {
        console.log('gameScene Create');
        this.sprites = [];
        this.add.image(600,400,'forest');
        this._rock.create(600, 200); 
        this._walls = this.physics.add.staticGroup();
        this._walls.create(300,400).setScale(0,50).refreshBody();
        this._walls.create(900,400).setScale(0,50).refreshBody();

        this._player = new Player(this, 600,400);
        this._monster = new Monster(this, 800,100);
        this._player.create();
        this._monster.create();

        this.sprites.push(this._player);
        for (var i = 0; i < this._player.subSprites.length; i++)
            this.sprites.push(this._player.subSprites[i]);
        this.sprites.push(this._monster);

        this.defineSpritePhysics();

        this._cursors = this.input.keyboard.createCursorKeys();

        this._rock.addPush(this._player, this._cursors);
        this.physics.add.collider(this._rock.image, this._walls);
        this.physics.add.collider(this._player, this._walls);
        this.physics.add.collider(this._monster, this._walls);
        this._monster.setCollideWorldBounds(true);
        
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

    gameEnd() {
        console.log('gameScene End');
        this._player.destroy();
        
        this.add.text(400, 200, 'You have died.  Evil shall not prevail',  { font: "24px Arial" });
    }

    exitGame() {
        this.scene.start('titleScene');
    }

    defineSpritePhysics() {
        for (var i = 0; i < factionsAtWar.length; i++) {
            this.warringSprites(factionsAtWar[i].factionOne, factionsAtWar[i].factionTwo);
            this.warringSprites(factionsAtWar[i].factionTwo, factionsAtWar[i].factionOne);
        }
    }

    warringSprites(factionOne, factionTwo) {
        for (var j = 0; j < this.sprites.length; j++) {
            if (this.sprites[j].getContactDamage() && this.sprites[j].getFaction() == factionOne) {
                for (var k = 0; k < this.sprites.length; k++) {
                    if (this.sprites[k].getFaction() == factionTwo) {
                        var spriteOne = this.sprites[j];
                        var spriteTwo = this.sprites[k];
                        this.physics.add.overlap(spriteOne, spriteTwo,
                            function(_spriteOne, _spriteTwo) {
                                _spriteTwo.dealDamage(_spriteOne.damagePoints);
                            });
                    }
                }
            }
        }
    }
}