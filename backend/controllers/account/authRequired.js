const hello = require('./hello');
const accountModel = require('../../models/account');

module.exports = async (req, res, next) => {
    if (req.user && req.user.status === 1) {
        return hello(req, res);
    }
    if (req.user) {
        // set last action time to last_seen column
        await accountModel.updateTime(req.user.username, Date.now());
        next();
    } else {
        return res.status(401).json({ 'msg': 'Unauthorized user!' });
    }
}
