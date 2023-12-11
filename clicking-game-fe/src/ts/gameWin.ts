import { UserService } from "./services/UserService.js";

const userService = new UserService();

const MAX_NAME_LENGTH = 50;

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('win-form-button') as HTMLButtonElement;
    button.addEventListener('click', async () => {
        const nameInput = document.getElementsByClassName('win-form-input')[0] as HTMLInputElement;
        const errorMessage = document.getElementById('error-message') as HTMLDivElement;

        errorMessage.innerText = '';

        const name = nameInput.value;

        if (name.length < 1 || name.length > MAX_NAME_LENGTH) {
            errorMessage.innerText = 'Name must be between 1 and 50 characters.';
            return;
        }

        const score = parseInt(localStorage.getItem('score') as string);
        
        localStorage.removeItem('score');
        const duration = parseInt(localStorage.getItem('duration') as string);
        localStorage.removeItem('duration');

        await userService.create(name, score, duration);
        window.location.href = '/leaderboard';
    });
});