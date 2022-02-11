class Monster extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'monster');
        this.beat;
        this.damagePoints = 1;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    preload(main) {

    }

    create(main) {
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
                    this.setVelocityX(-160);
                    this.setVelocityY(0);

                    this.anims.play('monsterleft', true);
                    break;
                case 1:
                    this.setVelocityX(160);
                    this.setVelocityY(0);

                    this.anims.playReverse('monsterright', true);
                    break;
                case 2:
                    this.setVelocityX(0);
                    this.setVelocityY(160);

                    this.anims.play('monsterupDown', true);
                    break;
                case 3:
                    this.setVelocityX(0);
                    this.setVelocityY(-160);

                    this.anims.playReverse('monsterupDown', true);
                    break;
                default:
                    break;
            }
        }
        this._beat++;
        if (this._beat > 30)
            this._beat = 0;
    }
}