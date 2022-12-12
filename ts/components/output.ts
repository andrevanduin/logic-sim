import componentManager from "../componentManager.js";
import { SIGNAL_ENABLED_COLOR, SINGAL_DISABLED_COLOR, TILE_SIZE } from "../constants.js";
import Renderer from "../renderer/renderer.js";
import { vec2 } from "../utils/math.js";
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
        this.x = iPos * TILE_SIZE + 8;
        this.y = jPos * TILE_SIZE + 4;
        this.width = TILE_SIZE - 8;
        this.height = TILE_SIZE - 8;

        this.parent = parent;
        
        this.signal = false;
        this.receiverId = "NONE";
    }

    getWorldLocation() : vec2 {
        return { x: this.parent.x + this.x, y: this.parent.y + this.y }
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
        const color = this.signal ? SIGNAL_ENABLED_COLOR : SINGAL_DISABLED_COLOR;

        renderer.setFillColor(color);
        renderer.drawBox(this.parent.x + this.x, this.parent.y + this.y, this.width, this.height);
    }
}