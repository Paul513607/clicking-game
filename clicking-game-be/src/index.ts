import express from 'express';
import userRouter from './routes/UserRoutes';
import dotenv from 'dotenv';
import { AppDataSource } from './util/AppDataSource';
import "reflect-metadata";

dotenv.config();
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use(express.json());

app.use(cors());

app.use('/api/users', userRouter);

AppDataSource.getInstance().initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(error);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

