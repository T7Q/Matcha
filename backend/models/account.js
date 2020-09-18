const db = require('./db');

const findUserInfo = async (key, value, ...args) => {
    try {
        let info = args.length == 0 ? '*' : '';

        args.forEach(elem => info += elem + ', ');
        info = info.replace(/\, $/g, '');

        const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);

        return res.rows[0] || false;
    } catch (e) {
        return ({ 'msg': 'Something went wrong' });
    }
}

const register = async (data) => {
    const { email, username, lastname, firstname, password, token } = data;

    try {
        const result = await db.query(
            `INSERT INTO users (email, password, username, first_name, last_name, token)
             VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [email, password, username, firstname, lastname, token]
        );

        return result.rows[0];
    } catch (e) {
        return { 'error': e.detail || 'Invalid query' };
    }
}

const getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users', '');

        return res.json(result.rows);
    } catch (e) {
        return res.status(400).json({ 'msg': 'Bad query' });
    }
}

const updateTime = async (userId, time) => {
    try {
        const res = await db.query(`UPDATE users SET last_seen = to_timestamp($1) WHERE user_id = $2`, [time / 1000, userId]);

        return { 'msg': 'Time was updated' };
    } catch (e) {
        return { 'error': 'Bad query' };
    }
}

// data = {'status': 5, 'online': 7}
const updateProfile = async (user_id, data) => {
    try {
        let keys = [];
        let info = '';

        Object.keys(data).forEach(key => {
            keys.push(key);
        });

        keys.forEach((elem, i) => info += elem + ` = $${i + 1}, `);
        info = info.replace(/\, $/g, ' ');

        let values = keys.map((key) => {
            return data[key];
        });

        const res = await db.query(`
            UPDATE users
            SET ${info}
            WHERE user_id = $${keys.length + 1}`,
            [...values, user_id]
        );

        return {};
    } catch (e) {
        return ({ 'error': e.detail || 'Something went wrong adding Profile info' });
    }
}

module.exports = {
    getAll,
    register,
    updateTime,
    findUserInfo,
    updateProfile
}
