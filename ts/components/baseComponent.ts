import { TILE_SIZE } from "../constants.js";
import Renderer from "../renderer/renderer";
import { snapToNearest, square, vec2 } from "../utils/math.js";
import Input from "./input";
import Output from "./output";

export default class BaseComponent {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    inputs: Array<Input>;
    outputs: Array<Output>;
    children: Array<BaseComponent>;
    dragStartPos: vec2;

    constructor(x : number, y : number, width : number, height : number, color: string) {
        this.id = "INVALID";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dragStartPos = { x: 0, y: 0 };

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
    }

    onStopDrag() {
        this.x = snapToNearest(this.x, TILE_SIZE);
        this.y = snapToNearest(this.y, TILE_SIZE);
        this.dragStartPos = { x: 0, y: 0 };
    }

    /* Method that gets called if any of this component's inputs change */
    onInputChanged() {
        
    }

    onRender(renderer : Renderer) {
        renderer.setFillColor(this.color);
        renderer.drawBox(this.x, this.y, this.width, this.height);
    }
}