const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../../config');
const accountModel = require('../../models/account');
const accountHelper = require('../../models/accountHelper');
const { getLocation } = require('../../utils/location');

module.exports = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.json({ error: 'Fields can not be empty' });
    } else if (!(await accountHelper.checkPassword(null, password, username.toLowerCase()))) {
        return res.json({ error: 'Invalid credentials' });
    }

    const user = await accountModel.findUserInfo('username', username.toLowerCase());

    // check if account activated
    if (user.status === 0) {
        return res.json({ error: 'Your account is not activated yet. Please, check your email.' });
    }

    const data = await getLocation(req);
    // set user online
    data.online = 1;
    await accountModel.updateAccount(user.user_id, data);

    return res.json({
        user: { status: user.status, userId: user.user_id },
        tkn: jwt.sign({ userId: user.user_id, status: user.status }, jwtSecret, {
            expiresIn: 1000 * 60 * 60,
        }),
    });
};
