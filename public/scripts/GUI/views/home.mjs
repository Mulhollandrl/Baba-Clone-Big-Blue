// This is a file to make a gui for seeing a home screen to get to everything. A "Main Menu" of sorts
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";

export function homePage (windowWidth, windowHeight, context){
    let creditsButton = button({y: 325, height: 50, text: "Credits!"}, windowWidth, context);
    let controlsButton = button({y: 225, height: 50, text: "Controls!"}, windowWidth, context);
    let newGameButton = button({y: 125, height: 50, text: "New Game!"}, windowWidth, context);
    let selectedButton = 0;

    function processInput(keys) {
        if (keys.hasOwnProperty('s') || keys.hasOwnProperty('k') || keys.hasOwnProperty('ArrowDown')) {
            selectedButton++;

            if (selectedButton > 2) {
                selectedButton = 0
            }

            delete keys['s']
            delete keys['k']
            delete keys['ArrowDown']
        }

        if (keys.hasOwnProperty('w') || keys.hasOwnProperty('i') || keys.hasOwnProperty('ArrowUp')) {
            selectedButton--;

            if (selectedButton < 0) {
                selectedButton = 2;
            }
            
            delete keys['w'];
            delete keys['i'];
            delete keys['ArrowUp'];
        }

        if (keys.hasOwnProperty('Space') || keys.hasOwnProperty('Enter')) {
            delete keys['Space'];
            delete keys['Enter'];

            switch (selectedButton) {
                case 0:
                    return modesEnum.LEVELS;
                case 1:
                    return modesEnum.CONTROLS;
                case 2:
                    return modesEnum.CREDITS;
            }
        }

        return modesEnum.HOME;
    }

    function update() {
        switch (selectedButton) {
            case 0:
                newGameButton.hover();
                controlsButton.unhover();
                creditsButton.unhover();
                break;
            case 1:
                newGameButton.unhover();
                controlsButton.hover();
                creditsButton.unhover();
                break;
            case 2:
                newGameButton.unhover();
                controlsButton.unhover();
                creditsButton.hover();
                break;
        }
    }

    function render() {
        let title = "Big Blue Is You!";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        creditsButton.render();
        controlsButton.render();
        newGameButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}