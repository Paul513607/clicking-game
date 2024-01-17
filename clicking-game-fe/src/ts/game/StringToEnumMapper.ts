import { GameElementActionType } from "./GameElementActionType.js";
import { GameElementShapeType } from "./GameElementShapeType.js";
import { GameElementType } from "./GameElementType.js";

export const elementTypeMap = new Map([
    ["NONE", GameElementType.NONE],
    ["COLLECT", GameElementType.COLLECT],
    ["AVOID", GameElementType.AVOID],
    ["CHANGE", GameElementType.CHANGE],
]);

export const elementShapeMap = new Map([
    ["NONE", GameElementShapeType.NONE],
    ["RECTANGLE", GameElementShapeType.RECTANGLE],
    ["CIRCLE", GameElementShapeType.CIRCLE],
    ["SQUARE", GameElementShapeType.SQUARE],
]);

export const elementActionMap = new Map([
    ["NONE", GameElementActionType.NONE],
    ["MOVE_X", GameElementActionType.MOVE_X],
    ["MOVE_Y", GameElementActionType.MOVE_Y],
]);