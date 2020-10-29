const matchModel = require('../../models/match');
const matchHelper = require('../../models/matchHelper');
const profileModel = require('../../models/profile');
const accountModel = require('../../models/account');

/*
    req data = {
        type: "recommended" (options: recommended, online, nearby)
        min_age: values ("", 24), default 18
        max_age: values ("", 50), default 120
        min_distance: values ("", 0), default 0
        max_distance: values ("", 5000), default 10000000
        tags: values ("", ["Art", "Foodie"....)
        country: values ("", ["Finland", "Belgium"....)
        sort: values ("", ["filter_asc", "filter_desc"....)
        believe_cn: values (options "", false, true)
        believe_west: values (options "", false, true)
    }
*/

module.exports = async (req, res) => {
    const userId = req.user.userId;
    let errorOrder = matchHelper.validateOrder(req.body.order);
    let errorOrientation = matchHelper.validateOrientation(req.body.sex_orientation);
    if (errorOrder || errorOrientation) return res.json({ error: 'Invalid parameters or values' });

    // get loggedIn user data from Db
    let userDbData = await accountModel.findUserInfo(
        'user_id',
        userId,
        'user_id',
        'sex_orientation',
        'gender',
        'sex_preference',
        'geolocation',
        'chinese_horo',
        'western_horo'
    );
    userDbData['userHasTags'] = await profileModel.userHasTags(userId);
    let values = [userDbData.user_id, userDbData.geolocation];

    // prepare the values to find a match in db
    let settings = {
        weight: '',
        join: '',
        filter:
            ' AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                        WHERE likes.from_user_id = $1\
                        AND likes.to_user_id = users.user_id) = 0\
                AND (SELECT count(blocked.to_user_id) FROM blocked\
                    WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0',
        order: '',
        limit: '',
        dateColumn: ', users.created_at as date ',
        values: values,
    };

    matchHelper.buildBase(req, settings);
    settings.order = matchHelper.buildOrder(req.body.order, settings.order);
    settings.weight = matchHelper.setWeights(req.body.believe_cn, req.body.believe_west, userDbData.userHasTags);
    settings.filter += matchHelper.buildFilter(req, userDbData, values);

    // get matches from db
    let matches = await matchModel.getMatch(userDbData, settings);
    return res.json(matches);
};
