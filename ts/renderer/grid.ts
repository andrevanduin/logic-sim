import Renderer from './renderer';
import { snapToNearest } from '../utils/math.js';
import { GRID_COLOR, TILE_SIZE } from '../constants.js';

export default class Grid {
    cellSize: number;

    constructor() {
        this.cellSize = 10;
    }

    onRender(renderer : Renderer) {
        renderer.setLineColor(GRID_COLOR);
        renderer.setLineWidth(1);
        renderer._beginPath();

        // We make sure our grid aligns on TILE_SIZE and starts 1 TILE_SIZE earlier
        // so we don't see pop-in on the left and top side
        const startX = snapToNearest(renderer.position.x, TILE_SIZE) - TILE_SIZE;
        const endX   = renderer.position.x + renderer.screenWidth;

        const startY = snapToNearest(renderer.position.y, TILE_SIZE) - TILE_SIZE;
        const endY   = renderer.position.y + renderer.screenHeight;

        for (let x = startX; x < endX; x += 20) {
            renderer._drawLine(x, startY, x, endY);
        }
        for (let y = startY; y < endY; y += 20) {
            renderer._drawLine(startX, y, endX, y);
        }

        renderer._stroke();
    }
}