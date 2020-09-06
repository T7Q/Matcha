require('dotenv').config({ path: 'config/.env' });
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
        const start = Date.now()
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        })
    },
};
