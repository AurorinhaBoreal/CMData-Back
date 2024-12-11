const dotenv = require('dotenv')
const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

dotenv.config();

const ifNotExistsCreateDB = async () => {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
    await conn.end();
};

const conn = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.MYSQL_PORT || '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

const initDB = async () => {
    await ifNotExistsCreateDB();
    try {
        await conn.authenticate();
        console.log('The database connection was successful!.');
    } catch (error) {
        console.error('Error connecting with the database:', error);
    }
};

initDB();

module.exports = conn;