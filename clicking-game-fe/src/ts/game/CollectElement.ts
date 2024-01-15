import { CanvasConstants } from "./CanvasConstants.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { elementTypeToShapeMap } from "./ElementTypeToShape.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { SurrondingRectangle } from "./SurroundingRectangle.js";

export class CollectElement extends GameElement {
    private width: number = 0;
    private height: number = 0;

    private speedY: number = 50;

    private IS_INITIAL_DIRECTION_UP: boolean = true;

    public static POINTS: number = 100;

    constructor(x: number, y: number, id: number, width: number, height: number) {
        super(x, y, id, GameElementType.COLLECT);
        this.color = 'green';
        this.width = width;
        this.height = height;

        this.surroundingRectangle = this.calculateSurroundingRectangle();

        setInterval(() => {
            this.doBehavior();
        }, 2000);
    }

    public doBehavior(): void {
        this.speedY = -this.speedY;

        this.y += this.speedY;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    public isClicked(x: number, y: number): boolean {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            return true;
        }

        return false;
    }

    public onClick(): ElementClickEvent {
        const event: ElementClickEvent = {
            gameElementId: this.id,
            points: CollectElement.POINTS,
            gameOver: false,
        }

        return event;
    }

    public calculateSurroundingRectangle(): SurrondingRectangle {
        const x = this.x;
        let y = this.y;
        const width = this.width;
        const height = this.height + Math.abs(this.speedY);

        if (this.IS_INITIAL_DIRECTION_UP) {
            y -= Math.abs(this.speedY);
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
}