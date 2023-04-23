import Persistent from "../utilities/persistent.mjs";
import Observable from "../utilities/observable.mjs";
import { modesEnum } from "./enums.mjs"

export let controlsKeys = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd',
    select: 'Enter',
    leave: 'Escape'
};

// THIS IS ALL FOR KEEPING TRACK OF CURRENT LEVELS AND ALL LEVELS. This is the best I could do honestly haha.
export let currentLevel = 0;

export let levels = [];

export function setCurrentLevel(level) {
    currentLevel = level;
}