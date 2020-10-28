const accountHelper = require('../../models/accountHelper');

module.exports = async (req, res) => {
    const { key, value } = req.body;
    let error = '';
    switch (key) {
        case 'email':
            error = await accountHelper.validateEmail(value);
            return res.json({ error: error });
        case 'username':
            error = await accountHelper.validateUsername(value);
            return res.json({ error: error });
        case 'name':
            error = await accountHelper.validateName(value);
            return res.json({ error: error });
        case 'password':
            const { confirmPassword } = req.body;
            error = await accountHelper.validatePassword(value, confirmPassword);
            return res.json({ error: error });
        default:
            return res.json({ error: 'Invalid parameters' });
    }
};
