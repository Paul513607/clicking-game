import { GameElementShapeType } from "../GameElementShapeType.js";
import { Shape } from "./Shape.js";

export class Circle extends Shape {
    private radius: number = 0;
    private static RADIUS_SHRINK_RATE: number = 0.75;

    constructor(shapeType: GameElementShapeType, x: number, y: number, radius: number) {
        super(shapeType, x, y);
        this.radius = radius * Circle.RADIUS_SHRINK_RATE;
    }

    public draw(ctx: CanvasRenderingContext2D, color: string): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    
    public getWidth(): number {
        return this.radius * 2;
    }

    public getHeight(): number {
        return this.radius * 2;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        let distanceFromCenter: number = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2));
        return distanceFromCenter <= this.radius;
    }
}