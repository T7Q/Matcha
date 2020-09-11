require('dotenv').config({ path: 'config/.env' });
const db = require('./db');
const jwt = require('jsonwebtoken');

const findUser = async (key, value) => {
    try {
        const res = await db.query(`SELECT user_id, status, password FROM users WHERE ${key} = $1`, [value]);
        return res.rows[0] || false;
    } catch (e) {
        return ({ 'msg': 'Something went wrong' });
    }
}

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

const register = async (req) => {
    const { email, username, lastname, firstname, password, token } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO users (email, password, username, first_name, last_name, token)
             VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
            [email, password, username, firstname, lastname, token]
        );
        return {
            'msg': 'User successfully created', 'tkn': jwt.sign({
                email: email,
                userId: result.rows[0].user_id,
                username: username
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        };
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

const updateStatus = async (username, status, res) => {
    try {
        await db.query('UPDATE users SET status = $1 WHERE username = $2', [status, username]);
        return res.json({ 'msg': 'Your account was successfully activated' });
    } catch (e) {
        return res.status(400).json({ 'error': 'Bad query' });
    }
}

module.exports = {
    getAll,
    register,
    findUser,
    updateStatus,
    findUserInfo
}
