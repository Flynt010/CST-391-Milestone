"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.readGameById = exports.readAllGames = void 0;
const mysql_connector_1 = __importDefault(require("../services/mysql.connector"));
const readAllGames = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM games';
        mysql_connector_1.default.query(query, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    });
};
exports.readAllGames = readAllGames;
const readGameById = (gameId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM games WHERE game_id = ?';
        mysql_connector_1.default.query(query, [gameId], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                const games = results;
                resolve(games.length > 0 ? games[0] : null);
            }
        });
    });
};
exports.readGameById = readGameById;
const createGame = (game) => {
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
        mysql_connector_1.default.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results.insertId);
            }
        });
    });
};
exports.createGame = createGame;
const updateGame = (gameId, game) => {
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
        mysql_connector_1.default.query(query, values, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results.affectedRows);
            }
        });
    });
};
exports.updateGame = updateGame;
const deleteGame = (gameId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM games WHERE game_id = ?';
        mysql_connector_1.default.query(query, [gameId], (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results.affectedRows);
            }
        });
    });
};
exports.deleteGame = deleteGame;
