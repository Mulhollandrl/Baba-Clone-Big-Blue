import Grid from "./Grid.mjs"
import { componentTypesEnum } from "../state/enums.mjs"
import * as entityHelpers from "./entityHelpers.mjs"
import { handleControl } from "./systems/control.mjs"
import { handlePushing } from "./systems/push.mjs"
import { handleMovement } from "./systems/movement.mjs"
import { handleRendering } from "./systems/renderer.mjs"
import { currentLevel, levels } from "../state/globals.mjs"
entityHelpers

export default class EntityManager {
  constructor () {
    this.grid = new Grid(levels[currentLevel].width, levels[currentLevel].height)
    this.entities = new Set()
    this.elapsedTime = performance.now();
    // How often do we change the sprite?
    this.animationSpeed = 750;
  }
  
  addEntity (entity) {
    this.entities.add(entity)
    if (entityHelpers.hasAllComponents(entity, componentTypesEnum.POSITION)) {
      this.grid.addEntity(entity)
    }
  }
  
  /**
   * 
   * @param {componentTypesEnum[]} componentNames 
   * @param {Array} [existingArray = []] 
   * @returns 
   */
  queryEntities (condition, existingArray) {
    const found = existingArray ?? []
    found.length = 0
    // Faster than raw for loop, thanks to Set.values() returning an iterator
    for (const entity of this.entities.values()) {
      if (condition(entity)) {
        found.push(entity)
      }
    }
    return found
  }
  
  update (timeStamp) { // We don't really need a time delta here
    // Do we need to move to the next sprite in the spriteSheet
    let changeSprite = false;
    
    this.elapsedTime += timeStamp;
    
    // Figure out if we need to change it
    if (this.elapsedTime > this.animationSpeed) {
      this.elapsedTime = 0;
      changeSprite = true;
    }

    handleControl(this)
    handlePushing(this, this.grid)
    handleMovement(this, this.grid)
    handleRendering(this, changeSprite)
  }
}
