const profileModel = require('../../models/profile');

const add = async (req, res) => {
    const key = req.params.type;
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    try {
        await profileModel.insertRow(key, fromUserId, toUserId);
        return res.json({ msg: 'Succesfully saved' });
    } catch (e) {
        return res.json({
            error: 'Something went wrong adding data to the database',
        });
    }
};

const remove = async (req, res) => {
    const key = req.params.type;
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    try {
        await profileModel.deleteRow(key, fromUserId, toUserId);
        return res.json({ msg: 'Succesfully removed' });
    } catch (e) {
        return res.json({
            error: 'Something went wrong removing data from the database',
        });
    }
};

const connected = async (req, res) => {
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    try {
        const connected = await profileModel.usersConnected(fromUserId, toUserId);
        return res.json({ msg: connected });
    } catch (e) {
        return res.json({
            error: 'Something went wrong getting data from the database',
        });
    }
};

module.exports = {
    add,
    remove,
    connected,
};
