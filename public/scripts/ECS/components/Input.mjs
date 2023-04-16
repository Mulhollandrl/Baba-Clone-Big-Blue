// Input is a thing to say whether or not something cares about key presses
export function Input(spec) {
    // Define a default Input
    if (spec == undefined) {
        spec = {
            name: 'input',
            inputReady: true
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get inputReady() { return spec.inputReady }
    }
}