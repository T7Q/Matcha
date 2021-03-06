const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    if (req.user) {
        await accountModel.updateAccount(req.user.userId, { online: 0 });
    }
    return res.json({ msg: 'Successfully logged out' });
};
