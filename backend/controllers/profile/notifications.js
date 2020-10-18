const profileModel = require('../../models/profile');

const get = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await profileModel.getNotifications(userId);
        return res.json(result.reduce((obj, item) => ((obj[item.type] = item.count), obj), {}));
    } catch (e) {
        return res.json({ error: 'Something went wrong getting notification' });
    }
};

const edit = async (req, res) => {
    const { email, push } = req.body;
    const userId = req.user.userId;

    try {
        await profileModel.editProfile(userId, 'email_notification', email);
        await profileModel.editProfile(userId, 'real_time_notification', push);
        return res.json({ msg: 'Notification settings were successfully updated' });
    } catch (e) {
        return res.json({ error: 'Something went wrong adding Profile info' });
    }
};

module.exports = {
    edit,
    get,
};
