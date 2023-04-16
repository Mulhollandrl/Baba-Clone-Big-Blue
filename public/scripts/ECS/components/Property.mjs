// A Property is an adjective applied to something. For example if Baba is Push, Push needs to be a property applied to Baba. isPush is used for this
export function Property(spec) {
    // Define a default Property
    if (spec == undefined) {
        spec = {
            name: 'property',
            isStop: false,
            isPush: false,
            isYou: false,
            isWin: false,
            isSink: false,
            isDefeat: false
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get isStop() { return spec.isStop },
        get isPush() { return spec.isPush },
        get isYou() { return spec.isYou },
        get isWin() { return spec.isWin },
        get isSink() { return spec.isSink },
        get isDefeat() { return spec.isDefeat },
    }
}