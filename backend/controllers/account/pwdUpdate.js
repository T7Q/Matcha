const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { password, confirmPassword, token, user_id } = req.body;

    if (!token || !user_id || !password || !confirmPassword) {
        return res.json({ error: ['Fields can not be empty'] });
    }

    let errors = helper.validatePassword(password, confirmPassword);

    if (Object.keys(errors).length != 0) {
        return res.json({ error: errors });
    }

    try {
        let result = await accountModel.findUserInfo('user_id', user_id, 'token', 'status');

        if (!result || result.token !== token || result.status === 0) {
            // if someone is trying to find valid token
            if (result.status != 0) {
                await accountModel.updateAccount(user_id, { token: null });
            }
            return res.json({ error: ['Token is not valid, please, resent the link'] });
        }

        await accountModel.updateAccount(user_id, { password: await bcrypt.hash(password, 10), token: null });
        return res.json({ msg: 'Your password was updated' });
    } catch (e) {
        console.log(e);
        return res.json({ error: 'something went wrong' });
    }
};
