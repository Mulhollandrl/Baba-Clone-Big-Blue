import { adjectiveTypesEnum, componentTypesEnum, directionsEnum, entityPropertiesEnum, nounTypesEnum, spriteSheetEnum, textTypesEnum } from "../../state/enums.mjs";
import { Property } from "../components/Property.mjs";
import * as entityHelpers from "../entityHelpers.mjs"
import { mergeSets, cartesianProduct, filterSet } from "../../utilities/setutils.mjs";

const onlyText = entity => entityHelpers.hasAllComponents(entity, componentTypesEnum.TEXT)
export function handleRules(entityManager, grid) {
    const allSentences = new Set();

    // Go through the whole grid
    
    const verbs = entityManager.queryEntities(entity => {
        const textComponent = entity.getComponent(componentTypesEnum.TEXT)
        return textComponent && textComponent.textType === textTypesEnum.VERB
    })
    
    for (const v of verbs) {
        const position = v.getComponent(componentTypesEnum.POSITION)
        if (!position) {
            continue
        }
        
        const left = filterSet(grid.getAdjacentEntities(position, directionsEnum.LEFT), onlyText)
        const right = filterSet(grid.getAdjacentEntities(position, directionsEnum.RIGHT), onlyText)
        const up = filterSet(grid.getAdjacentEntities(position, directionsEnum.UP), onlyText)
        const down = filterSet(grid.getAdjacentEntities(position, directionsEnum.DOWN), onlyText)
        
        const horizontalRules = cartesianProduct(left, right)
        const verticalRules = cartesianProduct(up, down)
        
        mergeSets(allSentences, horizontalRules)
        mergeSets(allSentences, verticalRules)
    }
    
    const rules = filterSet(allSentences, ([first, last]) => {
        // e.g [BABA, YOU]
        // (IS is implied)
        const firstText = first.getComponent(componentTypesEnum.TEXT)
        const lastText = last.getComponent(componentTypesEnum.TEXT)
        if (firstText.textType === textTypesEnum.NOUN && lastText.textType !== textTypesEnum.VERB) {
            return true
        }        
        return false
    })

    ruleEffects(entityManager, rules.values())
}

function ruleEffects(entityManager, rules) {
    entityManager.queryEntities(
        entity => {
            const nounType = entity.getComponent(componentTypesEnum.NOUN)?.nounType
            return nounType && nounType !== nounTypesEnum.TEXT
        }
    ).forEach(entity => {
        if (entity.getComponent(componentTypesEnum.SPRITE).spriteSheet === 'assets/objects/hedgeObjectSprites.png') {
            console.log('destroying hedge properties...')
        }
        entity.addComponent(Property())
    }) // Clear properties of all nouns
        
    const adjectiveRules = []
    for (const rule of rules) {
        const predicate = rule[1].getComponent(componentTypesEnum.TEXT);
        const subject = rule[0].getComponent(componentTypesEnum.TEXT);
        if (predicate.textType === textTypesEnum.ADJECTIVE) {
            adjectiveRules.push([subject, predicate])
            continue
        }
        const toChange = entityManager.queryEntities(entity =>
            entity.getComponent(componentTypesEnum.NOUN)?.nounType === subject.wordType
        )
        
        console.log(toChange.length)
        for (let j = 0; j < toChange.length; j++) {
            // let properties = toChange[j].getComponent(componentTypesEnum.PROPERTY);
            toChange[j].getComponent(componentTypesEnum.NOUN).nounType = predicate.wordType;
            toChange[j].getComponent(componentTypesEnum.SPRITE).spriteSheet = spriteSheetEnum[predicate.wordType]
        }
    }
    
    for (let i = 0; i < adjectiveRules.length; i++) {
        const [subject, predicate] = adjectiveRules[i]
        const toChange = entityManager.queryEntities(entity =>
            entity.getComponent(componentTypesEnum.NOUN)?.nounType === subject.wordType
        )
        
        for (let j = 0; j < toChange.length; j++) {
            // let properties = toChange[j].getComponent(componentTypesEnum.PROPERTY);
            const properties = toChange[j].getComponent(componentTypesEnum.PROPERTY)
            
            switch (predicate.wordType) {
                case adjectiveTypesEnum.DEFEAT:
                    properties.isDefeat = true;
                    break;
                case adjectiveTypesEnum.PUSH:
                    properties.isPush = true;
                    break;
                case adjectiveTypesEnum.SINK:
                    properties.isSink = true;
                    break;
                case adjectiveTypesEnum.STOP:
                    properties.isStop = true;
                    break;
                case adjectiveTypesEnum.WIN:
                    properties.isWin = true;
                    break;
                case adjectiveTypesEnum.YOU:
                    properties.isYou = true;
                    break;
            }
        }
    }
}
