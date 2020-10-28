const { Pool } = require('pg');
const fs = require('fs');
const { database } = require('./index');
const { constants } = require('buffer');
// queries to create all tables
const tables = fs.readFileSync('config/tables.sql', 'utf8');
const data = fs.readFileSync('config/data.sql', 'utf8');
const triggers = fs.readFileSync('config/triggers.sql', 'utf8');

const config = {
    user: database.user,
    database: 'postgres',
    password: database.password,
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log(`Connected to the database  ${config.database}`);
});

pool.on('remove', () => {
    console.log('Connection to the database closed');
});

const setupDatabase = async () => {
    const createDbQuery = `CREATE DATABASE "${database.database}"
        WITH OWNER = "${config.user}" ENCODING = "UTF8";`;

    await pool
        .query(createDbQuery)
        .then((res) => {
            console.log(`\x1b[32mDatabase` + ` ${database.database} created` + `\x1b[0m`);
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        });
    const poolMatcha = new Pool(database);

    poolMatcha.on('connect', () => {
        console.log(`Connected to the database  ${database.database}`);
    });

    poolMatcha.on('remove', () => {
        console.log('Connection to the database closed');
    });

    await poolMatcha
        .query(tables)
        .then((res) => {
            console.log('\x1b[32m' + 'Tables are created' + '\x1b[0m');
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        });
    await poolMatcha
        .query(triggers)
        .then((res) => {
            console.log('\x1b[32m' + 'Triggers are created' + '\x1b[0m');
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        });
    await poolMatcha
        .query(data)
        .then((res) => {
            console.log('\x1b[32m' + 'Tables are filled' + '\x1b[0m');
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        });
    await poolMatcha
        .query(data)
        .then((res) => {
            console.log('\x1b[32m' + 'Tables are filled' + '\x1b[0m');
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            poolMatcha.end();
        });
};

setupDatabase();
