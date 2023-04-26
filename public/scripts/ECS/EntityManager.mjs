import Grid from "./Grid.mjs"
import { componentTypesEnum } from "../state/enums.mjs"
import * as entityHelpers from "./entityHelpers.mjs"
import { handleControl } from "./systems/control.mjs"
import { handlePushing } from "./systems/push.mjs"
import { handleMovement } from "./systems/movement.mjs"
import { handleRendering } from "./systems/renderer.mjs"
import { currentLevel, levels } from "../state/globals.mjs"
import { handleRules } from "./systems/rule.mjs"
import { checkForAll } from "./systems/objectEffects.mjs"
import { deepCopy } from "../utilities/deepCopy.mjs"
import { EntityFromComponents } from "./entities/Entity.mjs"

export default class EntityManager {
  constructor () {
    this.grid = new Grid(levels[currentLevel].width, levels[currentLevel].height)
    this.entities = new Set()
    this.elapsedTime = performance.now();
    // How often do we change the sprite?
    this.animationSpeed = 250;
    this.stillAlive = true;
    this.win = false;
    this.undoStack = []
  }
  
  saveState () {
    this.undoStack.push(deepCopy([...this.entities.values()].map(entity => entity.clone())))
  }
  
  restore () {
    const oldState = this.undoStack.pop()
    if (!oldState) {
      return
    }
    this.entities.clear()
    this.grid.clear()
    for (const entity of oldState) {
      this.addEntity(EntityFromComponents(entity))
    }
  }
  
  addEntity (entity) {
    this.entities.add(entity)
    if (entityHelpers.hasAllComponents(entity, componentTypesEnum.POSITION)) {
      this.grid.addEntity(entity)
    }
  }

  removeEntity (entity) {
    this.entities.delete(entity);
    this.grid.removeEntity(entity);
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
    this.changeSprite = false;

    
    this.elapsedTime += timeStamp;
    
    // Figure out if we need to change it
    if (this.elapsedTime > this.animationSpeed) {
      this.elapsedTime = 0;
      this.changeSprite = true;
    }

    handleControl(this)
    handlePushing(this, this.grid)
    handleMovement(this, this.grid)
    handleRules(this, this.grid, levels[currentLevel].width, levels[currentLevel].height)
    
    let checks = checkForAll(this);

    this.stillAlive = !(checks[0]);
    this.win = checks[1];
  }
  
  render() {
    handleRendering(this, this.grid, this.changeSprite)
  }
}
