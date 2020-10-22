const profileModel = require('../../models/profile');

const get = async (req, res) => {
    const type = req.params.type;
    const userId = req.user.userId;
    let result = [];

    try {
        if (type === 'all') {
            result = await profileModel.getNotifications(userId);
        } else if (type === 'messages') {
            result = await profileModel.getMessageNotifications(userId);
        }
        result = result.reduce((obj, item) => ((obj[item.type] = item.count), obj), {});
        if (!Object.keys(result).includes('message')) {
            result.message = 0;
        }
        if (!Object.keys(result).includes('like')) {
            result.like = 0;
        }
        if (!Object.keys(result).includes('unlike')) {
            result.unlike = 0;
        }
        if (!Object.keys(result).includes('visit')) {
            result.visit = 0;
        }
        console.log('in notifications ', result);
        return res.json(result);
    } catch (e) {
        return res.json({ error: 'Something went wrong getting notification' });
    }
};

const remove = async (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    const userId = req.user.userId;

    try {
        if (type === 'message' && id > 0) {
            const rows = await profileModel.deleteMessageNotifications(userId, id);
            return res.json(rows);
        } else {
            const rows = await profileModel.deleteNotifications(userId, type);
            return res.json(rows);
        }
    } catch (e) {
        console.log(e);
        return res.json({ error: 'Something went wrong adding Profile info' });
    }
};

module.exports = {
    remove,
    get,
};
