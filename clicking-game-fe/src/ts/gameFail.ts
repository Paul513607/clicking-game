const playAgain = () => {
    window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('play-again')?.addEventListener('click', playAgain);
});