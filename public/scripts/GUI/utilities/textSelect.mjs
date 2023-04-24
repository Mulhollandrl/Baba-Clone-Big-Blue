import { textHoveredColor } from "../../state/consts.mjs";
import { controlsKeys } from "../../state/globals.mjs";

export function textSelect (specs, windowWidth, context, varToFollow){
    let hovered = false;
    let selected = false;

    function render() {
        let text = `${specs.text}`
        context.beginPath();

        if (!hovered) {
            context.fillStyle = "#ffffff";
        } else {
            if (selected) {
                context.fillStyle = "#00cc00"
            } else {
                context.fillStyle = textHoveredColor;
            }
        }

        context.font = "24px Courier";
        let fontHeight = context.measureText("m").width;

        if (varToFollow !== undefined) {
            text = `${specs.text}${controlsKeys[varToFollow]}`
        }

        context.fillText(text, (windowWidth/2) - (context.measureText(text).width/2), specs.y + (specs.height/2) + (fontHeight/2));
        context.closePath();
    }

    function hover() {
        hovered = true;
    }
    
    function unhover() {
        hovered = false;
    }

    function select() {
        selected = true;
    }

    function unselect() {
        selected = false;
    }

    function changeVarToFollow(key) {
        controlsKeys[varToFollow] = key;
    }

    return {
        render : render,
        hover : hover,
        unhover : unhover,
        select : select,
        unselect : unselect,
        changeVarToFollow : changeVarToFollow
    }
}