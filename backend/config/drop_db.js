require('dotenv').config({ path: 'config/.env' });
const { Pool } = require('pg');
const db = process.env.DB_NAME;

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

const dropDatabase = async () => {
    const dropConnections = `
        REVOKE CONNECT ON DATABASE "${db}" FROM public;
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${db}';
    `;
    const dropDbQuery = `DROP DATABASE IF EXISTS "${db}";`;

    await pool.query(dropConnections)
        .then(res => {
            console.log('\x1b[32m' + `Database ${db} connections are stopped` + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.query(dropDbQuery)
        .then(res => {
            console.log('\x1b[32m' + `Database ${db} successfully dropped` + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        })
}

dropDatabase();
