import componentManager from "../../componentManager.js";
import { DEFAULT_AND_WIDTH, DEFAULT_AND_HEIGHT, DEFAULT_AND_COLOR } from "../../constants.js";
import BaseComponent from "../baseComponent.js";
import Input from '../input.js';
import Output from "../output.js";

export default class ANDGate extends BaseComponent {
    constructor(x: number, y: number, iWidth: number = DEFAULT_AND_WIDTH, iHeight: number = DEFAULT_AND_HEIGHT, color: string = DEFAULT_AND_COLOR) {
        super(x, y, iWidth, iHeight, color);

        const output = new Output(0, 0, this);
        output.setSignal(true);

        
        this.inputs.push(componentManager.addInput(new Input(0, 0, this)));
        this.inputs.push(componentManager.addInput(new Input(0, 2, this)));

        this.outputs.push(componentManager.addOutput(new Output(2, 1, this)));
    }
}