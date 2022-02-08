class Monster {

    constructor() {
        this.sprite;
        this.beat;
    }

    preload(main) {
        main.load.spritesheet('monster', 'assets/images/Monster.png', { frameWidth: 50, frameHeight: 60 });
    }

    create(main) {
        this._sprite = main.physics.add.sprite(600,400,'monster');
        this._beat = 0;

        main.anims.create({
            key: 'monsterleft',
            frames: main.anims.generateFrameNumbers('monster', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        main.anims.create({
            key: 'monsterturn',
            frames: [ { key: 'monster', frame: 0 } ],
            frameRate: 10
        });

        main.anims.create({
            key: 'monsterright',
            frames: main.anims.generateFrameNumbers('monster', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        main.anims.create({
            key: 'monsterupDown',
            frames: main.anims.generateFrameNumbers('monster', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this._beat == 0) {
            var min = Math.ceil(0);
            var max = Math.floor(4);
            var next = Math.floor(Math.random() * (max - min) + min);
            switch (next) {
                case 0:
                    this._sprite.setVelocityX(-160);
                    this._sprite.setVelocityY(0);

                    this._sprite.anims.play('monsterleft', true);
                    break;
                case 1:
                    this._sprite.setVelocityX(160);
                    this._sprite.setVelocityY(0);

                    this._sprite.anims.playReverse('monsterright', true);
                    break;
                case 2:
                    this._sprite.setVelocityX(0);
                    this._sprite.setVelocityY(160);

                    this._sprite.anims.play('monsterupDown', true);
                    break;
                case 3:
                    this._sprite.setVelocityX(0);
                    this._sprite.setVelocityY(-160);

                    this._sprite.anims.playReverse('monsterupDown', true);
                    break;
                default:
                    break;
            }
        }
        this._beat++;
        if (this._beat > 30)
            this._beat = 0;
    }

    get sprite() {
        return this._sprite;
    }
}