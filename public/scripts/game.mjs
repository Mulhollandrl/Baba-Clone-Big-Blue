import { controlsPage } from "./GUI/views/controls.mjs";
import { creditsPage } from "./GUI/views/credits.mjs";
import { homePage } from "./GUI/views/home.mjs";
import { levelsPage } from "./GUI/views/levels.mjs";
import { gamePage } from "./GUI/views/gameplay.mjs";
import { modesEnum } from "./state/enums.mjs";
// import { Mode } from './state/globals.mjs'

let canvas = document.getElementById("canvas");
export let context = canvas.getContext("2d");
let canvasHeight = window.innerHeight - 175;
let canvasWidth = canvasHeight*(1 + 7/9);

canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.height = canvasHeight;
canvas.style.width = canvasWidth;


let HomeScreen = homePage(canvasWidth, canvasHeight, context);
let LevelsScreen = levelsPage(canvasWidth, canvasHeight, context);
let ControlsScreen = controlsPage(canvasWidth, canvasHeight, context);
let CreditsScreen = creditsPage(canvasWidth, canvasHeight, context);
let GameScreen = gamePage(canvasWidth, canvasHeight, context);

export function restartGame() {
  let GameScreen = gamePage(canvasWidth, canvasHeight, context);
}

let state = modesEnum.HOME;

let input = (function() {
  function Keyboard() {
      let that = {
          keys : {}
      };
      function keyPress(e) {
          that.keys[e.key] = e.timeStamp;
      }
      function keyRelease(e) {
          delete that.keys[e.key];
      }
      window.addEventListener('keydown', keyPress);
      window.addEventListener('keyup', keyRelease);
      
      return that;
  }
  
  return {
      Keyboard : Keyboard
  };
}()).Keyboard();

function processInput() {
  switch (state) {
      case modesEnum.HOME:
        state = HomeScreen.processInput(input.keys);
        break;
      case modesEnum.LEVELS:
        state = LevelsScreen.processInput(input.keys);
        break;
      case modesEnum.CONTROLS:
        state = ControlsScreen.processInput(input.keys);
        break;
      case modesEnum.CREDITS:
        state = CreditsScreen.processInput(input.keys);
        break;
      case modesEnum.GAME:
        state = GameScreen.processInput(input.keys);
        break;
  }
}

function update(timeStamp) {
  switch (state) {
    case modesEnum.HOME:
      HomeScreen.update();
      break;
    case modesEnum.LEVELS:
      break;
    case modesEnum.CONTROLS:
      ControlsScreen.update();
      break;
    case modesEnum.CREDITS:
      break;
    case modesEnum.GAME:
      GameScreen.update();
      break;
  }
}

function render() {
  context.beginPath()
  context.rect(0, 0, canvasWidth, canvasHeight)
  context.fillStyle = "#595959"
  context.fill();
  context.closePath();
  context.fillStyle = "white"

  switch (state) {
    case modesEnum.HOME:
      HomeScreen.render();
      break;
    case modesEnum.LEVELS:
      LevelsScreen.render();
      break;
    case modesEnum.CONTROLS:
      ControlsScreen.render();
      break;
    case modesEnum.CREDITS:
      CreditsScreen.render();
      break;
    case modesEnum.GAME:
      GameScreen.render();
      break;
  }
}

function gameLoop(timeStamp) {
  processInput();
  update(timeStamp);
  render();

  requestAnimationFrame(gameLoop);
}

gameLoop();
