const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await accountModel.findUserInfo('user_id', userId, 'status', 'username');
        result.userId = userId;
        return res.json(result);
    } catch (e) {
        console.log(e);
        return res.json({ error: 'something went wrong' });
    }
};
