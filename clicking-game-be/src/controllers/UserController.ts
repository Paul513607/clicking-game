import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validate } from 'class-validator';
import { UserValidationError } from '../errors/UserErrors';

const userService = new UserService();

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.getById(id);
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// I have chosen not to update the score of an existing user, 
// instead to add another entry with the same name and the new score (like an arcade game would do)
export const create = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.create(req.body.name, req.body.score, req.body.duration);
        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof UserValidationError) {
            res.status(400).json({ message: error.message });
        } else {
            console.log(error);
            res.status(500).json({ message: error });
        }
    }
}

export const deleteById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.deleteById(id);
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        console.log('getLeaderboard');
        const users = await userService.getAllSorted();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}