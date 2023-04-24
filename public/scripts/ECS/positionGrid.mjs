import { canvas } from "../game.mjs";

export function positionGrid(levelWidth, levelHeight) {
    const tileSize = canvas.height / levelHeight;
    const leftStart = (canvas.width - (levelWidth * tileSize)) / 2;

    function getX(xIndex) {
        return xIndex * tileSize + leftStart;
    }

    function getY(yIndex) {
        return yIndex * tileSize;
    }

    return {
        get tileSize() { return tileSize },
        get leftStart() { return leftStart },
        get positionGridWidth() { return tileSize * levelWidth },
        get positionGridHeight() { return tileSize * levelHeight },
        getX : getX,
        getY : getY
    }
}