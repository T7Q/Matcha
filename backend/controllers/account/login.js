const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../../config');
const accountModel = require('../../models/account');
const { getLocation } = require('../../utils/location');

module.exports = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.json({ error: 'Fields can not be empty' });
    }

    username = username.toLowerCase();
    const user = await accountModel.findUserInfo('username', username);

    // check if account exists and password correct
    if (!user || Object.keys(user).length == 0 || !(await bcrypt.compare(password, user.password))) {
        return res.json({ error: 'Invalid credentials' });
    }

    // check if account activated
    if (user.status === 0) {
        return res.json({ error: 'Your account is not activated yet. Please, check your email.' });
    }

    // get location
    const data = await getLocation(req);
    // set user online
    data.online = 1;
    await accountModel.updateAccount(user.user_id, data);
    return res.json({
        user: {
            status: user.status,
            userId: user.user_id,
        },
        tkn: jwt.sign(
            {
                userId: user.user_id,
                status: user.status,
            },
            jwtSecret,
            { expiresIn: 1000 * 60 * 60 }
        ),
    });
};
