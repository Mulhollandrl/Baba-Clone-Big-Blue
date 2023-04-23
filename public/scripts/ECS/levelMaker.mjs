import { textTypesEnum } from "../state/enums.mjs";
import { currentLevel, levels } from "../state/globals.mjs";
import * as objectEntity from "./entities/ObjectEntity.mjs";
import * as textEntity from "./entities/TextEntity.mjs";

export function levelMaker(entityManager) {
    let level = levels[currentLevel];

    // Go through each of the lines of the level
    for (let i = 0; i < level.height; i++) {
        for (let j = 0; j < level.width; j++) {
            // Check for all background entities
            switch (level.background[(i * level.width) + j]){
                case 'w':
                    entityManager.addEntity(objectEntity.createWall({x: j, y: i}));
                    break;
                case 'r':
                    entityManager.addEntity(objectEntity.createRock({x: j, y: i}));
                    break;
                case 'f':
                    entityManager.addEntity(objectEntity.createFlag({x: j, y: i}));
                    break;
                case 'b':
                    entityManager.addEntity(objectEntity.createBigBlue({x: j, y: i}));
                    break;
                case 'l':
                    entityManager.addEntity(objectEntity.createFloor({x: j, y: i}));
                    break;
                case 'g':
                    entityManager.addEntity(objectEntity.createGrass({x: j, y: i}));
                    break;
                case 'a':
                    entityManager.addEntity(objectEntity.createWater({x: j, y: i}));
                    break;
                case 'v':
                    entityManager.addEntity(objectEntity.createLava({x: j, y: i}));
                    break;
                case 'h':
                    entityManager.addEntity(objectEntity.createHedge({x: j, y: i}))
                    break;
                case ' ':
                    break;
            }

            // Check for all foreground entities
            switch (level.foreground[(i * level.width) + j]){
                case 'W':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/wallWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'R':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/rockWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'F':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/flagWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'B':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/babaWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'V':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/lavaWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'A':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/waterWordSprites.png', textType: textTypesEnum.NOUN}));
                    break;
                case 'I':
                    debugger
                    entityManager.addEntity(textEntity.createVerb({x: j, y: i, spriteSheet: 'assets/words/isWordSprites.png'}));
                    break;
                case 'S':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/stopWordSprites.png', textType: textTypesEnum.ADJECTIVE}));
                    break;
                case 'P':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/pushWordSprites.png', textType: textTypesEnum.ADJECTIVE}));
                    break;
                case 'Y':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/youWordSprites.png', textType: textTypesEnum.ADJECTIVE}));
                    break;
                case 'X':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/winWordSprites.png', textType: textTypesEnum.ADJECTIVE}))
                    break;
                case 'S':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/sinkWordSprites.png', textType: textTypesEnum.ADJECTIVE}))
                    break;
                case 'K':
                    entityManager.addEntity(textEntity.createNoun({x: j, y: i, spriteSheet: 'assets/words/killWordSprites.png', textType: textTypesEnum.ADJECTIVE}))
                    break;
                case ' ':
                    break;
            }
        }
    }
}