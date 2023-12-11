import { AvoidElement } from "./AvoidElement.js";
import { CanvasConstants } from "./CanvasConstants.js";
import { ChangeElement } from "./ChangeElement.js";
import { CollectElement } from "./CollectElement.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementType } from "./GameElementType.js";

export class GameElementFactory {
    public static MIN_SIZE: number = 50;

    private static instance: GameElementFactory;

    private constructor() {
    }

    public static getInstance(): GameElementFactory {
        if (!GameElementFactory.instance) {
            GameElementFactory.instance = new GameElementFactory();
        }

        return GameElementFactory.instance;
    }

    public static getRandomSize(): number {
        return Math.random() * 100 + GameElementFactory.MIN_SIZE;
    }

    public createGameElement(type: GameElementType, id: number): GameElement {
                
        if (type == GameElementType.COLLECT) {
            const width = GameElementFactory.getRandomSize();
            const height = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - width) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - height) + CanvasConstants.CANVAS_START_Y; 

            return new CollectElement(x, y, id, width, height);
        } else if (type == GameElementType.AVOID) {
            const radius = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - radius * 2) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - radius * 2) + CanvasConstants.CANVAS_START_Y;

            return new AvoidElement(x, y, id, radius);
        } else if (type == GameElementType.CHANGE) {
            const length = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - length) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - length) + CanvasConstants.CANVAS_START_Y;

            return new ChangeElement(x, y, id, length);
        } else {
            throw new Error(`Invalid element type: ${type}`);
        }
    }
}