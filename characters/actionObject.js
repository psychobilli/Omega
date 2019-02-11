class ActionObject {

    constructor() {
        this.main;
        this.image;
        this.physicsImage;
        this.cursors;
        this.lastCursor;
    }

    preload(main, imagePath) {
        this._main = main;
        this._image = main.load.image('image',imagePath);
    }

    create(x, y) {
        this._physicsImage = this._main.physics.add.image(x,y,'image');
    }

    addPush(playerSprite, cursors) {
        this._main.physics.add.collider(playerSprite, this._physicsImage, this.push, this.detect, this);
        this._physicsImage.setDrag(1000,1000);
        this._cursors = cursors;
    }

    update() {

    }

    push() {
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

    detect() {
        // can be used for additional checks before performing an interaction.
        // return false to block the action.
        // can't think of a use case for this.
        return true;
    }

    get image() {
        return this._image;
    }
}