import express from "express";

import {
    getAll,
    getById,
    create,
    deleteById,
    getLeaderboard,
} from "../controllers/UserController";

const userRouter = express.Router();

userRouter.get("/", getAll);

userRouter.get("/:id", getById);

userRouter.post("/", create);

userRouter.delete("/:id", deleteById);

userRouter.get("/leaderboard", getLeaderboard);

export default userRouter;