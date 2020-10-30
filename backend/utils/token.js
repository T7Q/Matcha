const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret, (err, decode) => {
            req.user = err ? undefined : decode;
        });
    } else {
        req.user = undefined;
    }
    return next();
};
