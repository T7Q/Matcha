require('dotenv').config({ path: 'config/.env' });
const { Pool } = require('pg');
const fs = require('fs');
const db = process.env.DB_NAME;
// queries to create all tables
const tables = fs.readFileSync('config/tables.sql', 'utf8');
const data = fs.readFileSync('config/data.sql', 'utf8');

const config = {
    user: process.env.DB_USER,
    database: 'postgres',
    password: process.env.DB_PWD || ''
}

const pool = new Pool(config);

pool.on('connect', () => {
    console.log(`Connected to the database  ${config.database}`);
});

pool.on('remove', () => {
    console.log('Connection to the database closed');
});

const setupDatabase = async () => {
    const createDbQuery = `CREATE DATABASE "${db}"
        WITH OWNER = "${config.user}" ENCODING = "UTF8";`;

    await pool.query(createDbQuery)
        .then(res => {
            console.log(`\x1b[32mDatabase` + ` ${db} created` + `\x1b[0m`);
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        })
    config.database = db;
    const poolMatcha = new Pool(config);

    poolMatcha.on('connect', () => {
        console.log(`Connected to the database  ${config.database}`);
    });

    poolMatcha.on('remove', () => {
        console.log('Connection to the database closed');
    });

    await poolMatcha.query(tables)
        .then(res => {
            console.log('\x1b[32m' + 'Tables are created' + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await poolMatcha.query(data)
        .then(res => {
            console.log('\x1b[32m' + 'Tables are filled' + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            poolMatcha.end();
        })
}

setupDatabase();
