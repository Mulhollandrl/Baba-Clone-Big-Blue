import { componentTypesEnum } from "../state/enums.mjs"

// Aside: I really really wish functional code was as fast as imperative code in JS. Oh well.

/**
 * Does this entity have this component?
 * @param {Entity} entity 
 * @param {Component | Component[]} components
 * @returns 
 */
export function hasAllComponents (entity, components) {
  components = components._toArray() // Force single values into arrays for ease of use
  const entityComponents = entity.componentList
  // for loop is equivalent to `components.every(component => entityComponents.has(component))`
  for (let i = 0; i < components.length; i++) {
      if (!entityComponents.has(components[i])) {
          return false
      }
  }
  return true
}


/**
 * Does this entity have any of these components?
 * @param {Entity} entity 
 * @param {Component | Component[]} components 
 * @returns 
 */
export function hasAnyComponent (entity, components) {
  components = components._toArray() // Force single values into arrays for ease of use
  const entityComponents = entity.componentList
  // for loop is equivalent to `components.some(component => entityComponents.has(component))`
  for (let i = 0; i < components.length; i++) {
    if (entityComponents.has(components[i])) {
      return true
    }
  }
  return false
}


/**
 * Does this entity have all of these properties?
 * @param {Entity} entity 
 * @param {property | property[]} properties e.g. isPush 
 * @returns 
 */
export function hasAllProperties (entity, properties) {
  properties = _toArray(properties)
  const component = entity.getComponent(componentTypesEnum.properties)
  if (!component) return false
  for (let i = 0; i < properties.length; i++) {
    if (!component.hasOwnProperty(properties[i])) {
      return false
    }      
  }
  return true
}

/**
 * Does this entity have any of these properties?
 * @param {Entity} entity 
 * @param {property | property[]} properties e.g. isPush 
 * @returns 
 */
export function hasAnyProperties (entity, properties) {
  properties = _toArray(properties)
  const component = entity.getComponent(componentTypesEnum.properties)
  if (!component) return false
  for (let i = 0; i < properties.length; i++) {
    if (component.hasOwnProperty(properties[i])) {
      return true
    }      
  }
  return false
}

function _toArray (maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else {
    return [maybeArray]
  }
}
