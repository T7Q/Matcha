const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
    if (req.user) {
        await accountModel.updateProfile(req.user.userId, { 'online': 0 });
    }

    return res.json({ 'msg': 'Successfully logged out' });
}
