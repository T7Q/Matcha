const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = async (req, res) => {
    if (req.user) {
        return res.send({ 'msg': 'User is already logged in.' })
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

    if (errors.length != 0) {
        return res.status(400).send(errors);
    }

    req.body.password = await bcrypt.hash(password, 10);
    req.body.token = crypto.randomBytes(42).toString('hex');

    const result = await accountModel.register(req);

    if (result.error) {
        return res.status(400).send(result);
    }

    // implement email sending

    return res.send(result);
}
