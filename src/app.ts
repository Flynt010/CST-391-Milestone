import express from 'express';
import dotenv from 'dotenv';
import connectionPool from './services/mysql.connector';
import gamesRouter from './games/games.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GameShelf routes
app.use('/gameshelf', gamesRouter);

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to GameShelf!');
});

// Start server
app.listen(port, () => {
    console.log(`GameShelf API listening at http://localhost:${port}`);
});