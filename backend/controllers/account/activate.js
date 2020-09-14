const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    if (req.user) {
        return res.send({ 'msg': 'User is already logged in' });
    }

    const { username, token } = req.body;
    let result = await accountModel.findUserInfo('username', username, 'token', 'status');

    if (!result || result.status != 0 || token !== result.token) {
        return res.status(400).json({ 'error': 'Token is not valid' });
    }

    result = await accountModel.updateStatus(username, 1);
    await accountModel.updateToken(username, null);

    return res.json(result);
}
