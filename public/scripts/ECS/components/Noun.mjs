ECS.components.Noun = function(spec) {
    if (spec == undefined) {
        spec = {
            name: 'noun',
            isStop: false,
            isPush: false,
            isYou: false,
            isWin: false,
            isSink: false,
            isDefeat: false
        }
    }

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