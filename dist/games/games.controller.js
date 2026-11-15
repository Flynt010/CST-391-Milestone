"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.readGameById = exports.readAllGames = void 0;
const GamesDao = __importStar(require("./games.dao"));
const readAllGames = async (req, res) => {
    try {
        const games = await GamesDao.readAllGames();
        // Convert database values into API-friendly types.
        const formattedGames = games.map(game => ({
            ...game,
            purchase_price: Number(game.purchase_price),
            completed: Boolean(game.completed)
        }));
        res.status(200).json(formattedGames);
    }
    catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({
            message: 'An error occurred while retrieving games.'
        });
    }
};
exports.readAllGames = readAllGames;
const readGameById = async (req, res) => {
    try {
        const gameId = Number(req.params.gameId);
        if (!Number.isInteger(gameId) || gameId <= 0) {
            res.status(400).json({ message: 'Invalid game ID.' });
            return;
        }
        const game = await GamesDao.readGameById(gameId);
        if (!game) {
            res.status(404).json({ message: 'Game not found.' });
            return;
        }
        res.status(200).json({
            ...game,
            purchase_price: Number(game.purchase_price),
            completed: Number(game.completed) === 1
        });
    }
    catch (error) {
        console.error('Error retrieving game:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the game.' });
    }
};
exports.readGameById = readGameById;
const createGame = async (req, res) => {
    try {
        const game = req.body;
        if (!game.title ||
            !game.platform ||
            !game.genre ||
            game.release_year === undefined ||
            game.purchase_price === undefined ||
            game.completed === undefined ||
            !game.date_added) {
            res.status(400).json({ message: 'All game fields are required.' });
            return;
        }
        if (!Number.isInteger(Number(game.release_year)) ||
            !Number.isFinite(Number(game.purchase_price)) ||
            Number(game.purchase_price) < 0 ||
            typeof game.completed !== 'boolean') {
            res.status(400).json({ message: 'One or more game fields have invalid values.' });
            return;
        }
        const newGame = {
            title: String(game.title),
            platform: String(game.platform),
            genre: String(game.genre),
            release_year: Number(game.release_year),
            purchase_price: Number(game.purchase_price),
            completed: game.completed,
            date_added: String(game.date_added)
        };
        const newGameId = await GamesDao.createGame(newGame);
        res.status(201).json({
            message: 'Game created successfully.',
            game_id: newGameId
        });
    }
    catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'An error occurred while creating the game.' });
    }
};
exports.createGame = createGame;
const updateGame = async (req, res) => {
    try {
        const gameId = Number(req.params.gameId);
        const game = req.body;
        if (!Number.isInteger(gameId) || gameId <= 0) {
            res.status(400).json({ message: 'Invalid game ID.' });
            return;
        }
        if (!game.title ||
            !game.platform ||
            !game.genre ||
            game.release_year === undefined ||
            game.purchase_price === undefined ||
            game.completed === undefined ||
            !game.date_added) {
            res.status(400).json({ message: 'All game fields are required for an update.' });
            return;
        }
        if (!Number.isInteger(Number(game.release_year)) ||
            !Number.isFinite(Number(game.purchase_price)) ||
            Number(game.purchase_price) < 0 ||
            typeof game.completed !== 'boolean') {
            res.status(400).json({ message: 'One or more game fields have invalid values.' });
            return;
        }
        const updatedGame = {
            title: String(game.title),
            platform: String(game.platform),
            genre: String(game.genre),
            release_year: Number(game.release_year),
            purchase_price: Number(game.purchase_price),
            completed: game.completed,
            date_added: String(game.date_added)
        };
        const affectedRows = await GamesDao.updateGame(gameId, updatedGame);
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Game not found, or no changes were made.' });
            return;
        }
        res.status(200).json({ message: 'Game updated successfully.' });
    }
    catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ message: 'An error occurred while updating the game.' });
    }
};
exports.updateGame = updateGame;
const deleteGame = async (req, res) => {
    try {
        const gameId = Number(req.params.gameId);
        if (!Number.isInteger(gameId) || gameId <= 0) {
            res.status(400).json({ message: 'Invalid game ID.' });
            return;
        }
        const affectedRows = await GamesDao.deleteGame(gameId);
        if (affectedRows === 0) {
            res.status(404).json({ message: 'Game not found.' });
            return;
        }
        res.status(200).json({ message: 'Game deleted successfully.' });
    }
    catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ message: 'An error occurred while deleting the game.' });
    }
};
exports.deleteGame = deleteGame;
