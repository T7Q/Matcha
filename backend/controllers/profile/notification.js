const profileModel = require('../../models/profile');

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
};
