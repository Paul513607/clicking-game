import { GameElementActionType } from "../game/GameElementActionType.js";
import { GameElementShapeType } from "../game/GameElementShapeType.js";
import { GameElementType } from "../game/GameElementType.js";

export interface GameElementParameters {
    type: GameElementType, 
    shape: GameElementShapeType,
    action: GameElementActionType
}