const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    const { user, token } = req.query;

    let userInfo = await accountModel.findUserInfo('user_id', user, 'token', 'status');

    if (!userInfo || userInfo.status != 0 || token !== userInfo.token) {
        return res.json({ error: 'Token is not valid' });
    }

    await accountModel.updateAccount(user, { status: 1, token: null });
    return res.json({ msg: 'Your account has successfully activated. You can login now' });
};
