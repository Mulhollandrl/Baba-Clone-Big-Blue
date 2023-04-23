// Class methods inspired by GPT4 when prompted:
/*
What if my game uses a grid structure,and I need to find a way
to check for adjacent entities over any given space?
*/
// Comments are original

import { componentTypesEnum, directionsEnum, entityPropertiesEnum } from "../state/enums.mjs"
import { Entity } from "./entities/Entity.mjs"
import { Property } from "./components/Property.mjs"

// We need something to efficiently keep track of the positions of everything.
export default class Grid {
  constructor (width, height) {
    this.width = width
    this.height = height
    
    // Create a width*height grid that can hold multiple entities in each position
    this.grid = Array.from(width * height, () => new Map())
  }
  
  _getIndex (x, y) {
    return y * this.width + x 
  }
  
  _getPositionFromEntity (entity) {
    return entity.getComponent(componentTypesEnum.POSITION)
  }
  
  _getVectorFromDirection (direction) {
    switch (direction) {
      case directionsEnum.RIGHT: return {x: 1, y: 0}
      case directionsEnum.LEFT: return {x: -1, y: 0}
      case directionsEnum.DOWN: return {x: 0, y: 1}
      case directionsEnum.UP: return {x: 0, y: -1}
      default: throw new DeveloperError(`_getVectorFromDirection: invalid direction: ${direction}`)
    }
  }
  
  addEntity (entity) {
    const {x, y} = this._getPositionFromEntity(entity)
    this.grid[this._getIndex(x, y)].set(entity.id, entity)
  }
  
  removeEntity (entity) {
    const {x, y} = this._getPositionFromEntity(entity)
    this.grid[this._getIndex(x, y)].delete(entity.id)
  }
  
  moveEntity (entity, direction) {
    this.removeEntity(entity)
    const position = this._getPositionFromEntity(entity)
    const direction = this._getVectorFromDirection(direction)
    position.x += direction.x
    position.y += direction.y
    this.addEntity(entity)
  }
    
  getEntities (x, y) {
    if (!this.isValidCoordinate(x, y)) {
      const blocker = Entity()
      blocker.addComponent(Property({
        [entityPropertiesEnum.STOP]: true
      }))
      return [blocker]
    }
    const index = this._getIndex(x, y)
    return [...this.grid[index].values()]
  }
  
  getAdjacentEntities (position, direction, length) {
    length = length ?? 1
    const {x, y} = this.position
    const {x: dx, y: dy} = this._getVectorFromDirection(direction)
    return this.getEntities(x + dx * length, y + dy * length)
  }
  
  isValidCoordinate (x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
  
  /**
   * Gets a list of entities in the direction of another entity.
   * @param {*} entity 
   * @param {*} direction 
   * @returns 
   */
  getAdjacentEntities(entity, direction) {
    const {x, y} = this._getPositionFromEntity(entity)
    const adjacentCoordinate = {
      x: x + direction.x,
      y: y + direction.y
    }

    return this.getEntities(
      adjacentCoordinate.x,
      adjacentCoordinate.y
    )
  }
}
