
// @ts-ignore
import { v4 as UUID } from "./utils/uuid.js";
import BaseComponent from "./components/baseComponent";
import Input from "./components/input.js";
import Output from "./components/output";
import Renderer from "./renderer/renderer";
import { hasOverlap, vec2 } from "./utils/math.js";
import Connection from "./components/connections/connection";

class ComponentManager {
    components : Map<string, BaseComponent>;
    inputs: Map<string, Input>;
    outputs: Map<string, Output>;
    connections: Map<string, Connection>;

    constructor() {
        this.components = new Map();
        this.inputs = new Map();
        this.outputs = new Map();
        this.connections = new Map();
    }

    addComponent(component : BaseComponent) : string {
        const id = UUID();
        this.components.set(id, component);
        component.id = id;
        return id;
    }

    addInput(input : Input) : string {
        const id = UUID();
        this.inputs.set(id, input);
        input.id = id;
        return id;
    }

    addOutput(output : Output) : string {
        const id = UUID();
        this.outputs.set(id, output);
        output.id = id;
        return id;
    }

    addConnection(connection : Connection) : string {
        const id = UUID();
        this.connections.set(id, connection);
        connection.id = id;
        return id;
    }

    getComponent(id : string) {
        if (!this.components.has(id)) {
            throw new Error(`Component with id: '${id}' could not be found!`);
        }
        return this.components.get(id); 
    }

    getComponentByPosition(worldPos : vec2) {
        for (const comp of this.components.values()) {
            if (hasOverlap(worldPos, comp.getDimensions())) {
                return comp;
            }
        }
        return null;
    }

    getInput(id : string) {
        if (!this.inputs.has(id)) {
            throw new Error(`Input with id: '${id}' could not be found!`);
        }
        return this.inputs.get(id); 
    }

    getOutput(id : string) {
        if (!this.outputs.has(id)) {
            throw new Error(`Output with id: '${id}' could not be found!`);
        }
        return this.outputs.get(id); 
    }

    onRender(renderer : Renderer) {
        for (const component of this.components.values()) {
            component.onRender(renderer);
        }

        for (const input of this.inputs.values()) {
            input.onRender(renderer);
        }

        for (const output of this.outputs.values()) {
            output.onRender(renderer);
        }

        for (const connection of this.connections.values()) {
            connection.onRender(renderer);
        }
    }
}

const componentManager = new ComponentManager();
export default componentManager;