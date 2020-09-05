require('dotenv').config();
const { Pool } = require('pg');

const config = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME || 'matcha',
    password: process.env.DB_PWD || ''
}

const pool = new Pool(config);

// create all tables in our database
const createTables = async () => {
    const table = `CREATE TABLE IF NOT EXISTS
        students(
            id SERIAL PRIMARY KEY,
            name VARCHAR(45) NOT NULL
        )`;

    await pool.query(table)
        .then(res => {
            console.log('\x1b[32mTables are created\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        })
}

createTables();
