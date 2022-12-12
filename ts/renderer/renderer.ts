
export default class Renderer {
    canvas: HTMLCanvasElement | null;
    ctx: CanvasRenderingContext2D | null;
    lineWidth: number;
    lineColor: string;
    fillColor: string;
    position: { x: number, y: number };
    screenWidth: number;
    screenHeight: number;
    textSize: number;

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.lineWidth = 5;
        this.lineColor = '#000';
        this.fillColor = '#000';
        this.position = { x: 0, y: 0 };
        this.screenWidth = 0;
        this.screenHeight = 0;
        this.textSize = 20;
    }

    init() {
        this.canvas = document.querySelector('.canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }

    isOnScreen(x : number, y : number, width: number, height : number) {
        return x + width >= 0 && x <= screen.width && y + height >= 0 && y <= screen.height;
    }

    setLineWidth(width : number) {
        this.lineWidth = width;
        if (this.ctx) this.ctx.lineWidth = width;
    }

    setLineColor(color : string) {
        this.lineColor = color;
        if (this.ctx) this.ctx.strokeStyle = color;
    }

    setFillColor(color : string) {
        this.fillColor = color;
        if (this.ctx) this.ctx.fillStyle = color;
    }

    setPosition(pos : { x: number, y: number }) {
        this.position = pos;
    }

    setTextSize(size : number) {
        this.textSize = size;
        if (this.ctx) this.ctx.font = size + 'px Arial';
    }

    clear() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    }

    onUpdate() {
        if (this.screenWidth !== window.innerWidth || this.screenHeight !== window.innerHeight) {
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;

            if (this.canvas != null) {
                this.canvas.width = this.screenWidth;
                this.canvas.height = this.screenHeight;
            }
        }
    }

    getTextWidth(text : string) {
        if (!this.ctx) return 0;
        return this.ctx.measureText(text).width;
    }

    drawBox(x : number, y : number, width : number, height : number, stroke: boolean = false) {
        if (!this.ctx) return;

        const xPos = x - this.position.x;
        const yPos = y - this.position.y;

        if (!this.isOnScreen(xPos, yPos, width, height)) return;

        this.ctx.fillRect(xPos, yPos, width, height);

        if (stroke) {
            this.ctx.strokeStyle = this.lineColor;
            this.ctx.strokeRect(xPos, yPos, width, height);
        }
    }

    strokeBox(x : number, y : number, width : number, height: number) {
        if (!this.ctx) return;

        const xPos = x - this.position.x;
        const yPos = y - this.position.y;
        if (!this.isOnScreen(xPos, yPos, width, height)) return;

        this.ctx.strokeRect(xPos, yPos, width, height);
    }

    _drawLine(fromX : number, fromY : number, toX : number, toY : number) {
        if (!this.ctx) return;

        const xPosFrom = fromX - this.position.x;
        const yPosFrom = fromY - this.position.y;
        const xPosTo = toX - this.position.x;
        const yPosTo = toY - this.position.y;

        this.ctx.moveTo(xPosFrom, yPosFrom);
        this.ctx.lineTo(xPosTo, yPosTo);
    }

    _beginPath() {
        this.ctx?.beginPath();
    }

    _stroke() {
        this.ctx?.stroke();
    }

    drawLine(fromX : number, fromY : number, toX : number, toY : number) {
        if (!this.ctx) return;

        const xPosFrom = fromX - this.position.x;
        const yPosFrom = fromY - this.position.y;
        const xPosTo = toX - this.position.x;
        const yPosTo = toY - this.position.y;

        if (!this.isOnScreen(xPosFrom, yPosFrom, xPosTo - xPosFrom, yPosTo - yPosFrom)) return;
        
        this.ctx.beginPath();
            this.ctx.moveTo(xPosFrom, yPosFrom);
            this.ctx.lineTo(xPosTo, yPosTo);
        this._stroke();
    }

    _drawText(text : string, x : number, y : number, maxWidth : number | undefined = undefined) {
        this.ctx?.fillText(text, x, y, maxWidth);
    }

    drawText(text : string, x : number, y : number, maxWidth : number | undefined = undefined) {
        if (!this.ctx) return;
       
        const posX = x - this.position.x;
        const posY = y - this.position.y;
        const textWidth = this.ctx.measureText(text).width;
        const textHeight = this.textSize;

        if (!this.isOnScreen(posX, posY, textWidth, textHeight)) return;

        this._drawText(text, posX, posY, maxWidth);
    }
}