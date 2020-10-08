const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');
const accountModel = require('../../models/account');

const userProfile = async (req, res) => {
    try {
        let userInfo = await accountModel.findUserInfo(
            'user_id',
            req.body.user_id,
            'user_id',
            'fame_rating',
            'bio',
            'first_name',
            'last_name',
            'chinese_horo',
            'western_horo',
            'gender',
            'sex_preference',
            'birth_date'
        );
        let tags = await profileModel.getUserTags(req.body.user_id);
        if (tags.rowCount > 0) {
            userInfo['tags'] = [];
            tags['rows'].forEach(value => {
                userInfo['tags'].push(value.tag_name);
            });
        }
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: 'Error getting profile info' });
    }
};

const myProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        let userInfo = await accountModel.findUserInfo(
            'user_id',
            userId,
            'user_id',
            'fame_rating',
            'bio',
            'first_name',
            'last_name',
            'username',
            'chinese_horo',
            'western_horo',
            'gender',
            'sex_preference',
            'birth_date',
            'profile_pic_path'
        );
        let tags = await profileModel.getUserTags(userId);
        if (tags.rowCount > 0) {
            userInfo['tags'] = [];
            tags['rows'].forEach(value => {
                userInfo['tags'].push(value.tag_name);
            });
        }
        // const images = await profileModel.getUserPhotos(userId);
        // userInfo['images'] = images.rows;
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: 'Error getting profile info' });
    }
};

module.exports = {
    userProfile,
    myProfile,
};
