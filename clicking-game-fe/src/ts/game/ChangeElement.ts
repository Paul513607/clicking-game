import { AvoidElement } from "./AvoidElement.js";
import { CollectElement } from "./CollectElement.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementHelper } from "./GameElementHelper.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Shape } from "./shape/Shape.js";

export class ChangeElement extends GameElement {
    private subType: GameElementType = GameElementType.NONE;

    constructor(id: number, shape: Shape, action: GameElementActionType) {
        super(id, GameElementType.CHANGE, shape, action);
        this.color = 'green';
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

        GameElementHelper.doBehaviorBasedOnAction(this.action, this.shape);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        this.shape.draw(ctx, this.color);
    }

    public isClicked(x: number, y: number): boolean {
        return this.shape.isClicked(x, y);
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
}