const profile = require('../profile')
const accountModel = require('../../models/account');

module.exports = async (req, res, next) => {
    if (req.user) {
        // check if user online
        const user = await accountModel.findUserInfo('user_id', req.user.userId, 'online', 'status');
        // console.log(req.baseUrl);
        // console.log(req.originalUrl);

        if (user && user.online === 1) {

            if (user.status === 1 && req.baseUrl === '/profile/create') {
                return profile.create(req, res);
            }

            if (user.status === 1 && req.baseUrl === '/profile/edit') {
                return profile.edit(req, res);
            }

            // set last action time to last_seen column
            await accountModel.updateTime(req.user.username, Date.now());
            return next();
        }
    }
    return res.status(401).json({ 'msg': 'Unauthorized user!' });

}
