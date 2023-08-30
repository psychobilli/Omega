class Prop {

    scene;
    identifer;
    boundingBoxes;
    image;
    location;
    testMode;
    sequence;
    initialSequence;

    constructor(scene, identifier, testMode = false) {
        this.scene = scene;
        this.identifer = identifier;
        this.testMode = testMode;
    }

    static preload(scene, identifier) {
        scene.load.image(identifier, this.image);
    }

    create() {
        this.boundingBoxes = BoundingBoxes.getBoxes(this.identifer);
        this.image = ImageLoader.getImage(this.identifer, 0);
        this.location = ImageLoader.getLocation(this.identifer, 0);

        this.scene.add.image(this.location, this.identifer);
    }

    update() {
        
    }

    addClickListener() {
        // sets the behaviors on the contact box.
    }
}