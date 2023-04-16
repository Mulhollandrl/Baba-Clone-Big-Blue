import { textTypesEnum } from "../../state/enums.mjs"

// Text is a text object. These are the words. There is a noun text type, and that is the WORD Baba, not actually Baba
export function Text(spec) {
    // There is an enum for text types in enums.mjs

    // Define a default Text
    if (spec == undefined) {
        spec = {
            name: 'text',
            textType: textTypesEnum.VERB
        }
    }

    // Make it so that you can retrieve all of them
    return {
        get name() { return spec.name },
        get textType() { return spec.textType }
    }
}