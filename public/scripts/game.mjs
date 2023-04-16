import { MainMenu, CreditsMenu, PauseMenu, hideMenus } from "./GUI/buildMenu.mjs";
import { MODES } from "./state/enums.mjs";
import { Mode } from './state/globals.mjs'

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(1 + 7/9);

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;

Mode.set(MODES.MAIN)

Mode.subscribe(mode => {
  if (mode === MODES.NEWGAME) {
    initGame()
  }
})

function switchState (s) {
    state = s
    hideMenus()

    switch (state) {
        case MODES.MAIN:
          MainMenu.show();
          break;
        case MODES.SCORES:
          HighScoresMenu.show();
          break;
        case MODES.CREDITS:
          CreditsMenu.show();
          break;
        case MODES.PAUSE:
          system.pause();
          PauseMenu.show();
          break;
        case MODES.NEWGAME:
          initGame();
          switchState(MODES.COUNTDOWN);
          break;
        case MODES.COUNTDOWN:
          initCountdown().then(() => switchState(MODES.GAME));
          break;
        case MODES.GAME:
          system.unpause();
          gameLoop(performance.now());
          break;
        default:
          throw new Error(`Invalid state: ${state}`);
      }
}

MainMenu
  .onButton('new game', () => switchState('new game'))
  .onButton('high scores', () => switchState('scores'))
  .onButton('credits', () => switchState('credits'))
  .freeze()

HighScoresMenu
  .onButton('main menu', () => switchState('main'))
  // .onButton('delete scores', () => deleteScores())

CreditsMenu
  .onButton('main menu', () => switchState('main'))
  .freeze()

PauseMenu
  .onButton('resume', () => switchState('countdown'))
  .onButton('quit', () => switchState('main'))
