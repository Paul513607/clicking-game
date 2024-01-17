import { CanvasConstants } from "./CanvasConstants.js";
import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";
import { Shape } from "./shape/Shape.js";

export class GameElementHelper {
    public static drawBasedOnShape(shape: GameElementShapeType, ctx: CanvasRenderingContext2D) : void {
        
    }  

    public static doBehaviorBasedOnAction(action: GameElementActionType, shape: Shape): void {
        switch (action) {
            case GameElementActionType.MOVE_X:
                this.moveX(shape);
                break;
            case GameElementActionType.MOVE_Y:
                this.moveY(shape);
                break;
            default:
                break;
        }
    }

    private static moveX(shape: Shape): void {
        shape.setSpeedX(-shape.getSpeedX());

        if (shape.getSpeedX() < 0 || shape.getX() + shape.getWidth() > CanvasConstants.CANVAS_WIDTH) {
            shape.setSpeedX(-shape.getSpeedX());
        }

        shape.setX(shape.getX() + shape.getSpeedX());
    }

    private static moveY(shape: Shape): void {
        shape.setSpeedY(-shape.getSpeedY());

        if (shape.getSpeedY() < 0 || shape.getY() + shape.getHeight() > CanvasConstants.CANVAS_HEIGHT) {
            shape.setSpeedY(-shape.getSpeedY());
        }

        shape.setY(shape.getY() + shape.getSpeedY());
    }
}