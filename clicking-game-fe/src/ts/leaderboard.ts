import { User } from "./model/User.js";
import { UserService } from "./services/UserService.js";

const userService = new UserService();

document.addEventListener('DOMContentLoaded', () => {
    userService.getLeaderboard()
        .then(data => {
            const leaderboardData = data.slice(0, 3);

            populateLeaderboardTable(leaderboardData);
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
        });
    document.getElementById('play-again-lb')?.addEventListener('click', () => {
        window.location.href = '/';
    });
});

const populateLeaderboardTable = (data: User[]) => {
    const tableBody = document.querySelector('#leaderboardTable tbody') as HTMLTableSectionElement;

    tableBody.innerHTML = '';

    data.forEach(user => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const timeCell = row.insertCell(1);

        nameCell.textContent = user.name;
        timeCell.textContent = user.duration.toString() + ' seconds';
    });
}
