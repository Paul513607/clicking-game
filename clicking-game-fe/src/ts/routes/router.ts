import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public", 'index.html'));
});

router.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public", 'game.html'));
});

router.get('/game-win', (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public", 'game-win.html'));
});

router.get('/game-fail', (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public", 'game-fail.html'));
});

router.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, "../../../public", 'leaderboard.html'));
});

export default router;
