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
    noun.addComponent(Sprite());
    noun.addComponent(Position({x: spec.x, y: spec.y}));
    noun.addComponent(Noun({nounType: nounTypesEnum.WALL}));
    noun.addComponent(Text({textType: spec.textType}));

    return noun;
}

export function createVerb() {
    let verb = Entity();

    // TODO: We need to pass in the specs for spriteSheet and spriteWidth
    verb.addComponent(Sprite());
    verb.addComponent(Position({x: spec.x, y: spec.y}));
    verb.addComponent(Noun({nounType: nounTypesEnum.WALL}));
    verb.addComponent(Text({textType: textTypesEnum.VERB}));

    return verb;
}