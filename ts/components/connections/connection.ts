
import componentManager from '../../componentManager.js';
import { SIGNAL_ENABLED_COLOR, SINGAL_DISABLED_COLOR } from '../../constants.js';
import Renderer from '../../renderer/renderer.js';
import { vec2 } from '../../utils/math.js';

export default class Connection {
    id: string;
    startId: string;
    endId: string;
    signal: boolean;
    connectors: Array<vec2>;

    constructor(startId: string, endId: string) {
        this.id = "INVALID_ID";
        this.startId = startId;
        this.endId = endId;
        this.signal = false;

        this.connectors = [];

        const output = this._getStart();
        if (output) {
            this.onUpdateSignal(output.signal);
        }
    }

    _getStart() {
        return componentManager.getOutput(this.startId);
    }

    _getEnd() {
        return componentManager.getInput(this.endId);
    }

    onUpdateSignal(signal : boolean) {
        this.signal = signal;
        const input = this._getEnd();
        if (input) {
            input.onReceiveSignal(signal);
        }
    }

    onRender(renderer : Renderer) {
        const output = componentManager.getOutput(this.startId);
        if (!output) return;

        const input = componentManager.getInput(this.endId);
        if (!input) return;

        const color = this.signal ? SIGNAL_ENABLED_COLOR : SINGAL_DISABLED_COLOR;
        renderer.setLineColor(color);
        renderer.setLineWidth(8);

        const connectors = [ output.getWorldLocation(), ...this.connectors, input.getWorldLocation() ];
        for (let i = 0; i < connectors.length - 1; i++) {
            const start = connectors[i];
            const end = connectors[i + 1];

            renderer.drawLine(start.x, start.y + 6, end.x, end.y + 6);
            if (i != connectors.length - 2) renderer.drawBox(end.x - 5, end.y, 10, 10);
        }
    }
}