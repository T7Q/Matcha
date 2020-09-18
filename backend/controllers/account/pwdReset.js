const crypto = require('crypto');
const accountModel = require('../../models/account');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ 'error': 'Field can not be empty' });
    }
    try {
        const user = await accountModel.findUserInfo('email', email, 'user_id', 'username', 'status');

        if (!user) {
            return res.status(404).json({ 'error': 'User not found' });
        }

        // check if account activated
        if (user.status === 0) {
            return res.status(400).json({ 'error': 'Your account is not activated yet' });
        }

        // create new token to reset password
        const token = crypto.randomBytes(42).toString('hex');

        await accountModel.updateProfile(user.user_id, { token: token });
        return res.json(mail.pwdResetEmail(email, user.user_id, user.username, token));
    } catch (error) {
        console.log(e);
        return res.status(400).json();
    }
}
