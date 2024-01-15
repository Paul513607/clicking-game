import { ElementClickEvent } from "./ElementClickEvent.js";
import { elementTypeToShapeMap } from "./ElementTypeToShape.js";
import { Game } from "./Game.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { SurrondingRectangle } from "./SurroundingRectangle.js";

export abstract class GameElement {
    protected x: number = 0;
    protected y: number = 0;
    protected id: number = 0;

    protected type: GameElementType = GameElementType.NONE;
    protected color: string = '';
    protected shape: GameElementShapeType = GameElementShapeType.NONE;

    protected surroundingRectangle: SurrondingRectangle | null = null;

    constructor(x: number, y: number, id: number, type: GameElementType) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.type = type;
        this.shape = elementTypeToShapeMap.get(type) as GameElementShapeType;
    }

    public getType(): GameElementType {
        return this.type;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getId(): number {
        return this.id;
    }

    public abstract doBehavior(): void;

    public abstract draw(ctx: CanvasRenderingContext2D): void;

    public abstract isClicked(x: number, y: number): boolean;

    public abstract onClick(): ElementClickEvent;

    public abstract calculateSurroundingRectangle(): SurrondingRectangle;

    public getSurroundingRectangle(): SurrondingRectangle | null {
        return this.surroundingRectangle;
    }

    public setSurroundingRectangle(surroundingRectangle: SurrondingRectangle): void {
        this.surroundingRectangle = surroundingRectangle;
    }
}