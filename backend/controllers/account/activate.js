const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    if (req.user) {
        return res.send({ 'msg': 'User is already logged in' });
    }

    const { username, token } = req.body;
    const result = await accountModel.findUserInfo('username', username, 'token', 'status');

    if (!result) {
        return res.status(400).json({ 'error': 'User not found' });
    }

    if (result.status != 0) {
        return res.json({ 'msg': 'Your account has been already been activated' });
    }

    if (token !== result.token) {
        return res.status(400).json({ 'error': 'Token is not valid' });
    }

    return accountModel.updateStatus(username, 1, res);
}
