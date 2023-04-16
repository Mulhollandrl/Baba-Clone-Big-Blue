export function Position(spec) {
    // Define a default Position
    if (spec == undefined) {
        spec = {
            name: 'position',
            x: 0,
            y: 0
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get x() { return spec.x },
        get y() { return spec.y }
    }
}