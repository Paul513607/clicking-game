import { GameElementShapeType } from "../GameElementShapeType.js";
import { Shape } from "./Shape.js";

export class Rectangle extends Shape {
    private width: number = 0;
    private height: number = 0;

    constructor(shapeType: GameElementShapeType, x: number, y: number, width: number, height: number) {
        super(shapeType, x, y);
        this.width = width;
        this.height = height;
    }

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        ctx.save();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }
}