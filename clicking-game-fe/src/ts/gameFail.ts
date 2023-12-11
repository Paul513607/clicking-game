const playAgain = () => {
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playAgain')?.addEventListener('click', playAgain);
});