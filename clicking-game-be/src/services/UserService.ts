import { validate } from 'class-validator';
import { User } from '../models/User';
import { UserValidationError } from '../errors/UserErrors';

export class UserService {
    async getAllUsers(): Promise<User[]> {
        try {
            const users: User[] = await User.find();
            users.sort((a, b) => {
                if (a.duration < b.duration) {
                    return -1;
                }
                if (a.duration > b.duration) {
                    return 1;
                }
                return 0;
            });
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            return User.findOneBy({
                id: id
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(name: string, score: number, duration: number): Promise<User> {
        const user = new User();
        user.name = name;
        user.score = score;
        user.duration = duration;

        try {
            const errors = await validate(user);
        
            if (errors.length > 0) {
                throw new UserValidationError(`Validation failed for user`);
            }
    
            return await User.save(user);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllSorted(): Promise<User[]> {
        try {
            const users: User[] = await User.find();
            users.sort((a, b) => {
                if (a.duration < b.duration) {
                    return -1;
                }
                if (a.duration > b.duration) {
                    return 1;
                }
                return 0;
            });
            return users;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteById(id: number) {
        try {
            return await User.delete({
                id: id
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
