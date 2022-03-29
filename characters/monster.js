class Monster extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'monster');
        this.scene = scene;
        this.beat;
        this.health = 4;
        this.damagePoints = 1;

        this.stopDamage = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    static preload(scene) {
        scene.load.spritesheet('monster', 'assets/images/Monster.png', { frameWidth: 50, frameHeight: 60 });
    }

    create() {
        this.beat = 0;

        this.scene.anims.create({
            key: 'monsterleft',
            frames: this.scene.anims.generateFrameNumbers('monster', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'monsterturn',
            frames: [ { key: 'monster', frame: 0 } ],
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'monsterright',
            frames: this.scene.anims.generateFrameNumbers('monster', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'monsterupDown',
            frames: this.scene.anims.generateFrameNumbers('monster', { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.beat == 0 && this.health > 0) {
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
        this.beat++;
        if (this.beat > 30 && this.health > 0)
            this.beat = 0;
    }

    dealDamage(damage) {
        if (!this.stopDamage) {
            this.stopDamage = true;
            this.scene.time.delayedCall(600, () => {
                this.justDamaged();
              });
            if (this.health > 0) {
                this.health = this.health - damage;
                console.log('Monster has taken damage. Health: ' + this.health);
            }
            if (this.health == 0) {
                this.health--;
                this.destroy();
            }
        }
    }

    justDamaged() {
        console.log('reactivating damage');
        this.stopDamage = false;
    }
}