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
    query: (text, params) => pool.query(text, params),
    transaction: async callback => {
        const client = await pool.connect()
        try {
            await client.query('BEGIN')
            try {
                await callback(client)
                client.query('COMMIT')
            } catch (e) {
                client.query('ROLLBACK')
            }
        } finally {
            client.release()
        }
    }
}
