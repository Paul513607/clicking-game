import { GameElementParameters } from "../model/GameElementParameters.js";
import { elementTypeMap, elementShapeMap, elementActionMap } from "../game/StringToEnumMapper.js";

export class GameElementService {
    private static instance: GameElementService;

    private constructor() {
    }

    public static getInstance(): GameElementService {
        if (!GameElementService.instance) {
            GameElementService.instance = new GameElementService();
        }
        return GameElementService.instance;
    }

    public getGameElementsAsParameters(): GameElementParameters[] {
        const json = '{ "elements": [' + 
            '{"type": "COLLECT", "shape": "RECTANGLE", "action": "MOVE_X"},' +
            '{"type": "AVOID", "shape": "CIRCLE", "action": "MOVE_Y"},' +
            '{"type": "CHANGE", "shape": "SQUARE", "action": "MOVE_X"},' +
            '{"type": "COLLECT", "shape": "RECTANGLE", "action": "MOVE_Y"},' +
            '{"type": "AVOID", "shape": "CIRCLE", "action": "MOVE_Y"}' +
            ']}';
        console.log(json);
        const jsonAsObject = JSON.parse(json);
        const gameElementsStrings = jsonAsObject.elements;
        const gameElements: GameElementParameters[] = gameElementsStrings.map((gameElementString: any) => {
            return {
                type: elementTypeMap.get(gameElementString.type),
                shape: elementShapeMap.get(gameElementString.shape),
                action: elementActionMap.get(gameElementString.action)
            };
        });
        console.log(gameElements);

        return gameElements;
    }
}