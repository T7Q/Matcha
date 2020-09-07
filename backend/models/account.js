const db = require('./db');

const findUser = async (email) => {
    try {
        const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return res.rows[0] || false;
    } catch (e) {
        return({ 'msg': 'Something went wrong' });
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('INSERT INTO users (email, password) VALUES($1, $2)', [email, password]);
        return res.send({'msg': 'User successfully created'});
    } catch (e) {
        return res.status(400).send({'msg': e.detail || 'Invalid query'});
    }
}

const getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users', '');
        res.send(result.rows);
    } catch (e) {
        return res.status(500).send({ 'msg': 'Something went wrong' });
    }
}

module.exports = {
    getAll,
    register,
    findUser
}
