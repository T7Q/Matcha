require('dotenv').config();
const { Pool } = require('pg');
const db = process.env.DB_NAME;

const config = {
    user: process.env.DB_USER,
    database: 'postgres',
    password: process.env.DB_PWD || ''
}

const pool = new Pool(config);

// create database
const initDatabase = async () => {
    const dropDbQuery = `DROP DATABASE IF EXISTS "${db}"`;
    const createDbQuery = `CREATE DATABASE "${db}"
        WITH OWNER = "${config.user}" ENCODING = "UTF8";`;

    await pool.query(dropDbQuery)
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.query(createDbQuery)
        .then(res => {
            console.log(`\x1b[32mDatabase ${config.database} created\x1b[0m`);
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.end();
}

initDatabase();
