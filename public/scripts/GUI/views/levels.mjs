// This is a file to make a gui for seeing and using levels of the game
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { controlsKeys } from "../../state/globals.mjs";

export function levelsPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        // TODO: We need to put a function here haha

        if (keys.hasOwnProperty(controlsKeys.select)) {
            delete keys[controlsKeys.select];

            return modesEnum.HOME;
        }

        return modesEnum.LEVELS;
    }

    function render() {
        let title = "Levels";
        let levels = "List the levels here...";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(levels, (windowWidth/2) - (context.measureText(levels).width/2), 125 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}