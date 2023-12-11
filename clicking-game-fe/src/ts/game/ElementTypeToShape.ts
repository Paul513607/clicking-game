import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export const elementTypeToShapeMap = new Map([
    [GameElementType.COLLECT, GameElementShapeType.RECTANGLE],
    [GameElementType.AVOID, GameElementShapeType.CIRCLE],
    [GameElementType.CHANGE, GameElementShapeType.SQUARE],
]);