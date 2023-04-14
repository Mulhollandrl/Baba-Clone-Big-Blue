import { MainMenu, HighScoresMenu, CreditsMenu, PauseMenu, hideMenus } from "./state/buildMenu";
import { Modes } from "./utilities/enums";
import { Mode } from './state/globals.mjs'

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(1 + 7/9);

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;

Mode.set(Modes.MAIN)

Mode.subscribe(mode => {
  if (mode === Modes.NEWGAME) {
    initGame()
  }
})

function switchState (s) {
    state = s
    hideMenus()

    switch (state) {
        case Modes.MAIN:
          MainMenu.show();
          break;
        case Modes.SCORES:
          HighScoresMenu.show();
          break;
        case Modes.CREDITS:
          CreditsMenu.show();
          break;
        case Modes.PAUSE:
          system.pause();
          PauseMenu.show();
          break;
        case Modes.NEWGAME:
          initGame();
          switchState(Modes.COUNTDOWN);
          break;
        case Modes.COUNTDOWN:
          initCountdown().then(() => switchState(Modes.GAME));
          break;
        case Modes.GAME:
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
