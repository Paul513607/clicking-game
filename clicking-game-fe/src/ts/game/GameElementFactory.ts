import { AvoidElement } from "./AvoidElement.js";
import { CanvasConstants } from "./CanvasConstants.js";
import { ChangeElement } from "./ChangeElement.js";
import { CollectElement } from "./CollectElement.js";
import { Game } from "./Game.js";
import { GameElement } from "./GameElement.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Circle } from "./shape/Circle.js";
import { Rectangle } from "./shape/Rectangle.js";
import { Shape } from "./shape/Shape.js";

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

    public createGameElement(type: GameElementType, shapeType: GameElementShapeType, actionType: GameElementActionType, id: number): GameElement {
        let shape: Shape;

        shape = this.createShape(shapeType);

        switch (type) {
            case GameElementType.COLLECT:
                return new CollectElement(id, shape, actionType);
            case GameElementType.AVOID:
                return new AvoidElement(id, shape, actionType);
            case GameElementType.CHANGE:
                return new ChangeElement(id, shape, actionType);
            default:
                throw new Error(`Invalid element type: ${type}`);
        }
    }

    private createShape(shapeType: GameElementShapeType): Shape {
        let shape: Shape;

        if (shapeType == GameElementShapeType.RECTANGLE) {
            const width = GameElementFactory.getRandomSize();
            const height = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - width) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - height) + CanvasConstants.CANVAS_START_Y; 

            shape = new Rectangle(shapeType, x, y, width, height);
        } else if (shapeType == GameElementShapeType.CIRCLE) {
            const radius = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - radius * 2) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - radius * 2) + CanvasConstants.CANVAS_START_Y;

            shape = new Circle(shapeType, x, y, radius);
        } else if (shapeType == GameElementShapeType.SQUARE) {
            const length = GameElementFactory.getRandomSize();

            const x = Math.random() * (CanvasConstants.CANVAS_END_X - length) + CanvasConstants.CANVAS_START_X;
            const y = Math.random() * (CanvasConstants.CANVAS_END_Y - length) + CanvasConstants.CANVAS_START_Y;

            shape = new Rectangle(shapeType, x, y, length, length);
        } else {
            throw new Error(`Invalid element shape type: ${shapeType}`);
        }

        return shape;
    }
}