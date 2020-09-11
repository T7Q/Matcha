require('dotenv').config({ path: 'config/.env' });
const accountModel = require('../../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.user) {
        return res.json({ 'msg': 'User is already logged in.' })
    }

    const { email, password } = req.body;

    const user = await accountModel.findUserInfo('email', email, 'user_id', 'username', 'status', 'password');

    if (!user) {
        return res.status(404).json({ 'msg': 'User does not exists' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ 'msg': 'Password is not correct' });
    }

    // check if account activated

    // get location

    // set online

    return res.json({
        'tkn': jwt.sign({
            email: email,
            username: user.username,
            userId: user.user_id,
            status: user.status
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });
}
