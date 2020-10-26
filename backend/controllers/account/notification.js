const accountModel = require('../../models/account');

const getNotifications = async (req, res) => {
    const userId = req.user.userId;

    const result = await accountModel.getNotifications(userId);
    return res.json(result);
};

const editNotifications = async (req, res) => {
    const { email, push } = req.body;
    const userId = req.user.userId;

    await accountModel.updateAccount(userId, { email_notification: email, real_time_notification: push });
    return res.json({ msg: 'Notification settings were successfully updated' });
};

module.exports = {
    editNotifications,
    getNotifications,
};
