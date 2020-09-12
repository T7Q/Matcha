require('dotenv').config({ path: 'config/.env' });
const accountModel = require('../../models/account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    if (req.user) {
        return res.json({ 'msg': 'User is already logged in.' })
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'error': 'Fields can not be empty' });
    }

    const user = await accountModel.findUserInfo('email', email, 'user_id', 'username', 'status', 'password');

    // check if account exists
    if (!user) {
        return res.status(404).json({ 'error': 'Invalid credentials' });
    }

    // check if account activated
    if (user.status === 0) {
        return res.json({ 'error': 'Your account is not activated yet. Please, check your email.' });
    }

    // check if password correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ 'error': 'Invalid credentials' });
    }

    // get location

    return res.json({
        'tkn': jwt.sign({
            email: email,
            username: user.username,
            userId: user.user_id,
            status: user.status
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });
}
