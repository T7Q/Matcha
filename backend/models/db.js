const config = require('../config');
const { Pool } = require('pg');

const pool = new Pool(config.database);

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
