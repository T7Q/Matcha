const userModel = require('../models/user');

const register = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Invalid parameters');
    }
    return userModel.register(req, res)
}

const getAll = async (req, res) => {
    return userModel.getAll(req, res);
}

module.exports = {
    register,
    getAll
}
