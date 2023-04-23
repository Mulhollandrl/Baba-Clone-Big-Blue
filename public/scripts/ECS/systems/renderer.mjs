import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.mjs";
import { context } from "../../game.mjs";
import * as entityHelpers from "../entityHelpers.mjs"

export function handleRendering(entityManager, changeSprite) {
    const animateds = entityManager.queryEntities(entity =>
        entityHelpers.hasAnyComponent(entity, componentTypesEnum.SPRITE)
    )

    for (let i = 0; i < animateds.length; i++) {
        // Get all necessary components for drawing it correctly
        const animated = animateds[i];
        const sprite = animated.getComponent(componentTypesEnum.SPRITE);
        const spriteSheet = sprite.spriteSheet;
        const spriteWidth = sprite.spriteWidth;
        const spriteIndex = sprite.spriteIndex;
        const maxSpriteIndex = sprite.maxSpriteIndex;
        const position = animated.getComponent(componentTypesEnum.POSITION);

        const image = new Image();
        image.src = spriteSheet;

        // Go to the next sprite in sheet if applicable
        if (changeSprite) {
            animated.spriteIndex++;
        }

        // Loop sprites to the beginning if needed
        if (spriteIndex > maxSpriteIndex) {
            animated.spriteIndex = 0;
        }

        // It draws the sprite that is necessary on the spriteSheet. The reason it has the ones is because of the borders on the sprites...
        context.drawImage(image, (spriteIndex * (spriteWidth + 1)) + 1, 1, spriteWidth, spriteWidth, position.x, position.y, spriteWidth, spriteWidth);
    }
}