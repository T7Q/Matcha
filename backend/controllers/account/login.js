const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../../config');
const accountModel = require('../../models/account');
const getLocation = require('../../utils/location');

module.exports = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'error': 'Fields can not be empty' });
    }

    username = username.toLowerCase();
    try {
        const user = await accountModel.findUserInfo('username', username);

        // check if account exists and password correct
        if (!user || Object.keys(user).length == 0 || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ 'error': 'Invalid credentials' });
        }

        // check if account activated
        if (user.status === 0) {
            return res.json({ 'error': 'Your account is not activated yet. Please, check your email.' });
        }

        // get location
        const data = await getLocation(req, user);
        // set user online
        data.online = 1;
        await accountModel.updateAccount(user.user_id, data);
        return res.json({
            'status': user.status,
            'username': username,
            'tkn': jwt.sign({
                userId: user.user_id,
                status: user.status
            }, jwtSecret, { expiresIn: 1000 * 60 * 60 })
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
}
