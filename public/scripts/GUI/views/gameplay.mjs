// This is the page where we render the game and do what the "game" part of the game requires
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { controlsKeys } from "../../state/globals.mjs";
import EntityManager from "../../ECS/EntityManager.mjs";
import { levelMaker } from "../../ECS/levelMaker.mjs";

export function gamePage (windowWidth, windowHeight, context, resetGame){
    let entityManager = null;
    let levelMade = false;

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
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}