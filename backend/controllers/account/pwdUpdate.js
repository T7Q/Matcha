const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');

module.exports = async (req, res) => {
    const { password, confirmPassword, token, username } = req.body;

    let errors = helper.validatePassword(password, confirmPassword);

    if (Object.keys(errors).length != 0) {
        return res.status(400).json(errors);
    }

    let result = await accountModel.findUserInfo('username', username, 'token', 'status');

    if (!result || result.token !== token || result.status === 0) {
        // if someone is trying to find valid token
        await accountModel.updateToken(username, null);
        return res.status(400).json({ 'error': 'Token is not valid, please, resent the link' });
    }

    result = await accountModel.updatePassword(username, await bcrypt.hash(password, 10))
    await accountModel.updateToken(username, null);

    return res.json(result);
}
