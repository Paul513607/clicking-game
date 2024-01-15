import { CanvasConstants } from "./CanvasConstants.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { elementTypeToShapeMap } from "./ElementTypeToShape.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { SurrondingRectangle } from "./SurroundingRectangle.js";

export class AvoidElement extends GameElement {
    private radius: number = 0;

    private speedX: number = 50;

    private static RADIUS_SHRINK_RATE: number = 0.75;

    private IS_INITIAL_DIRECTION_LEFT: boolean = true;

    public static POINTS: number = 0;

    constructor(x: number, y: number, id: number, radius: number) {
        super(x, y, id, GameElementType.AVOID);
        this.color = 'red';
        this.radius = radius * AvoidElement.RADIUS_SHRINK_RATE;

        this.surroundingRectangle = this.calculateSurroundingRectangle();

        setInterval(() => {
            this.doBehavior();
        }, 3000);
    }

    public doBehavior(): void {
        this.speedX = -this.speedX;

        this.x += this.speedX;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    public isClicked(x: number, y: number): boolean {
        const distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));

        if (distance < this.radius) {
            return true;
        }

        return false;
    }
    
    public onClick(): ElementClickEvent {
        const event: ElementClickEvent = {
            gameElementId: this.id,
            points: AvoidElement.POINTS,
            gameOver: true,
        }

        return event;
    }

    public calculateSurroundingRectangle(): SurrondingRectangle {
        let x = this.x - this.radius;
        const y = this.y - this.radius;
        const width = this.radius * 2 + Math.abs(this.speedX);
        const height = this.radius * 2;
        if (this.IS_INITIAL_DIRECTION_LEFT) {
            x -= Math.abs(this.speedX);
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    }
}