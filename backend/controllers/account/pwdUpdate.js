const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { password, confirmPassword, token, user_id } = req.body;

    if (!token || !user_id || !password || !confirmPassword) {
        return res.status(400).json({ 'error': 'Fields can not be empty' });
    }

    let errors = helper.validatePassword(password, confirmPassword);

    // check if we have errors
    if (Object.keys(errors).length != 0) {
        return res.status(400).json(errors);
    }

    let result = await accountModel.findUserInfo('user_id', user_id, 'token', 'status');

    if (!result || result.token !== token || result.status === 0) {
        // if someone is trying to find valid token
        if (result.status != 0)
            await accountModel.updateToken(user_id, null);

        return res.status(400).json({ 'error': 'Token is not valid, please, resent the link' });
    }

    result = await accountModel.updatePassword(user, await bcrypt.hash(password, 10));

    // reset token
    await accountModel.updateToken(user_id, null);

    return res.json(result);
}
