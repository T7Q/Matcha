const matchModel = require('../../models/match');
const matchHelper = require('../../models/matchHelper');
const profileModel = require('../../models/profile');
const accountModel = require('../../models/account');

const likedMe = async (req, res) => {
    let userDbData = await accountModel.findUserInfo(
        'user_id',
        req.user.userId,
        'user_id',
        'geolocation',
        'chinese_horo',
        'western_horo'
    );
    userDbData['userHasTags'] = await profileModel.userHasTags(req.user.userId);

    let settings = {
        weight: { tag: 0.1, cn: 0.45, west: 0.45 },
        dateColumn: ' , likes.date_created as date',
        join: ' LEFT JOIN likes ON likes.from_user_id = users.user_id ',
        filter:
            ' AND likes.to_user_id = $1 AND (SELECT count(blocked.to_user_id) FROM blocked\
                    WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0',
        order: 'date desc, match desc, distance desc',
        limit: '',
        values: [userDbData.user_id, userDbData.geolocation],
    };
    let matches = await matchModel.getMatch(userDbData, settings);
    return res.json(matches);
};

const connected = async (req, res) => {
    let userDbData = await accountModel.findUserInfo(
        'user_id',
        req.user.userId,
        'user_id',
        'geolocation',
        'chinese_horo',
        'western_horo'
    );
    userDbData['userHasTags'] = await profileModel.userHasTags(req.user.userId);

    let settings = {
        weight: { tag: 0.1, cn: 0.45, west: 0.45 },
        dateColumn: ', users.created_at as date ',
        join: '',
        filter:
            ' AND (SELECT count(likes.like_id) AS from_likes FROM likes\
                WHERE likes.from_user_id = users.user_id AND likes.to_user_id = $1) = 1\
                AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                WHERE likes.from_user_id = $1 AND likes.to_user_id = users.user_id) = 1\
                AND (SELECT count(blocked.to_user_id) FROM blocked\
                WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0',
        order: 'date desc, match desc, distance desc',
        limit: '',
        values: [userDbData.user_id, userDbData.geolocation],
    };
    let matches = await matchModel.getMatch(userDbData, settings);
    return res.json(matches);
};

const visitedMe = async (req, res) => {
    let userDbData = await accountModel.findUserInfo(
        'user_id',
        req.user.userId,
        'user_id',
        'geolocation',
        'chinese_horo',
        'western_horo'
    );
    userDbData['userHasTags'] = await profileModel.userHasTags(req.user.userId);

    let settings = {
        weight: { tag: 0.1, cn: 0.45, west: 0.45 },
        dateColumn: ', views.date_created AS date ',
        join: ' LEFT JOIN views ON views.from_user_id = users.user_id ',
        filter: ' AND views.to_user_id = $1',
        order: 'date desc, match desc, distance desc',
        limit: '',
        values: [userDbData.user_id, userDbData.geolocation],
    };
    let matches = await matchModel.getMatch(userDbData, settings);
    return res.json(matches);
};

const visitedByMe = async (req, res) => {
    let userDbData = await accountModel.findUserInfo(
        'user_id',
        req.user.userId,
        'user_id',
        'geolocation',
        'chinese_horo',
        'western_horo'
    );
    userDbData['userHasTags'] = await profileModel.userHasTags(req.user.userId);

    let settings = {
        weight: { tag: 0.1, cn: 0.45, west: 0.45 },
        dateColumn: ', views.date_created AS date ',
        join: ' LEFT JOIN views ON views.to_user_id = users.user_id ',
        filter: ' AND views.from_user_id = $1 ',
        order: 'date desc, match desc, distance desc',
        limit: '',
        values: [userDbData.user_id, userDbData.geolocation],
    };
    let matches = await matchModel.getMatch(userDbData, settings);
    return res.json(matches);
};

module.exports = {
    likedMe,
    connected,
    visitedMe,
    visitedByMe,
};
