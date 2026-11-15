"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionPool = mysql_1.default.createPool({
    connectionLimit: Number(process.env.MY_SQL_DB_CONNECTION_LIMIT),
    host: process.env.MY_SQL_DB_HOST,
    user: process.env.MY_SQL_DB_USER,
    password: process.env.MY_SQL_DB_PASSWORD,
    port: Number(process.env.MY_SQL_DB_PORT),
    database: process.env.MY_SQL_DB_DATABASE
});
connectionPool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the GameShelf database:', err);
        return;
    }
    console.log('GameShelf MySQL connection established successfully!');
    connection.release();
});
exports.default = connectionPool;
