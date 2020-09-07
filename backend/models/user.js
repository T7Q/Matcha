const db = require('./db');

const register = (request, response) => {
    const { email, password } = request.body;
    try {
        db.query('INSERT INTO users (email, password) VALUES($1, $2)', [email, password], (err, result) => {
            if (err) {
                response.status(400).send({ 'error': 'Invalid query' });
            }
            response.send({ 'msg': 'User successfully created' }); // should we send message or just status 200?
        });
    } catch (e) {
        response.status(500).send({ 'error': 'Something went wrong' });
    }
}

const getAll = (req, res) => {
    try {
        db.query('SELECT * FROM users', '', (err, result) => {
            if (err) {
                return res.status(400).send({ 'error': 'Invalid query' });
            }
            return res.send(result.rows);
        })
    } catch (e) {
        return res.status(500).send({ 'error': 'Something went wrong' });
    }
}

module.exports = {
    getAll,
    register
}
