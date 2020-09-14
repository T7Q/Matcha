require('dotenv').config({ path: 'config/.env' });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');
const getLocation = require('../../utils/location');

module.exports = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'error': 'Fields can not be empty' });
    }

    username = username.toLowerCase();
    const user = await accountModel.findUserInfo('username', username, 'user_id', 'email', 'status', 'password');

    // check if account exists and password correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(404).json({ 'error': 'Invalid credentials' });
    }

    // check if account activated
    if (user.status === 0) {
        return res.json({ 'error': 'Your account is not activated yet. Please, check your email.' });
    }

    // set user online
    await profileModel.editProfile(user.user_id, 'online', 1);

    // get location
    const location = getLocation();

    return res.json({
        'status': user.status,
        'username': username,
        'tkn': jwt.sign({
            email: user.email,
            userId: user.user_id,
            status: user.status
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });
}
