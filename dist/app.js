"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const games_routes_1 = __importDefault(require("./games/games.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// GameShelf routes
app.use('/gameshelf', games_routes_1.default);
// Test route
app.get('/', (req, res) => {
    res.send('Welcome to GameShelf!');
});
// Start server
app.listen(port, () => {
    console.log(`GameShelf API listening at http://localhost:${port}`);
});
