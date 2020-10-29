const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const accountModel = require('../models/account');

const authentication = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret, async (err, decode) => {
            if (err) {
                req.user = undefined;
            } else {
                let user = await accountModel.findUserInfo(
                    'user_id',
                    decode.userId,
                    'online',
                    'status'
                );
                req.user = user && user.online !== 0 ? decode : undefined;
            }
            return next();
        });
    } else {
        req.user = undefined;
        return next();
    }
};

const authRequired = async (req, res, next) => {
    if (req.user) {
        const user = await accountModel.findUserInfo(
            'user_id',
            req.user.userId,
            'online',
            'status'
        );

        if (user && user.online === 1) {
            if (user.status === 1) {
                return res.json({ error: 'Fill your account' });
            }
            await accountModel.updateTime(req.user.userId, Date.now());
            return next();
        }
    }
    return res.json({ error: 'Unauthorized user!' });
};

const authWithStatus1 = async (req, res, next) => {
    if (req.user) {
        const user = await accountModel.findUserInfo(
            'user_id',
            req.user.userId,
            'online',
            'status'
        );

        if (user && user.online === 1) {
            await accountModel.updateTime(req.user.userId, Date.now());
            return next();
        } else {
            return res.json({ error: "You don't have priviliges" });
        }
    }
    return res.json({ error: 'Unauthorized user!' });
};

const authForbidden = async (req, res, next) => {
    if (req.user) {
        return res.json({ error: 'You should be logged out!' });
    }
    return next();
};

const unknownEndpoint = (req, res) => {
    res.json({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    console.log('error here', error);
    res.json({ error: 'something went wrong' });
};

module.exports = {
    authentication,
    authForbidden,
    authWithStatus1,
    authRequired,
    unknownEndpoint,
    errorHandler,
};
