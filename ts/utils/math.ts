
export interface vec2 { x: number, y: number };
export interface square { x: number, y: number, width: number, height: number };

export function snapToNearest(value : number, round : number) : number {
    const v = value + round / 2;
    return v - (v % round);
}

export function hasOverlap(pos : vec2, dimensions : square) {
    return pos.x >= dimensions.x && pos.x <= dimensions.x + dimensions.width &&
        pos.y >= dimensions.y && pos.y <= dimensions.y + dimensions.height;
}