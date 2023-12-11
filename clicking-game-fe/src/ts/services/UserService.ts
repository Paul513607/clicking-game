import { User } from "../model/User.js";;

export class UserService {
    private usersUrl: string = `http://localhost:8080/api/users`;

    public async create(name: string, score: number, duration: number): Promise<User> {
        try {
            const response = await fetch(this.usersUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    score: score,
                    duration: duration,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error creating user: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getAll(): Promise<User[]> {
        try {
            const response = await fetch(this.usersUrl);

            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getById(id: number): Promise<User> {
        try {
            const response = await fetch(`${this.usersUrl}/${id}`);

            if (!response.ok) {
                throw new Error(`Error fetching user by ID: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async deleteById(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.usersUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting user by ID: ${response.statusText}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getLeaderboard(): Promise<User[]> {
        try {
            const response = await fetch(`${this.usersUrl}`);

            if (!response.ok) {
                throw new Error(`Error fetching leaderboard: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
