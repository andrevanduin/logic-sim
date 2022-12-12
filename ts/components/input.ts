import { SIGNAL_ENABLED_COLOR, SINGAL_DISABLED_COLOR, TILE_SIZE } from "../constants.js";
import Renderer from "../renderer/renderer";
import { vec2 } from "../utils/math.js";
import BaseComponent from "./baseComponent";

export default class Input {
    id: string;
    x : number;
    y : number;
    signal : boolean;
    width: number;
    height: number;
    parent: BaseComponent;
    
    constructor(iPos : number, jPos : number, parent : BaseComponent) {
        this.id = "INVALID_ID";
        this.x = iPos * TILE_SIZE;
        this.y = jPos * TILE_SIZE + 4;
        this.width = TILE_SIZE - 8;
        this.height = TILE_SIZE - 8;

        this.parent = parent;
        this.signal = false;
    }

    getWorldLocation() : vec2 {
        return { x: this.parent.x + this.x, y: this.parent.y + this.y }
    }

    onReceiveSignal(signal : boolean) {
        this.signal = signal;
        if (this.parent) {
            this.parent.onInputChanged();
        }
    }

    onRender(renderer : Renderer) {
        const color = this.signal ? SIGNAL_ENABLED_COLOR : SINGAL_DISABLED_COLOR;

        renderer.setFillColor(color);
        renderer.drawBox(this.parent.x + this.x, this.parent.y + this.y, this.width, this.height);
    }
}