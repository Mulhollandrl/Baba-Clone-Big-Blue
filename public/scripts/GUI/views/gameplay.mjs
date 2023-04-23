// This is the page where we render the game and do what the "game" part of the game requires
import { button } from "../utilities/buttons.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { controlsKeys } from "../../state/globals.mjs";
import EntityManager from "../../ECS/EntityManager.mjs";

export function gamePage (windowWidth, windowHeight, context){
    const entityManager = EntityManager;

    function processInput(keys) {

        return modesEnum.GAME;
    }

    function update(elapsedTime) {
        entityManager.update(elapsedTime);
    }

    function render() {
        
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}