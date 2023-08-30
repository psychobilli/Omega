class BoundingBoxes {

    constructor() {
        throw Error('A static class cannot be instantiated');
    }

    static boundingBoxes;

    static initialize() {
        this.boundingBoxes = new Map();
        
        var clickShape = [[80, 80, 40, 40],[80, 80, 40, 40],[80, 80, 40, 40]];
        BoundingBoxes.boundingBoxes.set('clickShape', clickShape);
        var clickImage = [[160, 80, 40, 40],[160, 80, 40, 40],[160, 80, 40, 40]];
        BoundingBoxes.boundingBoxes.set('clickImage', clickImage);
    }

    static getBoxes(identifier) {
        if (this.boundingBoxes === undefined)
            this.initialize();
        return this.boundingBoxes.get(identifier);
    }

    static findCenter(number) {
        if (number.length == 4) {
            var x = number[0];
            var y = number[1];
            var width = number[2];
            var height = number[3];
            var coord1 = [x, y];
            var coord2 = [x + width, y];
            var coord3 = [x, y + height];
            var coord4 = [x + width, y + height];
            var slopeNegative = (coord1[1] - coord4[1]) / (coord1[0] - coord4[0]);
            var slopePositive = (coord2[1] - coord3[1]) / (coord2[0] - coord3[0]);
            var yIntNegative = slopeNegative * (0 - coord1[0]) + coord1[1];
            var yIntPositive = slopePositive * (0 - coord2[0]) + coord2[1];

            if (slopeNegative == slopePositive) // lines are parallel
                return 0;
            var intersectx = (yIntPositive - yIntNegative) / (slopeNegative - slopePositive);
            var intersecty = slopePositive * intersectx + yIntPositive;

            return [intersectx, intersecty];
        }
        else 
            return 0;
    }
}