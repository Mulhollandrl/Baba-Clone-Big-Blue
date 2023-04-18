// This is a file to make a gui for seeing and changing controls for the game
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";

export function controlsPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        // TODO: We need to put a function here haha

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter') || keys.hasOwnProperty('Escape')) {
            delete keys['Space']
            delete keys['Enter']
            delete keys['Escape']

            return modesEnum.HOME;
        }

        return modesEnum.CONTROLS;
    }

    function render() {
        let title = "Controls";
        let controls = "You move with WASD...";
        let ideas = "Make Rules?";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(controls, (windowWidth/2) - (context.measureText(controls).width/2), 125 + (fontHeight/2));
        context.fillText(ideas, (windowWidth/2) - (context.measureText(ideas).width/2), 200 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}