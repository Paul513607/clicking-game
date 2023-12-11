import { AvoidElement } from "./AvoidElement.js";
import { ChangeElement } from "./ChangeElement.js";
import { CollectElement } from "./CollectElement.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementType } from "./GameElementType.js";

export class GameElementFactory {
    public MIN_SIZE: number = 50;
    public createGameElement(type: GameElementType, gameInstance: Game,
            canvasStartX: number, canvasStartY: number,
            canvasEndX: number, canvasEndY: number): GameElement {
        if (type == GameElementType.COLLECT) {
            const width = Math.random() * 100 + this.MIN_SIZE;
            const height = Math.random() * 100 + this.MIN_SIZE;
            const x = Math.random() * (canvasEndX - width) + canvasStartX;
            const y = Math.random() * (canvasEndY - height) + canvasStartY; 
            return new CollectElement(x, y, gameInstance, width, height);
        } else if (type == GameElementType.AVOID) {
            const radius = Math.random() * 100 + this.MIN_SIZE;
            const x = Math.random() * (canvasEndX - radius * 2) + canvasStartX;
            const y = Math.random() * (canvasEndY - radius * 2) + canvasStartY;
            return new AvoidElement(x, y, gameInstance, radius);
        } else if (type == GameElementType.CHANGE) {
            const length = Math.random() * 100 + this.MIN_SIZE;
            const x = Math.random() * (canvasEndX - length) + canvasStartX;
            const y = Math.random() * (canvasEndY - length) + canvasStartY;
            return new ChangeElement(x, y, gameInstance, length);
        } else {
            throw new Error(`Invalid element type: ${type}`);
        }
    }
}