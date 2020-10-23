const profileModel = require('../../models/profile');

const get = async (req, res) => {
    const type = req.params.type;
    const userId = req.user.userId;
    let result = [];
    let endResult = {
        like: 0,
        unlike: 0,
        match: 0,
        visit: 0,
        message: 0,
    };

    try {
        if (type === 'all') {
            // console.log('');
            result = await profileModel.getNotifications(userId);
            for (const { from_user_id, type } of result) {
                if (type !== 'like') {
                    endResult[[type]]++;
                } else {
                    let isMatch = await profileModel.otherUserLikesYou(userId, from_user_id);
                    isMatch !== '0' ? endResult['match']++ : endResult['like']++;
                }
            }
            console.log('end result', endResult);
            return res.json(endResult);
        } else if (type === 'messages') {
            result = await profileModel.getMessageNotifications(userId);
            return res.json(result.reduce((obj, item) => ((obj[item.type] = item.count), obj), {}));
        }
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
