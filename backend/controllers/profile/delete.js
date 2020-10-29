const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
    const userId = req.user.userId;

    // get all photo file names from the database
    let filename = {};
    filename = await profileModel.getDataOneCondition('images', 'image_path', 'user_id', userId);

    // delete photos from server and from the database
    for (const element of filename) {
        profileHelper.deleteFromFile(element.image_path);
        await profileModel.deleteRowOneCondition('images', 'image_path', element.image_path);
    }
    // delete account
    await profileModel.deleteRowOneCondition('users', 'user_id', userId);

    return res.json({ msg: 'Account was successfully removed' });
};
