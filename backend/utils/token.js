require('dotenv').config({ path: 'config/.env' });
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            req.user = err ? undefined : decode;
        });
    } else {
        req.user = undefined;
    }
    return next();
}
