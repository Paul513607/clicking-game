import { CanvasConstants } from "./CanvasConstants.js";
import { ElementClickEvent } from "./ElementClickEvent.js";
import { GameElement } from "./GameElement.js";
import { GameElementFactory } from "./GameElementFactory.js";
import { GameElementType } from "./GameElementType.js";

export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private elements: GameElement[] = [];
    private timer: number = 0;
    private isGameRunning: boolean = false;

    public static GAME_ELEMENT_COUNT: number = 10;

    public static readonly MIN_CENTER_DISTANCE: number = 100;

    public score: number = 0;

    public timeElapsed: number = 0;
    private timerInterval: NodeJS.Timeout | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = CanvasConstants.CANVAS_WIDTH;
        this.canvas.height = CanvasConstants.CANVAS_HEIGHT;
        this.setupGame();
    }

    public getElements(): GameElement[] {
        return this.elements;
    }

    public setElements(elements: GameElement[]): void {
        this.elements = elements;
    }

    public setupGame() {
        this.elements = [];
        this.canvas.addEventListener('click', (event: MouseEvent) => {
            const x: number = event.clientX - this.canvas.offsetLeft;
            const y: number = event.clientY - this.canvas.offsetTop;

            const toRemove: GameElement[] = [];
            for (const element of this.elements) {
                if (element.isClicked(x, y)) {
                    let elementClickEvent: ElementClickEvent = element.onClick();
                    if (elementClickEvent.gameOver) {
                        this.stopGame(false);
                        break;
                    }

                    this.score += elementClickEvent.points;
                    toRemove.push(element);
                }
            }

            this.elements = this.elements.filter((element: GameElement) => {
                return !toRemove.includes(element);
            });
        });
        this.score = 0;
        this.timeElapsed = 0;
        
        const factory = GameElementFactory.getInstance();
        const types: GameElementType[] = [GameElementType.COLLECT, GameElementType.AVOID, GameElementType.CHANGE];

        for (let i = 0; i < Game.GAME_ELEMENT_COUNT; i++) {
            const randomType: GameElementType = types[Math.floor(Math.random() * types.length)];
            const element = factory.createGameElement(randomType, i);

            // check if element is overlapping with other elements
            let isOverlapping = false;
            for (const otherElement of this.elements) {
                if (Math.sqrt(Math.pow(element.getX() - otherElement.getX(), 2) + 
                            Math.pow(element.getY() - otherElement.getY(), 2)) < Game.MIN_CENTER_DISTANCE) {
                    isOverlapping = true;
                    break;
                }
            }
            
            if (isOverlapping) {
                i--;
                continue;
            }
                
            this.elements.push(element);
        }

        this.drawGame();
        this.startGameLoop();
        this.startTimer();
    }

    private startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeElapsed += 1;
        }, 1000);
    }

    private stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    private drawGame() {
        this.ctx.clearRect(0, 0, CanvasConstants.CANVAS_WIDTH, CanvasConstants.CANVAS_HEIGHT);

        for (const element of this.elements) {
            element.draw(this.ctx);
            // element.doBehavior();
        }
    }

    private checkIfWin(): boolean {
        for (const element of this.elements) {
            if (element.getType() === GameElementType.COLLECT || element.getType() === GameElementType.CHANGE) {
                return false;
            }
        }
        return true;
    }
            

    private startGameLoop() {
        this.isGameRunning = true;
        const updateInterval = 4;
        setInterval(() => {
            if (this.isGameRunning) {
                this.drawGame();
                if (this.checkIfWin()) {
                    this.stopGame(true);
                }
            }
        }, updateInterval);
    }

    public stopGame(isWin: boolean) {
        this.isGameRunning = false;
        this.stopTimer();
        
        if (isWin) {
            localStorage.setItem('score', this.score.toString());
            localStorage.setItem('duration', this.timeElapsed.toString());

            window.location.href = '/game-win';
        } else {
            window.location.href = '/game-fail';
        }
    }

    public addToScore(points: number) {
        this.score += points;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const game = new Game(canvas);

    game.setupGame();
});