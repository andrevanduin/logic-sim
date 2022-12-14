
import Input from './input/inputHandler.js';
import Renderer from './renderer/renderer.js';
import Grid from './renderer/grid.js';
import { Keys } from './input/key.js';
import componentManager from './componentManager.js';
import { Buttons } from './input/buttons.js';
import ConstantOutput from './components/default/constantOutput.js';
import ANDGate from './components/default/andGate.js';
import Connection from './components/connections/connection.js';

const renderer = new Renderer();
const grid = new Grid();
const input = new Input();

export default class Simulation {
    lastFrameTimeMs: number;
    maxFps: number;
    position: { x: number, y: number };

    constructor() {
        this.lastFrameTimeMs = 0;
        this.maxFps = 60;
        this.position = { x: 0, y: 0 };
    }

    init() {
        renderer.init();

        window.addEventListener('keydown', (e) => {
            console.log(e.key, e.keyCode);

            input.onKeyDown(e.keyCode);
        });

        window.addEventListener('keyup', (e) => input.onKeyUp(e.keyCode));

        window.addEventListener('mouseup', (e) => input.onMouseUp(e.button));
        window.addEventListener('mousedown', (e) => input.onMouseDown(e.button));

        window.addEventListener('mousemove', (e) => {
            input.mousePos.x = e.clientX;
            input.mousePos.y = e.clientY;
        });

        const outputA = new ConstantOutput(200, 100);
        const outputB = new ConstantOutput(200, 140);

        componentManager.addComponent(outputA);
        componentManager.addComponent(outputB);

        const and = new ANDGate(260, 100);
        componentManager.addComponent(and);
    
        const startAId = outputA.outputs[0];
        const endAId   = and.inputs[0];

        componentManager.addConnection(new Connection(startAId, endAId));

        const startBId = outputB.outputs[0];
        const endBId   = and.inputs[1];

        const connectionB = new Connection(startBId, endBId);
        connectionB.connectors.push({ x: 210, y: 144 });

        componentManager.addConnection(connectionB);
    }

    run(timeStamp : number) {
        // Only render maxFps frames per second at max
        if (timeStamp >= this.lastFrameTimeMs + (1000 / this.maxFps)) {
            const delta = timeStamp - this.lastFrameTimeMs;
            this.lastFrameTimeMs = timeStamp;

            this.onUpdate(delta)
            this.onRender();
        }

        // Otherwise just wait for another animation frame
        requestAnimationFrame((ts) => this.run.call(this, ts));
    }

    onUpdate(delta : number) {
        renderer.onUpdate();

        if (input.isKeyDown(Keys.ArrowRight)) {
            const newPos = this.position.x + 0.25 * delta;
            this.position.x = Math.round(newPos);
        }

        if (input.isKeyDown(Keys.ArrowDown)) {
            const newPos = this.position.y + 0.25 * delta;
            this.position.y = Math.round(newPos);
        }

        if (input.isKeyDown(Keys.ArrowLeft)) {
            const newPos = this.position.x - 0.25 * delta;
            this.position.x = Math.round(newPos);
            if (this.position.x < 0) this.position.x = 0;
        }

        if (input.isKeyDown(Keys.ArrowUp)) {
            const newPos = this.position.y - 0.25 * delta;
            this.position.y = Math.round(newPos);
            if (this.position.y < 0) this.position.y = 0;
        }

        renderer.setPosition(this.position);
        input.onUpdate(this.position);
    }

    onRender() {
        renderer.clear();

        grid.onRender(renderer);
        componentManager.onRender(renderer);

        input.onRender(renderer);

        renderer.setTextSize(20);
        renderer.setFillColor('#FFF');

        const screenPos = input.getScreenPos();
        const worldPos  = input.getWorldPos();

        const screenPosText = `ScreenPos(${screenPos.x}, ${screenPos.y})`;
        const worldPosText  = `WorldPos(${worldPos.x}, ${worldPos.y})`;
        const buttonsText   = `Buttons(${input.isButtonDown(Buttons.Left)}, ${input.isButtonDown(Buttons.Middle)}, ${input.isButtonDown(Buttons.Right)})`;

        renderer._drawText(screenPosText, renderer.screenWidth - renderer.getTextWidth(screenPosText) - 20, 30);
        renderer._drawText(worldPosText, renderer.screenWidth - renderer.getTextWidth(worldPosText) - 20, 55);
        renderer._drawText(buttonsText, renderer.screenWidth - renderer.getTextWidth(buttonsText) - 20, 80);
    }
}