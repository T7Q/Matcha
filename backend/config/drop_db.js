const { Pool } = require('pg');
const { database } = require('./index');

const config = {
    user: database.user,
    database: 'postgres',
    password: database.password
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
        REVOKE CONNECT ON DATABASE "${database.database}" FROM public;
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${database.database}';
    `;
    const dropDbQuery = `DROP DATABASE IF EXISTS "${database.database}";`;

    await pool.query(dropConnections)
        .then(res => {
            console.log('\x1b[32m' + `Database ${database.database} connections are stopped` + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
    await pool.query(dropDbQuery)
        .then(res => {
            console.log('\x1b[32m' + `Database ${database.database} successfully dropped` + '\x1b[0m');
        })
        .catch(err => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        })
}

dropDatabase();
