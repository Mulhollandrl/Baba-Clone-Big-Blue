let current_id = 0
export function Entity() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const componentList = Map()
    const id = current_id++
    function addComponent(component) {
        componentList.set(component.name, component)
    }
    
    function getComponent (componentName) {
        return componentList.get(componentName)
    }
    
    function removeComponent (componentName) {
        return componentList.remove(componentName)
    }

    return {
        get componentList() { return componentList },
        get id () { return id },
        addComponent : addComponent,
        getComponent : getComponent,
        removeComponent : removeComponent
    }
}
