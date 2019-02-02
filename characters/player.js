class Player {

    constructor() {
        this.sprite;
        this.face = 3;
        this.sideStrike;
        this.vertStrike;
    }

    preload(main) {
        main.load.spritesheet('stickMan', 'assets/images/StickMan.png', { frameWidth: 50, frameHeight: 60 });
        main.load.spritesheet('sideAttack', 'assets/images/SideAttack.png', { frameWidth: 100, frameHeight: 60 });
        main.load.spritesheet('vertAttack', 'assets/images/VertAttack.png', { frameWidth: 50, frameHeight: 120 });
    }

    create(main) {
        this._sprite = main.matter.add.sprite(600,400,'stickMan');
        this._sideStrike = main.matter.add.sprite(600,400,'sideAttack', 1);
        this._vertStrike = main.matter.add.sprite(600,400,'vertAttack', 1);

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
                this._sprite.setVelocityX(-16);
                this._sprite.setVelocityY(0);

                this._sprite.anims.play('left', true);
            }
            else if (cursors.right.isDown)
            {
                this._face = 1;
                this._sprite.setVelocityX(16);
                this._sprite.setVelocityY(0);

                this._sprite.anims.play('right', true);
            }
            else if (cursors.up.isDown)
            {
                this._face = 2;
                this._sprite.setVelocityX(0);
                this._sprite.setVelocityY(-16);

                this._sprite.anims.play('upDown',true);
            }
            else if (cursors.down.isDown)
            {
                this._face = 3;
                this._sprite.setVelocityX(0);
                this._sprite.setVelocityY(16);

                this._sprite.anims.play('upDown',true);
            } 
            else
            {
                this._sprite.setVelocityX(0);
                this._sprite.setVelocityY(0);

                this._sprite.anims.play('turn');
            }

            if (cursors.space.isDown) 
            {
                switch(this._face) 
                {
                    case 0:
                        this._sideStrike.setPosition(this._sprite.x - 20, this._sprite.y);
                        this._sideStrike.anims.play('leftAtt');
                        break;
                    case 1:
                        this._sideStrike.setPosition(this._sprite.x + 20, this._sprite.y);
                        this._sideStrike.anims.play('rightAtt');
                        break;
                    case 2:
                        this._vertStrike.setPosition(this._sprite.x, this._sprite.y - 40);
                        this._vertStrike.anims.play('upAtt');
                        break;
                    case 3:
                        this._vertStrike.setPosition(this._sprite.x, this._sprite.y + 40);
                        this._vertStrike.anims.play('downAtt');
                        break;
                }
            }
    }

    get sprite() {
        return this._sprite;
    }

    get position() {
        return this._sprite.position();
    }
}