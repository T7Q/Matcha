const hello = require('./hello');

module.exports = (req, res, next) => {
    if (req.user && req.user.status === 1) {
        return hello(req, res);
    }
    if (req.user) {
        // set last time
        next();
    } else {
        return res.status(401).send({ 'msg': 'Unauthorized user!' });
    }
}
