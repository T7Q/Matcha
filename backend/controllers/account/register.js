const bcrypt = require('bcrypt');
const crypto = require('crypto');
const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    const { email, username, lastname, firstname, password, confirmPassword } = req.body;

    if (username && email) {
        req.body.username = username.toLowerCase();
        req.body.email = email.toLowerCase();
    }

    let errors = [];
    errors.push(await helper.validateEmail(email));
    errors.push(helper.validatePassword(password, confirmPassword));
    errors.push(await helper.validateUsername(username));
    errors.push(helper.validateName(firstname));
    errors.push(helper.validateName(lastname));

    // remove empty objects from errors
    errors = errors.filter(error => Object.keys(error).length != 0);
    errors = Object.assign({}, ...errors);

    if (Object.keys(errors).length !== 0) return res.json({ error: errors });

    req.body.password = await bcrypt.hash(password, 10);
    req.body.token = crypto.randomBytes(42).toString('hex');

    const result = await accountModel.register(req.body);
    return res.json(mail.activateAccountEmail(email, result.user_id, username, req.body.token));
};
