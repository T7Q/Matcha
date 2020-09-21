const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const accountModel = require("../../models/account");2

/* 
    req data = {
        user_id: value (mandatory!)
        type: "recommended" "mandatory"
        min_age: values ("", 24), default 18
        max_age: values ("", 50), default 120
        min_distance: values ("", 0), default 0
        max_distance: values ("", 5000), default 10000000
        tags: values ("", ["Art", "Foodie"....)
        country: values ("", ["Finland", "Belgium"....)
        sort: values ("", ["filter_asc", "filter_desc"....)
        believe_cn: values (options "", 0, 1)
        believe_west: values (options "", 0, 1)
    }
*/

const likedMe = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.body.user_id,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData['userHasTags'] = await profileModel.userHasTags(req.body.user_id);
        
        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            join: " LEFT JOIN likes ON likes.from_user_id = users.user_id ",
            filter: " AND likes.to_user_id = $1 ",
            order: "date desc, match desc, distance desc",
            limit: "",
            dateColumn: " , likes.date_created as date",
            values: [userDbData.user_id, userDbData.geolocation]
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.status(400).json({error: e.detail || "Something went wrong getting liked you matches"});
    }
};

const connected = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.body.user_id,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData['userHasTags'] = await profileModel.userHasTags(req.body.user_id);
        
        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            join: "",
            filter: " AND (SELECT count(likes.like_id) AS from_likes FROM likes\
                        WHERE likes.from_user_id = users.user_id AND likes.to_user_id = $1) = 1\
                        AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                        WHERE likes.from_user_id = $1 AND likes.to_user_id = users.user_id) = 1",
            order: "date desc, match desc, distance desc",
            limit: "",
            dateColumn: "",
            values: [userDbData.user_id, userDbData.geolocation]
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.status(400).json({error: e.detail || "Something went wrong getting liked you matches"});
    }
};

module.exports = {
    likedMe,
    connected
};