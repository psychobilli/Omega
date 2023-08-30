class ImageLoader {

    constructor() {
        throw Error('A static class cannot be instantiated');
    }

    static images;
    static locations;

    static initialize() {
        this.images = new Map();
        this.locations = new Map();
        
        var clickImage = ['assets/images/ClickBox01.png','assets/images/ClickBox02.png','assets/images/ClickBox03.png'];
        ImageLoader.images.set('clickListener', clickImage);
        var clickImageLocation = [[150, 150],[150, 150],[150, 150]];
        ImageLoader.locations.set('clickListener', clickImageLocation);
    }

    static getImage(identifier, index) {
        if (this.images === undefined)
            this.initialize();
        var imageArray = this.images.get(identifier);
        return imageArray[index];
    }

    static getLocation(identifier, index) {
        if (this.locations === undefined)
            this.initialize();
        return this.locations.get(identifier)[index];
    }
}