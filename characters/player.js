class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y,'stickMan');
        this.scene = scene;
        this.face = 3;
        this.health = 10;
        this.damagePoints = 2;
        this.healthBoxes = [];
        this.stopDamage = false;
        this.timer;
        this.sideStrike;
        this.vertStrike;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.on('destroy', () => {
            this.removeAllListeners();
        });
    }

    static preload(scene) {
        scene.load.spritesheet('stickMan', 'assets/images/StickMan.png', { frameWidth: 50, frameHeight: 60 });
        scene.load.spritesheet('sideAttack', 'assets/images/SideAttack.png', { frameWidth: 100, frameHeight: 60 });
        scene.load.spritesheet('vertAttack', 'assets/images/VertAttack.png', { frameWidth: 50, frameHeight: 120 });
        scene.load.image('health','assets/images/HealthBox.png');
        scene.load.image('healthEmpty','assets/images/HealthBoxEmpty.png');
    }

    create() {
        this.setupHealthBar();
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('stickMan', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'stickMan', frame: 3 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('stickMan', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'upDown',
            frames: this.scene.anims.generateFrameNumbers('stickMan', { start: 2, end: 4, first: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'leftAtt',
            frames: this.scene.anims.generateFrameNumbers('sideAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'rightAtt',
            frames: this.scene.anims.generateFrameNumbers('sideAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'upAtt',
            frames: this.scene.anims.generateFrameNumbers('vertAttack', { frames: [ 0, 1 ] }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'downAtt',
            frames: this.scene.anims.generateFrameNumbers('vertAttack', { frames: [ 2, 1 ] }),
            frameRate: 10,
            repeat: 0
        });
    }

    update(cursors) {
        if (this.health > 0) {
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
    }

    setupHealthBar() {
        var x = 40;
        var y = 40;
        this.healthBoxes[0] = this.scene.add.image(x, y, 'health');
        for (var i = 1; i < this.health; i++) {
            if (i % 5 == 0) {
                y += 20;
                x = 40;
            } else {
                x += 20;
            }
            this.healthBoxes[i] = this.scene.add.image(x, y, 'health');
        }
        this._sideStrike = this.scene.physics.add.sprite(600,400,'sideAttack', 1);
        this._vertStrike = this.scene.physics.add.sprite(600,400,'vertAttack', 1);
    }

    dealDamage(damage) {
        if (!this.stopDamage) {
            this.stopDamage = true;
            this.scene.time.delayedCall(600, () => {
                this.justDamaged();
              });
            if (this.health > 0) {
                this.health = this.health - damage;
                this.healthBoxes[this.health].setTexture('healthEmpty');
                console.log('You have taken damage. Health: ' + this.health);
            }
            if (this.health == 0) {
                this.health--;
                this.scene.gameEnd();
            }
        }
    }

    justDamaged() {
        console.log('reactivating damage');
        this.stopDamage = false;
    }
}