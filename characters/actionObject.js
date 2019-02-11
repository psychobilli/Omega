class ActionObject {

    constructor() {
        this.main;
        this.image;
        this.physicsImage;
        this.cursors;
    }

    preload(main, imagePath) {
        this._main = main;
        this._image = main.load.image('image',imagePath);
    }

    create(x, y) {
        this._physicsImage = this._main.physics.add.image(x,y,'image');
    }

    addPush(playerSprite, cursors) {
        this._main.physics.add.collider(playerSprite, this._physicsImage, this.push, null, this);
        this._physicsImage.setDrag(100,100);
        this._cursors = cursors;
    }

    update() {

    }

    push() {
        console.log('collision detected');
        if (this._cursors.left.isDown)
        {
            this._physicsImage.setVelocityX(-160);
            this._physicsImage.setVelocityY(0);
        }
        else if (this._cursors.right.isDown)
        {
            this._physicsImage.setVelocityX(160);
            this._physicsImage.setVelocityY(0);
        }
        else if (this._cursors.up.isDown)
        {
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(-160);
        }
        else if (this._cursors.down.isDown)
        {
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(160);
        } 
        else
        {
            this._physicsImage.setVelocityX(0);
            this._physicsImage.setVelocityY(0);
        }
    }

    get image() {
        return this._image;
    }
}