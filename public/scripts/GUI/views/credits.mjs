// This is a file to make a gui for seeing the credits and attributions for the game
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";

export function creditsPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);

    function processInput(keys) {
        // TODO: We need to put a function here haha

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter') || keys.hasOwnProperty('Escape')) {
            delete keys['Space']
            delete keys['Enter']
            delete keys['Escape']

            return modesEnum.HOME;
        }

        return modesEnum.CREDITS;
    }

    function render() {
        let title = "Credits";
        let created = "Created By:\nEthan Christensen AND\nRichard Mulholland";
        let helper = "With Assistance From:\nDr. Dean Mathias";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(created, (windowWidth/2) - (context.measureText(created).width/2), 125 + (fontHeight/2));
        context.fillText(helper, (windowWidth/2) - (context.measureText(helper).width/2), 200 + (fontHeight/2));

        backButton.render();
        backButton.hover();
    }

    return {
        processInput : processInput,
        render : render
    }
}