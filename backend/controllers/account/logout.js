const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
    try {
        if (req.user) {
            await accountModel.updateProfile(req.user.userId, { 'online': 0 });
        }
        return res.json({ 'msg': 'Successfully logged out' });
    } catch (error) {
        console.log(e);
        return res.status(400).json();
    }
}
