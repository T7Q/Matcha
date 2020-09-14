const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
    if (req.user) {
        await profileModel.editProfile(req.user.userId, 'online', 0);
    }

    return res.json({ 'msg': 'Successfully logged out' });
}
