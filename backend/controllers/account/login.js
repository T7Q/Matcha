const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    return res.send('login in account');
    // const { email, password } = req.body;
    // if (!email || !password) {
    //     return res.status(400).send({ 'msg': 'Invalid parameters' });
    // }
    // const user = await accountModel.findUser(email);
    // if (user)
    //     return res.status(400).send({ 'msg': 'User already exists' });
    // return accountModel.register(req, res);
}
