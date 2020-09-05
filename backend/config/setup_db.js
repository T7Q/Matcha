require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const db = process.env.DB_NAME;
// queries to create all tables
const tables = fs.readFileSync('config/tables.sql', 'utf8');

const config = {
    user: process.env.DB_USER,
    database: 'postgres',
    password: process.env.DB_PWD || ''
}

let pool = new Pool(config);

pool.on('connect', () => {
    console.log(`Connected to the database  ${config.database}`);
});

pool.on('remove', () => {
    console.log('Connection to the database closed');
});

const setupDatabase = async () => {
    const dropConnections = `
        REVOKE CONNECT ON DATABASE "${db}" FROM public;
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${db}';
    `;
    const dropDbQuery = `DROP DATABASE IF EXISTS "${db}";`;
    const createDbQuery = `CREATE DATABASE "${db}"
        WITH OWNER = "${config.user}" ENCODING = "UTF8";`;

    await pool.query(dropConnections)
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.query(dropDbQuery)
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.query(createDbQuery)
        .then(res => {
            console.log(`\x1b[32mDatabase` + ` ${db} created` + `\x1b[0m`);
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    config.database = db;
    pool = new Pool(config);
    await pool.query(tables)
        .then(res => {
            console.log('\x1b[32m' + 'Tables are created' + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        })
}

setupDatabase();
