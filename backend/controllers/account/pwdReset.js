const crypto = require('crypto');
const accountModel = require('../../models/account');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    const { email } = req.body;

    const user = await accountModel.findUserInfo('email', email, 'username', 'status');

    if (!user) {
        return res.status(404).json({ 'error': 'User not found' });
    }

    if (user.status === 0) {
        return res.status(400).json({ 'error': 'Your account is not activated yet' });
    }

    const token = crypto.randomBytes(42).toString('hex');
    const result = await accountModel.updateToken(user.username, token);

    if (result.error) {
        return res.json(result);
    }

    return res.json(mail.pwdResetEmail(email, user.username, token));
}
