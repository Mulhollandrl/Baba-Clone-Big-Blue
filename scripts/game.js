import { MainMenu, HighScoresMenu, CreditsMenu, PauseMenu, hideMenus } from "./state/buildMenu";
import { States } from "./utilities/enums";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(4/3);

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;

switchState(States.MAIN)

function switchState (s) {
    state = s
    hideMenus()

    switch (state) {
        case States.MAIN:
          MainMenu.show();
          break;
        case States.SCORES:
          HighScoresMenu.show();
          break;
        case States.CREDITS:
          CreditsMenu.show();
          break;
        case States.PAUSE:
          system.pause();
          PauseMenu.show();
          break;
        case States.NEWGAME:
          initGame();
          switchState(States.COUNTDOWN);
          break;
        case States.COUNTDOWN:
          initCountdown().then(() => switchState(States.GAME));
          break;
        case States.GAME:
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