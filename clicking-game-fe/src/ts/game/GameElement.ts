import { ElementClickEvent } from "./ElementClickEvent.js";
import { Game } from "./Game.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Shape } from "./shape/Shape.js";

export abstract class GameElement {
    protected id: number = 0;

    protected type: GameElementType = GameElementType.NONE;
    protected color: string = '';
    protected shape: Shape;
    protected action: GameElementActionType = GameElementActionType.NONE;

    constructor(id: number, type: GameElementType, shape: Shape, action: GameElementActionType) {
        this.id = id;
        this.type = type;
        this.shape = shape;
        this.action = action;
    }

    public getType(): GameElementType {
        return this.type;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public getAction(): GameElementActionType {
        return this.action;
    }

    public getId(): number {
        return this.id;
    }

    public abstract doBehavior(): void;

    public abstract draw(ctx: CanvasRenderingContext2D): void;

    public abstract isClicked(x: number, y: number): boolean;

    public abstract onClick(): ElementClickEvent;
}