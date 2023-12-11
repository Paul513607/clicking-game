import { Game } from "./Game.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export abstract class GameElement {
    protected x: number = 0;
    protected y: number = 0;

    protected type: GameElementType = GameElementType.NONE;
    protected color: string = '';
    protected shape: GameElementShapeType = GameElementShapeType.NONE;

    protected gameInstance: Game;

    constructor(x: number, y: number, gameInstance: Game) {
        this.x = x;
        this.y = y;
        this.gameInstance = gameInstance;
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

    public abstract doBehavior(): void;

    public abstract draw(ctx: CanvasRenderingContext2D): void;

    public abstract isClicked(x: number, y: number): boolean;

    public abstract onClick(): void;
}