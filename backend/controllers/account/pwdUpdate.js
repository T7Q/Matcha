const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { password, confirmPassword, token, userId } = req.body;

    if (!token || !userId || !password || !confirmPassword) {
        return res.json({ error: ['Fields can not be empty'] });
    }

    let errors = helper.validatePassword(password, confirmPassword);

    if (Object.keys(errors).length != 0) {
        return res.json({ errors: errors });
    }

    let result = await accountModel.findUserInfo('user_id', userId, 'token', 'status');

    if (!result || result.token !== token || result.status === 0) {
        // if someone is trying to find valid token
        if (result.status != 0) {
            await accountModel.updateAccount(userId, { token: null });
        }
        return res.json({ error: ['Token is not valid, please, resent the link'] });
    }

    await accountModel.updateAccount(userId, {
        password: await bcrypt.hash(password, 10),
        token: null,
    });
    return res.json({ msg: 'Your password was updated.' });
};
