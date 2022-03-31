class WarringFactions {
    constructor(factionOne, factionTwo) {
        this.factionOne = factionOne;
        this.factionTwo = factionTwo;
    }
}

const factionsEnum = {
    PLAYER: 0,
    NEUTRAL: 1,
    MONSTER: 2
}

const factionsAtWar = [
    new WarringFactions(factionsEnum.PLAYER, factionsEnum.MONSTER)
];