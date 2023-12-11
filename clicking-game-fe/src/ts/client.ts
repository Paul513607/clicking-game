import { Game } from "./game/Game.js";

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton') as HTMLButtonElement;
    startButton.addEventListener('click', () => window.location.href = '/game');
});
