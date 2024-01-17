import { CanvasConstants } from "./CanvasConstants.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementHelper } from "./GameElementHelper.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Shape } from "./shape/Shape.js";

export class AvoidElement extends GameElement {
    public static POINTS: number = 0;

    constructor(id: number, shape: Shape, action: GameElementActionType) {
        super(id, GameElementType.AVOID, shape, action);
        this.color = 'red';

        setInterval(() => {
            this.doBehavior();
        }, 3000);
    }

    public doBehavior(): void {
        GameElementHelper.doBehaviorBasedOnAction(this.action, this.shape);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.shape.draw(ctx, this.color);
    }

    public isClicked(x: number, y: number): boolean {
        return this.shape.isClicked(x, y);
    }
    
    public onClick(): ElementClickEvent {
        const event: ElementClickEvent = {
            gameElementId: this.id,
            points: AvoidElement.POINTS,
            gameOver: true,
        }

        return event;
    }
}