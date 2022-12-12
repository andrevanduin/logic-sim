
import { TILE_SIZE } from "../constants.js";
import { snapToNearest, square, vec2 } from "../utils/math.js";

import Renderer from "../renderer/renderer";
import Input from "./input.js";
import Output from "./output.js";

import componentManager from "../componentManager.js";

export default class BaseComponent {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    inputs: Array<string>;
    outputs: Array<string>;
    children: Array<BaseComponent>;
    dragStartPos: vec2;
    inDrag: boolean;

    constructor(x : number, y : number, iWidth : number, iHeight : number, color: string) {
        this.id = "INVALID";
        this.x = x;
        this.y = y;
        this.width = iWidth * TILE_SIZE;
        this.height = iHeight * TILE_SIZE;
        this.color = color;
        this.dragStartPos = { x: 0, y: 0 };
        this.inDrag = false;

        this.inputs = [];
        this.outputs = [];
        this.children = [];
    }

    getDimensions() : square {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    onDrag(worldPos : vec2) {
        const deltaX = worldPos.x - this.dragStartPos.x;
        const deltaY = worldPos.y - this.dragStartPos.y;

        this.x += deltaX;
        this.y += deltaY;

        this.dragStartPos = worldPos;
    }

    onStartDrag(worldPos : vec2) {
        this.dragStartPos = worldPos;
        this.inDrag = true;
    }

    onStopDrag() {
        this.x = snapToNearest(this.x, TILE_SIZE);
        this.y = snapToNearest(this.y, TILE_SIZE);
        this.dragStartPos = { x: 0, y: 0 };
        this.inDrag = false;
    }

    /* Method that gets called if any of this component's inputs change */
    onInputChanged() {
        const inputs = this.inputs.map(input => componentManager.getInput(input));

        // AND-gate (all inputs must be true in order for the output to be true)
        let newSingal = true;
        for (const input of inputs) {
            if (input && !input.signal) newSingal = false;
        }

        const output = componentManager.getOutput(this.outputs[0]);
        if (output) output.setSignal(newSingal);
    }

    onRender(renderer : Renderer) {
        const color = this.inDrag ? this.color + '20' : this.color;

        renderer.setFillColor(color);
        renderer.drawBox(this.x, this.y, this.width, this.height);
    }
}