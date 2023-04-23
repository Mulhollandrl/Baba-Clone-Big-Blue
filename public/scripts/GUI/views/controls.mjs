// This is a file to make a gui for seeing and changing controls for the game
import { button } from "../utilities/buttons.mjs";
import { textSelect } from "../utilities/textSelect.mjs";
import { modesEnum } from "../../state/enums.mjs";
import { controlsKeys } from "../../state/globals.mjs";
import Keyboard from "../../inputs/Keyboard.js"

export function controlsPage (windowWidth, windowHeight, context){
    let backButton = button({y: windowHeight - (100), height: 50, text: "Back!"}, windowWidth, context);
    let upControl = textSelect({y: 125, height: 50, text: "Up Control: "}, windowWidth, context, 'up');
    let downControl = textSelect({y: 175, height: 50, text: "Down Control: "}, windowWidth, context, 'down');
    let leftControl = textSelect({y: 225, height: 50, text: "Left Control: "}, windowWidth, context, 'left');
    let rightControl = textSelect({y: 275, height: 50, text: "Right Control: "}, windowWidth, context, 'right');
    let selectControl = textSelect({y: 325, height: 50, text: "Select Control: "}, windowWidth, context, 'select');
    let leaveControl = textSelect({y: 375, height: 50, text: "Exit Control: "}, windowWidth, context, 'leave');

    let allControls = [];

    let selectedButton = 0;
    let locked = 0;

    allControls.push(upControl);
    allControls.push(downControl);
    allControls.push(leftControl);
    allControls.push(rightControl);
    allControls.push(selectControl);
    allControls.push(leaveControl);
    
    function unhoverAll() {
        backButton.unhover();
        upControl.unhover();
        downControl.unhover();
        leftControl.unhover();
        rightControl.unhover();
        selectControl.unhover();
        leaveControl.unhover();
    }
    
    function processInput(keys) {
        // TODO: We need to put a function here haha

        if (keys.hasOwnProperty(controlsKeys.down)) {
            if (locked !== 0 && locked !== 5) {
                allControls[locked-1].changeVarToFollow(controlsKeys.down);
                locked = 0;
            } else {
                selectedButton++;

                if (selectedButton > 6) {
                    selectedButton = 0
                }
            }

            delete keys[controlsKeys.down]
        }

        if (keys.hasOwnProperty(controlsKeys.up)) {
            if (locked !== 0 && locked !== 5) {
                allControls[locked-1].changeVarToFollow(controlsKeys.up);
                locked = 0;
            } else {
                selectedButton--;
                
                if (selectedButton < 0) {
                    selectedButton = 6;
                }
            }
            
            delete keys[controlsKeys.up];
        }
        
        if (keys.hasOwnProperty(controlsKeys.select)) {
            delete keys[controlsKeys.select];
            
            if (selectedButton === 0) {
                return modesEnum.HOME;
            } else {
                locked = selectedButton;
            }
        }
        
        if (locked !== 0 && locked !== 5 && Object.keys(keys)[0] !== undefined) {
            debugger
            console.log(Object.keys(keys)[0])
            if (locked === 5) {
                console.log("WRONG!!")
            }
            allControls[locked-1].changeVarToFollow(Object.keys(keys)[0]);
            locked = 0;

            delete Object.keys(keys)[0];
        }

        return modesEnum.CONTROLS;
    }

    function update() {
        unhoverAll();

        switch (selectedButton) {
            case 0:
                backButton.hover();
                break;
            case 1:
                upControl.hover();
                break;
            case 2:
                downControl.hover();
                break;
            case 3:
                leftControl.hover();
                break;
            case 4:
                rightControl.hover();
                break;
            case 5:
                selectControl.hover();
                break;
            case 6:
                leaveControl.hover();
                break;
        }
    }

    function render() {
        let title = "Controls";
        let controls = "Hover over a control  press a key to change it!";

        context.font = "48px Courier";

        let fontHeight = context.measureText("m").width;

        context.fillText(title, (windowWidth/2) - (context.measureText(title).width/2), 50 + (fontHeight/2));

        context.font = "24px Courier";

        fontHeight = context.measureText("m").width;

        context.fillText(controls, (windowWidth/2) - (context.measureText(controls).width/2), 100 + (fontHeight/2));

        upControl.render();
        downControl.render();
        leftControl.render();
        rightControl.render();
        selectControl.render();
        leaveControl.render();

        backButton.render();
    }

    return {
        processInput : processInput,
        update : update,
        render : render
    }
}