// This is a file to make a gui for seeing and using levels of the game
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { currentLevel, levels, controlsKeys, setCurrentLevel } from "../../state/globals.mjs";
import { textSelect } from "../utilities/textSelect.mjs";

export function levelsPage (windowWidth, windowHeight, context, resetGame){
    let audio = new Audio("../../../assets/music/03 - Baby's Tears Blues.mp3");
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);
    let levelsSelects = [];
    let levelStart = 125;
    let selectedButton = 0;

    audio.loop = true;
    
    // Get all of the levels from the levels files
    fetch('http://localhost:3000/levels').then(response => response.json()).then(data => {
        for (const level of data) {
            levels.push(level);
        }

        for (const leveled in levels) {
            levelsSelects.push(textSelect({y: levelStart, height: 50, text: data[leveled].name}, windowWidth, context));
            levelStart += 50;
        }
    }).catch(error => console.error(error));

    function unhoverAll() {
        for (const levelSelect of levelsSelects) {
            levelSelect.unhover();
        }

        backButton.unhover();
    }

    function processInput(keys) {
        audio.play();

        if (keys.hasOwnProperty(controlsKeys.down)) {
            selectedButton++;

            if (selectedButton > levelsSelects.length) {
                selectedButton = 0
            }

            delete keys[controlsKeys.down]
        }

        if (keys.hasOwnProperty(controlsKeys.up)) {
            selectedButton--;
            
            if (selectedButton < 0) {
                selectedButton = levelsSelects.length;
            }
            
            delete keys[controlsKeys.up];
        }

        if (keys.hasOwnProperty(controlsKeys.select)) {
            audio.pause();
            delete keys[controlsKeys.select];

            if (selectedButton === 0) {
                return modesEnum.HOME;
            } else {
                setCurrentLevel(selectedButton - 1);
                resetGame();

                return modesEnum.GAME;
            }
        }

        return modesEnum.LEVELS;
    }

    function update() {
        unhoverAll();

        switch (selectedButton) {
            case 0:
                backButton.hover();
                break;
            default:
                levelsSelects[selectedButton-1].hover();
                break;
        }
    }

    function render() {
        let title = "Levels";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        backButton.render();

        for (const leveled of levelsSelects) {
            leveled.render();
        }
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}