import { nounTypesEnum } from "../../state/enums.mjs"

// A Noun is an object that you can see and push around i.e. A Rock
export function Noun(spec) {
    // Define a default Noun
    if (spec == undefined) {
        spec = {
            name: 'noun',
            nounType: nounTypesEnum.BIGBLUE
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        nounType : spec.nounType
    }
}