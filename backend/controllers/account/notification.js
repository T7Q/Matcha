const accountModel = require('../../models/account');

const getNotifications = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await accountModel.getNotifications(userId);
        return res.json(result);
    } catch (e) {
        return res.json({ error: 'Something went wrong getting notification' });
    }
};

const editNotifications = async (req, res) => {
    const { email, push } = req.body;
    const userId = req.user.userId;

    try {
        await accountModel.updateAccount(userId, { email_notification: email, real_time_notification: push });
        return res.json({ msg: 'Notification settings were successfully updated' });
    } catch (e) {
        return res.json({ error: 'Something went wrong adding Profile info' });
    }
};

module.exports = {
    editNotifications,
    getNotifications,
};
