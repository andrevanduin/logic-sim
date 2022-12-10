import componentManager from "../componentManager.js";
import { TILE_SIZE } from "../constants.js";
import Renderer from "../renderer/renderer.js";
import BaseComponent from "./baseComponent";

export default class Output {
    id: string;
    x : number;
    y : number;
    width: number;
    height: number;
    parent: BaseComponent;
    signal: boolean;
    receiverId: string;
    
    constructor(iPos : number, jPos: number, parent : BaseComponent) {
        this.id = "INVALID_ID";
        this.x = iPos * TILE_SIZE + 4;
        this.y = jPos * TILE_SIZE + 2;
        this.width = TILE_SIZE - 4;
        this.height = TILE_SIZE - 4;

        this.parent = parent;
        
        this.signal = false;
        this.receiverId = "NONE";
    }

    setSignal(signal : boolean) {
        this.signal = signal;
    }

    outputSignal() {
        if (this.receiverId !== "NONE") {
            const receiver = componentManager.getInput(this.receiverId);
            if (receiver) {
                receiver.onReceiveSignal(this.signal);
            }
        }
    }

    onRender(renderer : Renderer) {
        renderer.setFillColor('#000');
        renderer.drawBox(this.parent.x + this.x, this.parent.y + this.y, this.width, this.height);
    }
}