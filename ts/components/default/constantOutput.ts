import componentManager from "../../componentManager.js";
import { DEFAULT_CONST_OUTPUT_COLOR, DEFAULT_CONST_OUTPUT_WIDTH, DEFAULT_CONST_OUTPUT_HEIGHT } from "../../constants.js";
import BaseComponent from "../baseComponent.js";
import Output from "../output.js";

export default class ConstantOutput extends BaseComponent {
    constructor(x: number, y: number, iWidth: number = DEFAULT_CONST_OUTPUT_WIDTH, iHeight: number = DEFAULT_CONST_OUTPUT_HEIGHT, color: string = DEFAULT_CONST_OUTPUT_COLOR) {
        super(x, y, iWidth, iHeight, color);

        const output = new Output(0, 0, this);
        output.setSignal(true);

        this.outputs.push(componentManager.addOutput(output));
    }
}