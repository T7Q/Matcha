const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    if (req.user) {
        return res.send({ 'msg': 'User is already logged in' });
    }

    const { user_id, token } = req.body;
    let result = await accountModel.findUserInfo('user_id', user_id, 'token', 'status');

    if (!result || result.status != 0 || token !== result.token) {
        return res.status(400).json({ 'error': 'Token is not valid' });
    }

    result = await accountModel.updateStatus(user_id, 1);
    await accountModel.updateToken(user_id, null);

    return res.json(result);
}
