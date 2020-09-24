const accountHelper = require('../../models/accountHelper');

module.exports = async (req, res) => {
    const { key, value } = req.body;
    try {
        switch (key) {
            case 'email':
                return res.json(await accountHelper.validateEmail(value));
            case 'username':
                return res.json(await accountHelper.validateUsername(value));
            case 'name':
                return res.json(await accountHelper.validateName(value));
            case 'password':
                const { confirmPassword } = req.body;
                return res.json(await accountHelper.validatePassword(value, confirmPassword));
            default:
                return res.json({ error: 'Invalid parameters' });
        }
    } catch (e) {
        console.log(e);
        return res.json({ error: 'something went wrong' });
    }
};
