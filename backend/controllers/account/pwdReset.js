const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    const { email } = req.body;

    const user = accountModel.findUserInfo('email', email, 'username', 'status');

    if (!user) {
        res.status(404).json({ 'error': 'User not found' });
    }

    if (user.status === 0) {
        res.status(400).json({ 'error': 'You account is not activated yet' });
    }

    const token = crypto.randomBytes(42).toString('hex');
    const result = await accountModel.updateToken(user.username, token);

    if (result.error) {
        return res.json(result);
    }

    // send email

    return res.json({ 'msg': 'Password reset link has been sent to your emails' });
}
