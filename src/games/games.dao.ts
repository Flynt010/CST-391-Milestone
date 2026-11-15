import connectionPool from '../services/mysql.connector';
import { Game } from './games.model';

export const readAllGames = (): Promise<Game[]> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM games';

        connectionPool.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results as Game[]);
            }
        });
    });
};

export const readGameById = (gameId: number): Promise<Game | null> => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM games WHERE game_id = ?';

        connectionPool.query(query, [gameId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const games = results as Game[];
                resolve(games.length > 0 ? games[0] : null);
            }
        });
    });
};

export const createGame = (game: Omit<Game, 'game_id'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO games
            (title, platform, genre, release_year, purchase_price, completed, date_added)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            game.title,
            game.platform,
            game.genre,
            game.release_year,
            game.purchase_price,
            game.completed ? 1 : 0,
            game.date_added
        ];

        connectionPool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

export const updateGame = (gameId: number, game: Omit<Game, 'game_id'>): Promise<number> => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE games
            SET title = ?,
                platform = ?,
                genre = ?,
                release_year = ?,
                purchase_price = ?,
                completed = ?,
                date_added = ?
            WHERE game_id = ?
        `;

        const values = [
            game.title,
            game.platform,
            game.genre,
            game.release_year,
            game.purchase_price,
            game.completed ? 1 : 0,
            game.date_added,
            gameId
        ];

        connectionPool.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};

export const deleteGame = (gameId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM games WHERE game_id = ?';

        connectionPool.query(query, [gameId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};