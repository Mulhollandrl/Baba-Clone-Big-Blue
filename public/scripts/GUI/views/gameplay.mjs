// This is the page where we render the game and do what the "game" part of the game requires
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { controlsKeys } from "../../state/globals.mjs";
import EntityManager from "../../ECS/EntityManager.mjs";
import { levelMaker } from "../../ECS/levelMaker.mjs";

export function gamePage (windowWidth, windowHeight, context, resetGame){
    let entityManager = null;
    let levelMade = false;
    let gameOverText = `GAME OVER! Press ${controlsKeys.undo} to undo!`;
    let winText = `YOU WIN!! Press ${controlsKeys.leave} to go to levels!`;

    function processInput(keys) {
        if (keys.hasOwnProperty(controlsKeys.reset)) {
            resetGame();

            delete keys[controlsKeys.reset]
        }

        if (keys.hasOwnProperty(controlsKeys.leave)) {
            delete keys[controlsKeys.leave]

            return modesEnum.LEVELS;
        }

        return modesEnum.GAME;
    }

    function update(elapsedTime) {
        // We need to initialize it, but only once per a gamePage...
        if (!levelMade) {
            entityManager = new EntityManager();
            levelMaker(entityManager);
            levelMade = true;
        }

        entityManager.update(elapsedTime);
    }

    function render() {
        entityManager.render();

        if (!entityManager.stillAlive) {
            context.fillStyle = "white"
            context.font = "48px Courier";

            let fontHeight = context.measureText("m").width;

            context.fillText(gameOverText, (windowWidth/2) - (context.measureText(gameOverText).width/2), (windowHeight/2) + (fontHeight/2));
        }

        if (entityManager.win) {
            context.fillStyle = "white"
            context.font = "48px Courier";

            let fontHeight = context.measureText("m").width;

            context.fillText(winText, (windowWidth/2) - (context.measureText(winText).width/2), (windowHeight/2) + (fontHeight/2));
        }
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}