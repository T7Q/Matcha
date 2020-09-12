const crypto = require('crypto');
const accountModel = require('../../models/account');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ 'error': 'Field can not be empty' });
    }

    const user = await accountModel.findUserInfo('email', email, 'username', 'status');

    // check if account exists
    if (!user) {
        return res.status(404).json({ 'error': 'User not found' });
    }

    // check if account activated
    if (user.status === 0) {
        return res.status(400).json({ 'error': 'Your account is not activated yet' });
    }

    // create new token to reset password
    const token = crypto.randomBytes(42).toString('hex');
    const result = await accountModel.updateToken(user.username, token);

    if (result.error) {
        return res.json(result);
    }

    return res.json(mail.pwdResetEmail(email, user.username, token));
}
