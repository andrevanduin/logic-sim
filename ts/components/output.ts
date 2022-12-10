import componentManager from "../componentManager";

export default class Output {
    x : number;
    y : number;
    signal: boolean;
    receiverId: string;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
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
}