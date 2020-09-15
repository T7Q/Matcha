const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
    if (req.user) {
        return res.send({ 'msg': 'User is already logged in' });
    }

    const { user_id, token } = req.body;
    let result = await accountModel.findUserInfo('user_id', user_id, 'token', 'status');

    if (!result || result.status != 0 || token !== result.token) {
        return res.status(400).json({ 'error': 'Token is not valid' });
    }

    result = await accountModel.updateProfile(user_id, { status: 1, token: null });

    return res.json(result);
}
