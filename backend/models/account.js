require('dotenv').config({ path: 'config/.env' });
const db = require('./db');
const jwt = require('jsonwebtoken');

const findUserInfo = async (key, value, ...args) => {
    try {
        const length = args.length;
        let info = '';
        if (length == 0) {
            info = '*';
        }
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
        res.json(result.rows);
    } catch (e) {
        return res.status(400).json({ 'msg': 'Bad query' });
    }
}

const updateStatus = async (userId, status) => {
    try {
        await db.query('UPDATE users SET status = $1 WHERE user_id = $2', [status, userId]);
        return { 'msg': 'Your account was successfully activated' };
    } catch (e) {
        return { 'error': 'Bad query' };
    }
}

const updateToken = async (userId, token) => {
    try {
        await db.query('UPDATE users SET token = $1 WHERE user_id = $2', [token, userId]);
        return { 'msg': 'Token was updated' };
    } catch (e) {
        return { 'error': 'Bad query' };
    }
}

const updateTime = async (username, time) => {
    try {
        const res = await db.query(`UPDATE users SET last_seen = to_timestamp($1) WHERE username = $2`, [time / 1000, username]);
        return { 'msg': 'Time was updated' };
    } catch (e) {
        console.log(e);
        return { 'error': 'Bad query' };
    }
}

const updatePassword = async (userId, password) => {
    try {
        await db.query('UPDATE users SET password = $1 WHERE user_id = $2', [password, userId]);
        return { 'msg': 'Password was updated' };
    } catch (e) {
        return { 'error': 'Bad query' };
    }
}

module.exports = {
    getAll,
    register,
    updateStatus,
    updateToken,
    updateTime,
    updatePassword,
    findUserInfo
}
