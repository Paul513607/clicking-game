import { CanvasConstants } from "./CanvasConstants.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementHelper } from "./GameElementHelper.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Shape } from "./shape/Shape.js";

export class CollectElement extends GameElement {
    public static POINTS: number = 100;

    constructor(id: number, shape: Shape, action: GameElementActionType) {
        super(id, GameElementType.COLLECT, shape, action);
        this.color = 'green';

        setInterval(() => {
            this.doBehavior();
        }, 2000);
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
            points: CollectElement.POINTS,
            gameOver: false,
        }

        return event;
    }
}