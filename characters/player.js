class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y,'stickMan');
        this.face = 3;
        this.health = 10;
        this.sideStrike;
        this.vertStrike;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    preload(main) {

    }

    create(main) {
        this._sideStrike = main.physics.add.sprite(600,400,'sideAttack', 1);
        this._vertStrike = main.physics.add.sprite(600,400,'vertAttack', 1);

        main.anims.create({
            key: 'left',
            frames: main.anims.generateFrameNumbers('stickMan', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        main.anims.create({
            key: 'turn',
            frames: [ { key: 'stickMan', frame: 3 } ],
            frameRate: 20
        });

        main.anims.create({
            key: 'right',
            frames: main.anims.generateFrameNumbers('stickMan', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        main.anims.create({
            key: 'upDown',
            frames: main.anims.generateFrameNumbers('stickMan', { start: 2, end: 4, first: 3 }),
            frameRate: 10,
            repeat: -1
        });

        main.anims.create({
            key: 'leftAtt',
            frames: main.anims.generateFrameNumbers('sideAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        main.anims.create({
            key: 'rightAtt',
            frames: main.anims.generateFrameNumbers('sideAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        main.anims.create({
            key: 'upAtt',
            frames: main.anims.generateFrameNumbers('vertAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        main.anims.create({
            key: 'downAtt',
            frames: main.anims.generateFrameNumbers('vertAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });
    }

    update(cursors) {
        if (cursors.left.isDown)
        {
            this._face = 0;
            this.setVelocityX(-160);
            this.setVelocityY(0);

            this.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this._face = 1;
            this.setVelocityX(160);
            this.setVelocityY(0);

            this.anims.play('right', true);
        }
        else if (cursors.up.isDown)
        {
            this._face = 2;
            this.setVelocityX(0);
            this.setVelocityY(-160);

            this.anims.play('upDown',true);
        }
        else if (cursors.down.isDown)
        {
            this._face = 3;
            this.setVelocityX(0);
            this.setVelocityY(160);

            this.anims.play('upDown',true);
        } 
        else
        {
            this.setVelocityX(0);
            this.setVelocityY(0);

            this.anims.play('turn');
        }

        if (cursors.space.isDown) 
        {
            switch(this._face) 
            {
                case 0:
                    this._sideStrike.setPosition(this.x - 20, this.y);
                    this._sideStrike.anims.play('leftAtt');
                    break;
                case 1:
                    this._sideStrike.setPosition(this.x + 20, this.y);
                    this._sideStrike.anims.play('rightAtt');
                    break;
                case 2:
                    this._vertStrike.setPosition(this.x, this.y - 40);
                    this._vertStrike.anims.play('upAtt');
                    break;
                case 3:
                    this._vertStrike.setPosition(this.x, this.y + 40);
                    this._vertStrike.anims.play('downAtt');
                    break;
            }
        }
    }

    dealDamage(damage) {
        if (this.health > 0) {
            this.health = this.health - damage;
            console.log('You have taken damage. Health: ' + this.health);
        }
        if (this.health == 0) {
            this.health--;
            console.log('You are dead.');
        }
    }
}