import { componentTypesEnum, entityPropertiesEnum } from "../../state/enums.mjs";
import * as entityHelpers from "../entityHelpers.mjs"

/**
 * 
 * @param {EntityManager} entityManager 
 * @param {Grid} grid 
 */
export function handleMovement (entityManager, grid) {
  const movings = entityManager.queryEntities(entity =>
    entityHelpers.hasAllComponents(entity, componentTypesEnum.MOVED)
  )
  
  for (let i = 0; i < movings.length; i++) {
    const moving = movings[i]
    const { direction } = moving.getComponent(componentTypesEnum.MOVED)
    grid.moveEntity(moving, direction)
    moving.removeComponent(componentTypesEnum.MOVED)
  }
}
