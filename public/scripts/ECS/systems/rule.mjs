import { componentTypesEnum, entityPropertiesEnum, nounTypesEnum, textTypesEnum } from "../../state/enums.mjs";
import * as entityHelpers from "../entityHelpers.mjs"

export function handleRules(entityManager, grid, levelWidth, levelHeight) {
    let allRules = [];

    // Go through the whole grid
    grid.grid.forEach((element, i) => {
        if (element.size > 0) {
            let rule = [];
            // Find the entities at the current cell
            const entitiesAtI = grid.getEntities(i % levelWidth, Math.floor(i / levelHeight))

            // Go through all of the entities at i
            for (let j = 0; j < entitiesAtI.length; j++) {
                // If it is not undefined and it is text
                if (entitiesAtI[j] !== undefined) {
                    if (entityHelpers.hasAllProperties(entitiesAtI[j], componentTypesEnum.TEXT)) {
                        // If this entity is a noun or adjective, move on
                        if (entitiesAtI[j].getComponent(componentTypesEnum.TEXT).textType === textTypesEnum.ADJECTIVE || entitiesAtI[j].getComponent(componentTypesEnum.TEXT).textType === textTypesEnum.NOUN) {
                            // Add the wordType to the rule executor list
                            rule.push(entitiesAtI[j].getComponent(componentTypesEnum.TEXT).wordType)

                            // Find all of the entities one space to the left
                            const entitiesAtLeft = grid.getEntities((i - 1) % levelWidth, Math.floor((i - 1) / levelHeight))

                            // Then iterate through those entities
                            for (let k = 0; k < entitiesAtLeft.length; k++) {
                                // If it is not undefined and it is text
                                if (entitiesAtLeft[k] !== undefined) {
                                    if (entityHelpers.hasAllProperties(entitiesAtLeft[k], componentTypesEnum.TEXT)) {
                                        // If this entity is a verb (is), move on
                                        if (entitiesAtLeft[k].getComponent(componentTypesEnum.TEXT).textType === textTypesEnum.VERB) {
                                            // Get the entities two to the left
                                            const entitiesAtLeftLeft = grid.getEntities((i - 2) % levelWidth, Math.floor((i - 2) / levelHeight))

                                            // Then iterate through those entities
                                            for (let l = 0; l < entitiesAtLeftLeft.length; l++) {
                                                // If it is not undefined and it is text
                                                if (entitiesAtLeftLeft[l] !== undefined) {
                                                    if (entityHelpers.hasAllProperties(entitiesAtLeftLeft[l], componentTypesEnum.TEXT)) {
                                                        // If this entity is an noun, add it to the rule and add the rule to allrules
                                                        if (entitiesAtLeftLeft[l].getComponent(componentTypesEnum.TEXT).textType === textTypesEnum.NOUN) {
                                                            rule.push(entitiesAtLeftLeft[l].getComponent(componentTypesEnum.TEXT).wordType)
                                                            allRules.push(rule)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    ruleEffects(entityManager, allRules)
}

function ruleEffects(entityManager, rules) {
    const nouns = entityManager.queryEntities(entity =>
        entityHelpers.hasAnyComponent(entity, componentTypesEnum.NOUN)
    );

    debugger

    for (let i = 0; i < rules.length; i++) {
        const ruleToDo = rules[i];
        const whatHappens = ruleToDo[0];
        const happensTo = ruleToDo[1];
        const changers = nouns.filter(noun => noun.getComponent(componentTypesEnum.NOUN).nounType == happensTo);

        for (let j = 0; j < changers.length; j++) {
            let properties = changers[j].getComponent(componentTypesEnum.PROPERTY);
            let noun = changers[j].getComponent(componentTypesEnum.NOUN);

            switch (whatHappens) {
                case 'baba':
                    noun.nounType = nounTypesEnum.BIGBLUE;
                    break;
                case 'flag':
                    noun.nounType = nounTypesEnum.FLAG;
                    break;
                case 'kill':
                    properties.isDefeat = true;
                    break;
                case 'lava':
                    noun.nounType = nounTypesEnum.LAVA;
                    break;
                case 'push':
                    properties.isPush = true;
                    break;
                case 'rock':
                    noun.nounType = nounTypesEnum.ROCK;
                    break;
                case 'sink':
                    properties.isSink = true;
                    break;
                case 'stop':
                    properties.isStop = true;
                    break;
                case 'wall':
                    noun.nounType = nounTypesEnum.WALL;
                    break;
                case 'water':
                    noun.nounType = nounTypesEnum.WATER;
                    break;
                case 'win':
                    properties.isWin = true;
                    break;
                case 'you':
                    properties.isYou = true;
                    break;
            }
        }
    }
}