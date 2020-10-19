const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');
const accountModel = require('../../models/account');

const userProfile = async (req, res) => {
    const userId = req.params.user_id;
    const authUserId = req.user.userId;
    try {
        let userInfo = await accountModel.findUserInfo(
            'user_id',
            userId,
            'user_id',
            'fame_rating',
            'bio',
            'first_name',
            'last_name',
            'email',
            'username',
            'chinese_horo',
            'western_horo',
            'gender',
            'country',
            'sex_preference',
            'birth_date',
            'profile_pic_path',
            'last_seen'
        );
        let tags = await profileModel.getUserTags(userId);
        if (tags.rowCount > 0) {
            userInfo['tags'] = [];
            tags['rows'].forEach(value => {
                userInfo['tags'].push(value.tag_name);
            });
        }
        let photos = await profileModel.getDataOneCondition('images', 'image_path', 'user_id', userId);
        userInfo['photos'] = photos.length > 0 ? photos : [];
        userInfo['connected'] = await profileModel.usersConnected(authUserId, userId);
        userInfo['age'] = await profileModel.getUserAge(userId);
        userInfo['distance'] = await profileModel.getDistance(authUserId, userId);
        userInfo['blocked'] = await profileModel.getBlockedValue(authUserId, userId);
        await profileModel.deleteRow('views', authUserId, userId);
        await profileModel.insertRow('views', authUserId, userId);
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: 'Error getting profile info' });
    }
};

const myProfile = async (req, res) => {
    const userId = req.user.userId;
    try {
        // add function here ****
        // console.log('before call');
        // await profileModel.insertFakeUsersTags();
        // console.log('after await');
        // ******

        let userInfo = await accountModel.findUserInfo(
            'user_id',
            userId,
            'user_id',
            'fame_rating',
            'bio',
            'first_name',
            'last_name',
            'country',
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
        let photos = await profileModel.getDataOneCondition('images', 'image_id, image_path', 'user_id', userId);
        userInfo['photos'] = photos.length > 0 ? photos : [];
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: 'Error getting profile info' });
    }
};

const blockedUsers = async (req, res) => {
    const userId = req.user.userId;
    try {
        let blockedList = await profileModel.getBlockedUsers(userId);
        blockedList.map(item => (item.blocked = true));
        return res.json(blockedList);
    } catch (e) {
        return res.json({ error: 'Error getting blocked users info' });
    }
};

const userTags = async (req, res) => {
    const userId = req.user.userId;
    try {
        let tags = await profileModel.getUserTags(userId);
        return res.json(tags.rows);
    } catch (e) {
        return res.json({ error: 'Error getting blocked users info' });
    }
};

module.exports = {
    userProfile,
    myProfile,
    blockedUsers,
    userTags,
};
