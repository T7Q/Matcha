const bcrypt = require('bcrypt');
const crypto = require('crypto');
const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const mail = require('../../utils/mail');

module.exports = async (req, res) => {
    if (req.user) {
        return res.json({ 'msg': 'User is already logged in.' })
    }

    const { email, username, lastname, firstname, password, confirmPassword } = req.body;
    let errors = [];

    errors.push(await helper.validateEmail(email));
    errors.push(helper.validatePassword(password, confirmPassword));
    errors.push(await helper.validateUsername(username));
    errors.push(helper.validateName(firstname));
    errors.push(helper.validateName(lastname));

    // remove empty objects from errors
    errors = errors.filter(error => { return Object.keys(error).length != 0});

    // check if we have errors
    if (errors.length != 0) {
        return res.status(400).json(errors);
    }

    req.body.password = await bcrypt.hash(password, 10);
    req.body.token = crypto.randomBytes(42).toString('hex');

    const result = await accountModel.register(req);

    if (result.error) {
        return res.status(400).json(result);
    }

    return res.json(mail.activateAccountEmail(email, username, req.body.token));
}
