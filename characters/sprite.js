class Sprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.faction = factionsEnum.NEUTRAL;
        this.damageOnContact = false;
        this.damagePoints = 0;
        this.subSprites = [];
    }

    setFaction(factionsEnum) {
        this.faction = factionsEnum;
    }

    getFaction() {
        return this.faction;
    }

    setContactDamage(toggle) {
        this.damageOnContact = toggle;
    }

    getContactDamage() {
        return this.damageOnContact;
    }

    dealDamage() {

    }
}