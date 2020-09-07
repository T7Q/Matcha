const userModel = require('../models/user');

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ 'msg': 'Invalid parameters' });
    }
    const user = await userModel.findUser(email);
    if (user)
        res.status(400).send({ 'msg': 'User already exists' });
    return userModel.register(req, res);
}

const getAll = async (req, res) => {
    return userModel.getAll(req, res);
}

module.exports = {
    register,
    getAll
}
