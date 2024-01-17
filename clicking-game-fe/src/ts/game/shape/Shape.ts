import { GameElementShapeType } from "../GameElementShapeType.js";

export abstract class Shape {
    protected shapeType: GameElementShapeType;
    protected x: number;
    protected y: number;

    protected speedX: number = 50;
    protected speedY: number = 50;

    constructor(shapeType: GameElementShapeType, x: number, y: number) {
        this.shapeType = shapeType;
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getSpeedX(): number {
        return this.speedX;
    }

    public getSpeedY(): number {
        return this.speedY;
    }

    public setSpeedX(speedX: number): void {
        this.speedX = speedX;
    }

    public setSpeedY(speedY: number): void {
        this.speedY = speedY;
    }

    public abstract draw(ctx: CanvasRenderingContext2D, color: string): void;
    public abstract getWidth(): number;
    public abstract getHeight(): number;
    public abstract isClicked(mouseX: number, mouseY: number): boolean;
}