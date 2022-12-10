import componentManager from "../componentManager.js";
import BaseComponent from "../components/baseComponent";
import { vec2 } from "../utils/math";
import { Buttons } from "./buttons.js";

export default class InputHandler {
    keys: Map<number, boolean>;
    prevKeys: Map<number, boolean>;
    buttons: Map<number, boolean>;
    prevButtons: Map<number, boolean>;
    mousePos: vec2;
    position: vec2;
    dragComponent: BaseComponent | null;

    constructor() {
        this.keys = new Map();
        this.prevKeys = new Map();

        this.buttons = new Map();
        this.prevButtons = new Map();

        this.mousePos = { x: 0, y: 0 };
        this.position = { x: 0, y: 0 };

        this.dragComponent = null;
    }

    getScreenPos() {
        return this.mousePos;
    }

    getWorldPos() {
        return { x: this.mousePos.x + this.position.x, y: this.mousePos.y + this.position.y };
    }

    onKeyDown(keyCode : number) {
        this.keys.set(keyCode, true);
    }

    onMouseDown(button : number) {
        this.buttons.set(button, true);
    }

    onKeyUp(keyCode : number) {
        this.keys.set(keyCode, false);
    }
    
    onMouseUp(button : number) {
        this.buttons.set(button, false);
    }

    isKeyDown(keyCode : number) {
        return this.keys.get(keyCode) === true;
    }

    isButtonDown(mouseButton : number) {
        return this.buttons.get(mouseButton) === true;
    }

    wasButtonDown(mouseButton : number) {
        return this.prevButtons.get(mouseButton) === true;
    }

    isKeyUp(keyCode : number) {
        return this.keys.get(keyCode) === false;
    }

    isButtonUp(mouseButton : number) {
        return this.buttons.get(mouseButton) === true;
    }

    isKeyPressed(keyCode : number) {
        return this.keys.get(keyCode) === false && this.prevKeys.get(keyCode) === true;
    }

    isButtonPressed(mouseButton : number) {
        return this.buttons.get(mouseButton) === true;
    }

    onUpdate(position : vec2) {
        this.position = position;
        // First we get the world pos
        const worldPos = this.getWorldPos();

        if (this.isButtonDown(Buttons.Left) && !this.wasButtonDown(Buttons.Left)) {
            // Just pressed the left mouse button down

            // Find if we clicked a component
            const component = componentManager.getComponentByPosition(worldPos);

            // If there is no component we stop
            if (component === null) return;

            // Otherwise we start dragging this component
            this.dragComponent = component;
            this.dragComponent.onStartDrag(worldPos);
        }

        if (!this.isButtonDown(Buttons.Left)) {
            // Left mouse is no longer down so we stop dragging
            if (this.dragComponent) {
                this.dragComponent.onStopDrag();
                this.dragComponent = null;
            }
        }

        // Currently dragging a component
        if (this.dragComponent) {
            this.dragComponent.onDrag(worldPos);
        }

        for (const [key, value] of this.keys.entries()) {
            this.prevKeys.set(key, value);
        }
        for (const [key, value] of this.buttons.entries()) {
            this.prevButtons.set(key, value);
        }
    }
}