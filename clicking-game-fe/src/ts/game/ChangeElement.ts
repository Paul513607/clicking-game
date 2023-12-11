import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export class ChangeElement extends GameElement {
    private length: number = 0;
    private subType: GameElementType = GameElementType.NONE;
    private rotationAngle: number = 0;
    private rotationSpeed: number = 0.05;
        
    constructor(x: number, y: number, gameInstance: Game, length: number) {
        super(x, y, gameInstance);
        this.type = GameElementType.CHANGE;
        this.color = 'green';
        this.shape = GameElementShapeType.SQUARE;
        this.length = length;
        this.subType = GameElementType.COLLECT;

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

    public onClick(): void {
        if (this.subType === GameElementType.COLLECT) {
            this.gameInstance.addToScore(100);

            const index = this.gameInstance.getElements().indexOf(this);
            if (index !== -1) {
                this.gameInstance.getElements().splice(index, 1);
            }
        } else {
            this.gameInstance.stopGame(false);
        }
    }
}