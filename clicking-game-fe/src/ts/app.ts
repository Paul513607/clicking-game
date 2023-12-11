import express from 'express';
import path from 'path';
import router from './routes/router.js';
import { Game } from './game/Game.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../../public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

