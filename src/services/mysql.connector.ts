import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connectionPool = mysql.createPool({
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

export default connectionPool;
