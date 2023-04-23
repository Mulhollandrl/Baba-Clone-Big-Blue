import { Entity } from "./Entity.mjs";
import { Sprite } from "../components/Sprite.mjs";
import { Position } from "../components/Position.mjs";
import { Noun } from "../components/Noun.mjs";
import { nounTypesEnum } from "../../state/enums.mjs"

export function createBigBlue(spec) {
    let bigBlue = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    bigBlue.addComponent(Sprite({spriteSheet: 'assets/objects/babaPlayerSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    bigBlue.addComponent(Position({x: spec.x, y: spec.y}));
    bigBlue.addComponent(Noun({nounType: nounTypesEnum.BIGBLUE}));

    return bigBlue;
}

export function createWall(spec) {
    let wall = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    wall.addComponent(Sprite({spriteSheet: 'assets/objects/wallObjectSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    wall.addComponent(Position({x: spec.x, y: spec.y}));
    wall.addComponent(Noun({nounType: nounTypesEnum.WALL}));

    return wall;
}

export function createFlag(spec) {
    let flag = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    flag.addComponent(Sprite({spriteSheet: 'assets/objects/flagObjectSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    flag.addComponent(Position({x: spec.x, y: spec.y}));
    flag.addComponent(Noun({nounType: nounTypesEnum.FLAG}));

    return flag;
}

export function createRock(spec) {
    let rock = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    rock.addComponent(Sprite({spriteSheet: 'assets/objects/rockObjectSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    rock.addComponent(Position({x: spec.x, y: spec.y}));
    rock.addComponent(Noun({nounType: nounTypesEnum.ROCK}));

    return rock;
}

export function createLava(spec) {
    let lava = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    lava.addComponent(Sprite({spriteSheet: 'assets/objects/lavaObjectSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    lava.addComponent(Position({x: spec.x, y: spec.y}));
    lava.addComponent(Noun({nounType: nounTypesEnum.LAVA}));

    return lava;
}

export function createWater(spec) {
    let water = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    water.addComponent(Sprite({spriteSheet: 'assets/objects/waterObjectSprites.png', spriteWidth: 26, spriteIndex: 0, maxSpriteIndex: 3}));
    water.addComponent(Position({x: spec.x, y: spec.y}));
    water.addComponent(Noun({nounType: nounTypesEnum.WATER}));

    return water;
}