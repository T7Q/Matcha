const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
    const userId = req.user.userId;

    const result = await accountModel.findUserInfo(
        'user_id',
        userId,
        'status',
        'username',
        'email',
        'latitude',
        'longitude'
    );
    result.userId = userId;
    const photos = await profileModel.userHasPhotos(userId);
    result.userHasPhotos = photos;
    return res.json(result);
};
