require('dotenv').config({ path: 'config/.env' });
const jwt = require('jsonwebtoken');
const accountModel = require('../models/account');

module.exports = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        await jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, async (err, decode) => {
            if (!err) {
                let user = await accountModel.findUserInfo('user_id', decode.userId, 'online', 'status');
                if (user && user.online != 0) {
                    req.user = decode;
                } else {
                    req.user = undefined;
                }
            }
        });
    } else {
        req.user = undefined;
    }

    return next();
}
