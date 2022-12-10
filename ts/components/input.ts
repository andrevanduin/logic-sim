import { TILE_SIZE } from "../constants.js";
import Renderer from "../renderer/renderer";
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
        this.y = jPos * TILE_SIZE + 2;
        this.width = TILE_SIZE - 4;
        this.height = TILE_SIZE - 4;

        this.parent = parent;
        this.signal = false;
    }

    onReceiveSignal(signal : boolean) {
        this.signal = signal;
    }

    onRender(renderer : Renderer) {
        renderer.setFillColor('#000');
        renderer.drawBox(this.parent.x + this.x, this.parent.y + this.y, this.width, this.height);
    }
}