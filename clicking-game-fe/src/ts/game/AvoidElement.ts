import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export class AvoidElement extends GameElement {
    private radius: number = 0;
    private speedX: number = 50;

    constructor(x: number, y: number, gameInstance: Game, radius: number) {
        super(x, y, gameInstance);
        this.type = GameElementType.AVOID;
        this.color = 'red';
        this.shape = GameElementShapeType.CIRCLE;
        this.radius = radius * 0.75;

        setInterval(() => {
            this.doBehavior();
        }, 3000);
    }

    public doBehavior(): void {
        this.speedX = -this.speedX;

        if (this.x < 0 || this.x + this.radius * 2 > Game.CANVAS_WIDTH) {
            this.speedX = -this.speedX;
        }

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
    
    public onClick(): void {
        this.gameInstance.stopGame(false);
        const index = this.gameInstance.getElements().indexOf(this);
    }
}