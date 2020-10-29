const profileModel = require('../../models/profile');
const accountModel = require('../../models/account');
const matchModel = require('../../models/match');

const userProfile = async (req, res) => {
    const userId = req.params.user_id;
    const authUserId = req.user.userId;

    const userExists = await profileModel.userExists(userId);
    if (userExists === '0') {
        return res.json({ error: 'This profile does not exist' });
    }

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
        'sex_orientation',
        'birth_date',
        'profile_pic_path',
        'last_seen',
        'online'
    );
    let tags = await profileModel.getUserTags(userId);
    if (tags.rowCount > 0) {
        userInfo['tags'] = [];
        tags['rows'].forEach((value) => {
            userInfo['tags'].push(value.tag_name);
        });
    }
    let photos = await profileModel.getDataOneCondition('images', 'image_path', 'user_id', userId);
    userInfo['photos'] = photos.length > 0 ? photos : [];
    userInfo['connected'] = await profileModel.usersConnected(authUserId, userId);
    userInfo['age'] = await profileModel.getUserAge(userId);
    userInfo['distance'] = await profileModel.getDistance(authUserId, userId);
    userInfo['blocked'] = await profileModel.getBlockedValue(authUserId, userId);
    const weight = { tag: 0.1, cn: 0.45, west: 0.45 };
    let authUserInfo = await accountModel.findUserInfo(
        'user_id',
        authUserId,
        'user_id',
        'chinese_horo',
        'western_horo'
    );
    authUserInfo['hasTags'] = await profileModel.userHasTags(authUserId);
    userInfo['compatibility'] = await matchModel.getCompatibility(authUserInfo, userInfo, weight);
    return res.json(userInfo);
};

const myProfile = async (req, res) => {
    const userId = req.user.userId;
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
        'sex_orientation',
        'birth_date',
        'profile_pic_path'
    );
    let tags = await profileModel.getUserTags(userId);
    if (tags.rowCount > 0) {
        userInfo['tags'] = [];
        tags['rows'].forEach((value) => {
            userInfo['tags'].push(value.tag_name);
        });
    }
    let photos = await profileModel.getDataOneCondition(
        'images',
        'image_id as old_image_id, image_path',
        'user_id',
        userId
    );
    photos.map((element) => {
        if (element.image_path === userInfo.profile_pic_path) element.type = 'profile';
        else element.type = 'photo';
        element.data = '';
    });
    userInfo['photos'] = photos.length > 0 ? photos : [];
    return res.json(userInfo);
};

const blockedUsers = async (req, res) => {
    const userId = req.user.userId;
    let blockedList = await profileModel.getBlockedUsers(userId);
    blockedList.map((item) => (item.blocked = true));
    return res.json(blockedList);
};

const userTags = async (req, res) => {
    const userId = req.user.userId;
    let tags = await profileModel.getUserTags(userId);
    return res.json(tags.rows);
};

const visitOtherProfile = async (req, res) => {
    const userId = req.params.user_id;
    const authUserId = req.user.userId;
    if (userId !== authUserId) {
        await profileModel.deleteRow('views', authUserId, userId);
        await profileModel.insertRow('views', authUserId, userId);
    }
    return res.json();
};

module.exports = {
    userProfile,
    myProfile,
    blockedUsers,
    userTags,
    visitOtherProfile,
};
