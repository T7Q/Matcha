const crypto = require('crypto');
const accountModel = require('../../models/account');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ error: 'field can not be empty' });
    }
    const user = await accountModel.findUserInfo('email', email, 'user_id', 'username', 'status');

    if (!user) {
        return res.json({ error: 'user with this email not found' });
    }

    // check if account activated
    if (user.status === 0) {
        return res.json({ error: 'account is not activated yet' });
    }

    // create new token to reset password
    const token = crypto.randomBytes(42).toString('hex');
    await accountModel.updateAccount(user.user_id, { token: token });

    return res.json(mail.pwdResetEmail(email, user.user_id, user.username, token, req));
};
