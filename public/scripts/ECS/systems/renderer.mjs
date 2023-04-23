import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.mjs";
import { context } from "../../game.mjs";
import * as entityHelpers from "../entityHelpers.mjs"
import { positionGrid } from "../positionGrid.mjs";

export function handleRendering(entityManager, grid, changeSprite) {
    const {
        getX, getY, tileSize, levelWidth, levelHeight
      } = positionGrid(grid.width, grid.height)
    const animateds = entityManager.queryEntities(entity =>
        entityHelpers.hasAnyComponent(entity, componentTypesEnum.SPRITE)
    );

    for (let i = 0; i < animateds.length; i++) {
        // Get all necessary components for drawing it correctly
        const animated = animateds[i];
        const sprite = animated.getComponent(componentTypesEnum.SPRITE);
        const spriteSheet = sprite.spriteSheet;
        const spriteWidth = sprite.spriteWidth;
        const maxSpriteIndex = sprite.maxSpriteIndex;
        const spriteIndex = Math.trunc((performance.now() / 250) % maxSpriteIndex)
        const position = animated.getComponent(componentTypesEnum.POSITION);

        const image = new Image();
        image.src = spriteSheet;

        // // Go to the next sprite in sheet if applicable
        // if (changeSprite) {
        //     sprite.spriteIndex++;
        // }

        // // Loop sprites to the beginning if needed
        // if (spriteIndex > maxSpriteIndex) {
        //     sprite.spriteIndex = 0;
        // }

        // It draws the sprite that is necessary on the spriteSheet. The reason it has the ones is because of the borders on the sprites...
        context.drawImage(image, 
            (spriteIndex * (spriteWidth + 1)) + 2, 2, 
            spriteWidth - 2, spriteWidth - 2, 
            getX(position.x), getY(position.y), 
            tileSize, tileSize);
    }
}