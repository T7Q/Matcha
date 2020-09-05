require('dotenv').config();
const { Pool } = require('pg');

// configuration for database connection
const config = {
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'matcha',
    password: process.env.DB_PWD || ''
}

const pool = new Pool(config);

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
};
