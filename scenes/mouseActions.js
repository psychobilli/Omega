class mouseActions extends Phaser.Scene {
    
    constructor() {
        console.log('mouseActions constructor');
        super({ key: 'mouseActions', active: false });
        this.square;
        this.penta;
        this.hex;
        this.state = 0;
    }

    preload() {
        console.log('mouseActions preload');
        this.load.image('exit','assets/images/Exit.png');
    }

    create() {
        console.log('mouseActions create');
        const exit = this.add.image(1000, 100, 'exit');
        exit.setInteractive();
        exit.on('pointerup', this.exitGame, this);
        
        var data = [ -20,-20, -20,20, 20,20, 20,-20 ];
        this.square = new Phaser.GameObjects.Polygon(this, 100, 100, data, 0x6f66ff);
        this.add.existing(this.square);
        this.square.setInteractive();
        this.square.on('pointerup', this.clickListener, this);

        var data2 = [ 12,20, 20,-4, 0,-20, -20,-4, -12,20 ];
        this.penta = new Phaser.GameObjects.Polygon(this, 100, 100, data2, 0x6666ff);
        this.add.existing(this.penta);
        this.penta.setVisible(false);
        this.penta.setInteractive();
        this.penta.on('pointerup', this.clickListener, this);

        var data3 = [ 20,9, 20,-9, 0,-20, -20,-9, -20,9, 0,20 ];
        this.hex = new Phaser.GameObjects.Polygon(this, 100, 100, data3, 0x6666ff);
        this.add.existing(this.hex);
        this.hex.setVisible(false);
        this.hex.setInteractive();
        this.hex.on('pointerup', this.clickListener, this);
    }

    update() {

    }

    clickListener() {
        console.log('clickListener state: ' + this.state);
        if (this.state == 0) {
            this.square.setVisible(false);
            this.penta.setVisible(true);
        } else if (this.state == 1) {
            this.penta.setVisible(false);
            this.hex.setVisible(true);
        } else if (this.state == 2) {
            this.hex.setVisible(false);
            this.square.setVisible(true);
        }
        this.state++;
        if (this.state > 2)
            this.state = 0;
    }

    exitGame() {
        this.scene.start('titleScene');
    }
}