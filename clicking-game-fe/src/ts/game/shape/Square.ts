import { GameElementShapeType } from "../GameElementShapeType.js";
import { Shape } from "./Shape.js";

export class Square extends Shape {
    private length: number = 0;

    constructor(shapeType: GameElementShapeType, x: number, y: number, length: number) {
        super(shapeType, x, y);
        this.length = length;
    }

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        ctx.save();
        ctx.fillRect(this.x, this.y, this.length, this.length);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    
    public getWidth(): number {
        return this.length;
    }

    public getHeight(): number {
        return this.length;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        return mouseX >= this.x && mouseX <= this.x + this.length && mouseY >= this.y && mouseY <= this.y + this.length;
    }
}