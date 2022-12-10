
export default class Input {
    x : number;
    y : number;
    signal : boolean;
    
    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.signal = false;
    }

    onReceiveSignal(signal : boolean) {
        this.signal = signal;
    }
}