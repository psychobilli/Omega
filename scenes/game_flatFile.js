class gameScene_flatFile extends Phaser.Scene {

    constructor() {
        console.log('gameScene_fileFile constructor');
        super({ key: 'gameScene_flatFile', active: false });
        this.player;
        this.monster;
        this.rock;
        this.cursors;
        this.walls;

        // player
        this.player_sprite;
        this.face = 3;
        this.sideStrike;
        this.vertStrike;
        this.health = 10;

        // monster
        this.monster_sprite;
        this.beat;
        this.damagePoints = 1;

        // action object
        this.object_image;
        this.physicsImage;
        this.lastCursor;
    }

    preload()
    {
        console.log('gameScene_flatFile Preload');
        this.load.image('forest','assets/images/forest.png');
        
        // Player preload
        this.load.spritesheet('stickMan', 'assets/images/StickMan.png', { frameWidth: 50, frameHeight: 60 });
        this.load.spritesheet('sideAttack', 'assets/images/SideAttack.png', { frameWidth: 100, frameHeight: 60 });
        this.load.spritesheet('vertAttack', 'assets/images/VertAttack.png', { frameWidth: 50, frameHeight: 120 });

        // Monster preload
        this.load.spritesheet('monster', 'assets/images/Monster.png', { frameWidth: 50, frameHeight: 60 });

        // Action Object preload
        this._object_image = this.load.image('image','assets/images/rock.png');

        this.load.image('exit','assets/images/Exit.png');
    }

    create()
    {
        console.log('gameScene_flatFile Create');
        this.add.image(600,400,'forest');
        this._walls = this.physics.add.staticGroup();
        this._walls.create(300,400).setScale(0,50).refreshBody();
        this._walls.create(900,400).setScale(0,50).refreshBody();

        // Player create
        this._player_sprite = this.physics.add.sprite(600,400,'stickMan');
        this._sideStrike = this.physics.add.sprite(600,400,'sideAttack', 1);
        this._vertStrike = this.physics.add.sprite(600,400,'vertAttack', 1);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('stickMan', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'stickMan', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('stickMan', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'upDown',
            frames: this.anims.generateFrameNumbers('stickMan', { start: 2, end: 4, first: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftAtt',
            frames: this.anims.generateFrameNumbers('sideAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'rightAtt',
            frames: this.anims.generateFrameNumbers('sideAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'upAtt',
            frames: this.anims.generateFrameNumbers('vertAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'downAtt',
            frames: this.anims.generateFrameNumbers('vertAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        //Monster create
        this._monster_sprite = this.physics.add.sprite(800,100,'monster');
        this._beat = 0;

        this.anims.create({
            key: 'monsterleft',
            frames: this.anims.generateFrameNumbers('monster', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'monsterturn',
            frames: [ { key: 'monster', frame: 0 } ],
            frameRate: 10
        });

        this.anims.create({
            key: 'monsterright',
            frames: this.anims.generateFrameNumbers('monster', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'monsterupDown',
            frames: this.anims.generateFrameNumbers('monster', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this._cursors = this.input.keyboard.createCursorKeys();

        // Action Object create
        this._physicsImage = this.physics.add.image(600,200,'image'); 
        this.physics.add.collider(this._player_sprite, this._physicsImage, this.object_push, this.object_detect, this);
        this._physicsImage.setDrag(1000,1000);

        this.physics.add.collider(this._object_image.image, this._walls);
        this.physics.add.collider(this._player_sprite, this._walls);
        this.physics.add.collider(this._monster_sprite, this._walls);
        this._monster_sprite.setCollideWorldBounds(true);
        
        const exit = this.add.image(1000, 100, 'exit');
        exit.setInteractive();
        exit.on('pointerup', this.exitGame, this);
    }

    update()
    {
        console.log('gameScene Update');
        // Player update
        if (this._cursors.left.isDown)
        {
            this._face = 0;
            this._player_sprite.setVelocityX(-160);
            this._player_sprite.setVelocityY(0);

            this._player_sprite.anims.play('left', true);
        }
        else if (this._cursors.right.isDown)
        {
            this._face = 1;
            this._player_sprite.setVelocityX(160);
            this._player_sprite.setVelocityY(0);

            this._player_sprite.anims.play('right', true);
        }
        else if (this._cursors.up.isDown)
        {
            this._face = 2;
            this._player_sprite.setVelocityX(0);
            this._player_sprite.setVelocityY(-160);

            this._player_sprite.anims.play('upDown',true);
        }
        else if (this._cursors.down.isDown)
        {
            this._face = 3;
            this._player_sprite.setVelocityX(0);
            this._player_sprite.setVelocityY(160);

            this._player_sprite.anims.play('upDown',true);
        } 
        else
        {
            this._player_sprite.setVelocityX(0);
            this._player_sprite.setVelocityY(0);

            this._player_sprite.anims.play('turn');
        }

        if (this._cursors.space.isDown) 
        {
            switch(this._face) 
            {
                case 0:
                    this._sideStrike.setPosition(this._player_sprite.x - 20, this._player_sprite.y);
                    this._sideStrike.anims.play('leftAtt');
                    break;
                case 1:
                    this._sideStrike.setPosition(this._player_sprite.x + 20, this._player_sprite.y);
                    this._sideStrike.anims.play('rightAtt');
                    break;
                case 2:
                    this._vertStrike.setPosition(this._player_sprite.x, this._player_sprite.y - 40);
                    this._vertStrike.anims.play('upAtt');
                    break;
                case 3:
                    this._vertStrike.setPosition(this._player_sprite.x, this._player_sprite.y + 40);
                    this._vertStrike.anims.play('downAtt');
                    break;
            }
        }

        //Monster update
        if (this._beat == 0) {
            var min = Math.ceil(0);
            var max = Math.floor(4);
            var next = Math.floor(Math.random() * (max - min) + min);
            switch (next) {
                case 0:
                    this._monster_sprite.setVelocityX(-160);
                    this._monster_sprite.setVelocityY(0);

                    this._monster_sprite.anims.play('monsterleft', true);
                    break;
                case 1:
                    this._monster_sprite.setVelocityX(160);
                    this._monster_sprite.setVelocityY(0);

                    this._monster_sprite.anims.playReverse('monsterright', true);
                    break;
                case 2:
                    this._monster_sprite.setVelocityX(0);
                    this._monster_sprite.setVelocityY(160);

                    this._monster_sprite.anims.play('monsterupDown', true);
                    break;
                case 3:
                    this._monster_sprite.setVelocityX(0);
                    this._monster_sprite.setVelocityY(-160);

                    this._monster_sprite.anims.playReverse('monsterupDown', true);
                    break;
                default:
                    break;
            }
        }
        this._beat++;
        if (this._beat > 30)
            this._beat = 0;
    }

    object_push() {
        console.log('collision detected');
        if (this._cursors.left.isDown && (this._lastCursor == 0 || this._lastCursor == 1))
        {
            this._lastCursor = 1;
            this._physicsImage.setVelocityX(-160);
            this._physicsImage.setVelocityY(0);
        }
        else if (this._cursors.right.isDown && (this._lastCursor == 0 || this._lastCursor == 2))
        {
            this._lastCursor = 2;
            this._physicsImage.setVelocityX(160);
            this._physicsImage.setVelocityY(0);
        }
        else if (this._cursors.up.isDown && (this._lastCursor == 0 || this._lastCursor == 3))
        {
            this._lastCursor = 3;
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(-160);
        }
        else if (this._cursors.down.isDown && (this._lastCursor == 0 || this._lastCursor == 4))
        {
            this._lastCursor = 4;
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(160);
        } 
        else
        {
            this._lastCursor = 0;
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(0);
        }
    }

    object_detect() {
        // can be used for additional checks before performing an interaction.
        // return false to block the action.
        // can't think of a use case for this.
        return true;
    }

    exitGame() {
        this.scene.start('titleScene');
    }

}