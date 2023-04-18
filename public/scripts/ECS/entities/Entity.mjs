export function Entity() {
    let componentList = []

    function addComponent(component) {
        componentList.push(component)
    }

    return {
        get componentList() { return componentList },
        addComponent : addComponent
    }
}