require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

// configuration for database connection
const config = {
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'matcha',
    password: process.env.DB_PWD || ''
}
// queries to create all tables
const tables = fs.readFileSync('config/tables.sql', 'utf8');

const pool = new Pool(config);

pool.on('connect', () => {
    console.log(`Connected to the database  ${config.database}`);
});

pool.on('remove', () => {
    console.log('Connection to the database closed');
});

// create all tables in our database
const createTables = async () => {
    await pool.query(tables)
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
