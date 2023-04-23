import Keyboard from "../../inputs/Keyboard.js";
import { directionsEnum, entityPropertiesEnum } from "../../state/enums.mjs";
import { Moved } from "../components/Moved.mjs";
import * as entityHelpers from "../entityHelpers.mjs"
/**
 * 
 * @param {EntityManager} entityManager 
 */
export function handleControl (entityManager) {
  const yous = entityManager.queryEntities(entity =>
    entityHelpers.hasAllProperties(entity, entityPropertiesEnum.YOU)
  )
  
  let direction
  if (Keyboard.isPressed('d')) { //TODO: Replace with appropriate global key
    direction = directionsEnum.RIGHT
  } // TODO: Add other keys and directions
  else {
    return
  }
  Keyboard.unpress()
  
  for (let i = 0; i < yous.length; i++) {
    yous[i].addComponent(Moved({direction}))
  }
}
