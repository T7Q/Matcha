const accountHelper = require('../../models/accountHelper');

module.exports = async (req, res) => {
    const { key, value } = req.body;
    try {
        switch (key) {
            case 'email':
                return res.send(await accountHelper.validateEmail(value));
            case 'username':
                return res.send(await accountHelper.validateUsername(value));
            case 'name':
                return res.send(await accountHelper.validateName(value));
            case 'password':
                const { confirmPassword } = req.body;
                return res.send(await accountHelper.validatePassword(value, confirmPassword));
            default:
                return res.status(400).send('Invalid parameters');
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json();
    }
}
