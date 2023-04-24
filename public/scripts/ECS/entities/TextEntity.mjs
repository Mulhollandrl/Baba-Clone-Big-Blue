import { Entity } from "./Entity.mjs";
import { Sprite } from "../components/Sprite.mjs";
import { Position } from "../components/Position.mjs";
import { Noun } from "../components/Noun.mjs";
import { Text } from "../components/Text.mjs";
import { nounTypesEnum } from "../../state/enums.mjs"
import { textTypesEnum } from "../../state/enums.mjs"

export function createNoun(spec) {
    let noun = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    noun.addComponent(Sprite({spriteSheet: spec.spriteSheet, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    noun.addComponent(Position({x: spec.x, y: spec.y}));
    noun.addComponent(Noun({nounType: nounTypesEnum.TEXT}));
    noun.addComponent(Text({textType: spec.textType, wordType: spec.wordType}));

    return noun;
}

export function createVerb(spec) {
    let verb = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    verb.addComponent(Sprite({spriteSheet: spec.spriteSheet, spriteWidth: 24, spriteIndex: 0, maxSpriteIndex: 3}));
    verb.addComponent(Position({x: spec.x, y: spec.y}));
    verb.addComponent(Noun({nounType: nounTypesEnum.TEXT}));
    verb.addComponent(Text({textType: textTypesEnum.VERB}));

    return verb;
}