import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export class CollectElement extends GameElement {
    private width: number = 0;
    private height: number = 0;
    private speedY: number = 50;

    constructor(x: number, y: number, gameInstance: Game, width: number, height: number) {
        super(x, y, gameInstance);
        this.type = GameElementType.COLLECT;
        this.color = 'green';
        this.shape = GameElementShapeType.RECTANGLE;
        this.width = width;
        this.height = height;

        setInterval(() => {
            this.doBehavior();
        }, 2000);
    }

    public doBehavior(): void {
        this.speedY = -this.speedY;

        if (this.y < 0 || this.y + this.height > Game.CANVAS_HEIGHT) {
            this.speedY = -this.speedY;
        }

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

    public onClick(): void {
        this.gameInstance.addToScore(100);
        const index = this.gameInstance.getElements().indexOf(this);
        if (index !== -1) {
            this.gameInstance.getElements().splice(index, 1);
        }
    }
}