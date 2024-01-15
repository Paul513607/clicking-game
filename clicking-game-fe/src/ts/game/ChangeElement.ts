import { AvoidElement } from "./AvoidElement.js";
import { CollectElement } from "./CollectElement.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { elementTypeToShapeMap } from "./ElementTypeToShape.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { SurrondingRectangle } from "./SurroundingRectangle.js";

export class ChangeElement extends GameElement {
    private length: number = 0;
    private subType: GameElementType = GameElementType.NONE;

    private rotationAngle: number = 0;
    private rotationSpeed: number = 0.05;
    
    private radius: number = 0;

    constructor(x: number, y: number, id: number, length: number) {
        super(x, y, id, GameElementType.CHANGE);
        this.color = 'green';
        this.length = length;
        this.subType = GameElementType.COLLECT;

        this.surroundingRectangle = this.calculateSurroundingRectangle();

        setInterval(() => {
            this.doBehavior();
        }, 5000);
    }

    public doBehavior(): void {
        if (this.subType === GameElementType.COLLECT) {
            this.subType = GameElementType.AVOID;
            this.color = 'red';
        } else {
            this.subType = GameElementType.COLLECT;
            this.color = 'green';
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x + this.length / 2, this.y + this.length / 2);
        this.rotationAngle += this.rotationSpeed;
        ctx.rotate(this.rotationAngle);

        ctx.beginPath();
        ctx.rect(-this.length / 2, -this.length / 2, this.length, this.length);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }

    public isClicked(x: number, y: number): boolean {
        if (x > this.x && x < this.x + this.length && y > this.y && y < this.y + this.length) {
            return true;
        }

        return false;
    }

    public onClick(): ElementClickEvent {
        let points: number = 0;
        let gameOver: boolean = false;
        if (this.subType === GameElementType.COLLECT) {
            points = CollectElement.POINTS;
        } else {
            points = AvoidElement.POINTS;
            gameOver = true;
        }

        const event: ElementClickEvent = {
            gameElementId: this.id,
            points: points,
            gameOver: gameOver,
        }

        return event;
    }

    public calculateSurroundingRectangle(): SurrondingRectangle {
        // find the center of the circle that this square is inscribed in
        this.radius = this.length * Math.sqrt(2) / 2;
        const radius = this.radius;
        const centerX = this.x + this.length / 2;
        const centerY = this.y + this.length / 2;

        // find the top left corner of the square that this circle is inscribed in
        const x = centerX - radius;
        const y = centerY - radius;
        const width = radius * 2;
        const height = radius * 2;

        return {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
}