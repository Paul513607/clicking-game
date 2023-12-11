import { UserService } from "./services/UserService.js";

const userService = new UserService();

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('win-form-button') as HTMLButtonElement;
    button.addEventListener('click', async () => {
        const nameInput = document.getElementsByClassName('win-form-input')[0] as HTMLInputElement;
        const name = nameInput.value;
        const score = parseInt(localStorage.getItem('score') as string);
        localStorage.removeItem('score');
        const duration = parseInt(localStorage.getItem('duration') as string);
        localStorage.removeItem('duration');
        await userService.create(name, score, duration);
        window.location.href = '/leaderboard';
    });
});