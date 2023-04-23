import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.mjs";
import { context } from "../../game.mjs";
import * as entityHelpers from "../entityHelpers.mjs"

export function handleRendering(entityManager, grid) {
    const animateds = entityManager.queryEntities(entity =>
        entityHelpers.hasAllComponents(entity, componentTypesEnum.SPRITE)
    )

    for (let i = 0; i < animateds.length; i++) {
        const animated = animateds[i];
        const sprite = animated.getComponent(componentTypesEnum.SPRITE);
        const spriteSheet = sprite.spriteSheet;
        const spriteWidth = sprite.spriteWidth;
        const spriteIndex = sprite.spriteIndex;
        const maxSpriteIndex = sprite.maxSpriteIndex;
        const position = animated.getComponent(componentTypesEnum.POSITION);

        animated.spriteIndex++;

        if (spriteIndex > maxSpriteIndex) {
            animated.spriteIndex = 0;
        }

        context.drawImage(spriteSheet, (spriteIndex * spriteWidth) + 1, 1, spriteWidth, spriteWidth, position.x, position.y)
    }
}