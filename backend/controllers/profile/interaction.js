const profileModel = require("../../models/profile");

const add = async (req, res) => {
    const key = req.params.type;
    const to_user_id = req.params.user_id;
    const from_user_id = req.user.userId;
    // console.log("backend iNTERACTION",key, to_user_id);
    try {
        await profileModel.insertRow(key, from_user_id, to_user_id);
        return res.json({ msg: "Succesfully saved" });
    } catch (e) {
        return res.json({
            error: "Something went wrong adding data to the database",
        });
    }
};

const remove = async (req, res) => {
    const key = req.params.type;
    const to_user_id = req.params.user_id;
    const from_user_id = req.user.userId;
    if (!key) {
        return res.json({ error: "Invalid parameters" });
    }
    if (
        key == "likes" ||
        key == "views" ||
        key == "report_users" ||
        key == "block_users"
    ) {
        try {
            await profileModel.deleteRow(key, from_user_id, to_user_id);
            return res.json({ msg: "Succesfully removed" });
        } catch (e) {
            return res.json({
                error: "Something went wrong removing data from the database",
            });
        }
    } else {
        return res.json({ error: "Invalid parameters" });
    }
};

const connected = async (req, res) => {
    const toUserId = req.params.user_id;
    const fromUserId = req.user.userId;
    try {
        const connected = await profileModel.usersConnected(
            fromUserId,
            toUserId
        );
        return res.json({ msg: connected });
    } catch (e) {
        return res.json({
            error: "Something went wrong getting data from the database",
        });
    }
};

module.exports = {
    add,
    remove,
    connected,
};
