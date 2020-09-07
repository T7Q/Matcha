const accountModel = require('../../models/account');

module.exports = async (req, res) => {
    return accountModel.getAll(req, res);
}
