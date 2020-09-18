const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    const { user_id, token } = req.body;

    try {
        let userInfo = await accountModel.findUserInfo('user_id', user_id, 'token', 'status');

        if (!userInfo || userInfo.status != 0 || token !== userInfo.token) {
            return res.status(400).json({ 'error': 'Token is not valid' });
        }

        await accountModel.updateAccount(user_id, { status: 1, token: null });
        return res.json({'msg': 'Your account has successfully activated'});
    } catch (e) {
        return res.status(400).json();
    }
}
