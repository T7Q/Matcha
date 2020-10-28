const profileModel = require('../../models/profile');

const add = async (req, res) => {
    const key = req.params.type;
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    await profileModel.insertRow(key, fromUserId, toUserId);
    return res.json({ msg: 'Succesfully saved' });
};

const remove = async (req, res) => {
    const key = req.params.type;
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    await profileModel.deleteRow(key, fromUserId, toUserId);
    return res.json({ msg: 'Succesfully removed' });
};

const connected = async (req, res) => {
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    const connected = await profileModel.usersConnected(fromUserId, toUserId);
    return res.json({ msg: connected });
};

module.exports = {
    add,
    remove,
    connected,
};
