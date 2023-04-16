export function Sprite(spec) {
    // Define a default Sprite
    if (spec == undefined) {
        spec = {
            name: 'sprite',
            spriteSheet: 'assets/babaSprites',
            // spriteWidth is the width of your sprites on your spriteSheet
            spriteWidth: 26
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get spriteSheet() { return spec.spriteSheet },
        get spriteWidth() { return spec.spriteWidth }
    }
}