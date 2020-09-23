const accountModel = require('../models/account');

const required = async (req, res, next) => {
    if (req.user) {
        try {
            const user = await accountModel.findUserInfo('user_id', req.user.userId, 'online', 'status');

            if (user && user.online === 1) {
                if (user.status === 1 && req.baseUrl != '/profile/create') {
                    return res.json({ error: 'Fill your account' });
                }
                await accountModel.updateTime(req.user.userId, Date.now());
                return next();
            }
        } catch (e) {
            console.log(e);
            return res.json({ error: 'something went wrong' });
        }
    }
    return res.json({ error: 'Unauthorized user!' });
};

const forbidden = async (req, res, next) => {
    if (req.user) {
        return res.json({ error: 'You should be logged out!' });
    }
    return next();
};

module.exports = {
    required,
    forbidden,
};
