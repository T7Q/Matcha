const db = require('./db');

const findUserInfo = async (key, value, ...args) => {
    const info = args.length == 0 ? '*' : args.join(', ');
    const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
    return res.rows[0];
}

const register = async (data) => {
    const { email, username, lastname, firstname, password, token } = data;
    const result = await db.query(
        `INSERT INTO users (email, password, username, first_name, last_name, token)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [email, password, username, firstname, lastname, token]
    );
    return result.rows[0];
}

const getAll = async (req, res) => {
    const result = await db.query('SELECT * FROM users', '');
    return res.json(result.rows);
}

const updateTime = async (userId, time) => {
    const result = await db.query(
        `UPDATE users SET last_seen = to_timestamp($1) WHERE user_id = $2`,
        [time / 1000, userId]
    );
    return result.rowCount;
}

// data = {'status': 5, 'online': 7}
const updateAccount = async (user_id, data) => {
    const keys = Object.keys(data);
    const info = keys.map((key, i) => `${key} = $${i + 1}`).join(', ')
    const values = keys.map(key => data[key]);
    const res = await db.query(
        `UPDATE users
        SET ${info}
        WHERE user_id = $${keys.length + 1}`,
        [...values, user_id]
    );
    return res.rowCount;
}

module.exports = {
    getAll,
    register,
    updateTime,
    findUserInfo,
    updateAccount
}
