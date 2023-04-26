import { componentTypesEnum, entityPropertiesEnum, nounTypesEnum, textTypesEnum } from "../../state/enums.mjs";
import * as entityHelpers from "../entityHelpers.mjs"

export function checkForAll(entityManager) {
    const nouns = entityManager.queryEntities(entity =>
        entityHelpers.hasAllComponents(entity, componentTypesEnum.NOUN)
    );

    checkForSink(nouns);
    return [checkForDefeat(entityManager, nouns), checkForWin(nouns)]
}

function checkForDefeat(entityManager, nouns) {
    const listToCheck = []

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isDefeat === true) {
            listToCheck.forEach(entity => {
                if (entity != element && entity.getComponent(componentTypesEnum.PROPERTY).isYou == true) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        entityManager.removeEntity(entity);
                        // TODO: We need to check if all yous are gone.
                    }
                }
            });
        }
    });
    
    return false;
}

function checkForSink(nouns) {
    const listToCheck = []

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isDefeat === true) {
            listToCheck.forEach(entity => {
                if (entity != element && entity.getComponent(componentTypesEnum.PROPERTY).isYou == false) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        entityManager.removeEntity(entity);
                    }
                }
            });
        }
    });
}

function checkForWin(nouns) {
    const listToCheck = []

    nouns.forEach(element => {
        if (element.getComponent(componentTypesEnum.NOUN).nounType !== nounTypesEnum.TEXT) {
            listToCheck.push(element);
        }
    });

    listToCheck.forEach(element => {
        if (element.getComponent(componentTypesEnum.PROPERTY).isWin === true) {
            listToCheck.forEach(entity => {
                if (entity != element && entity.getComponent(componentTypesEnum.PROPERTY).isYou == true) {
                    const entityPosition = entity.getComponent(componentTypesEnum.POSITION);
                    const elementPosition = element.getComponent(componentTypesEnum.POSITION);

                    if (entityPosition.x == elementPosition.x && entityPosition.y == elementPosition.y) {
                        return true;
                    }
                }
            });
        }
    });

    return false;
}