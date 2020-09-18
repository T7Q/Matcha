const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const accountModel = require('../models/account');

module.exports = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret, async (err, decode) => {
            if (!err) {
                try {
                    let user = await accountModel.findUserInfo('user_id', decode.userId, 'online', 'status');
                    req.user = user && user.online !== 0 ? decode : undefined;
                } catch {
                    return res.status(400).json();
                }
            }
        });
    } else {
        req.user = undefined;
    }
    return next();
}
