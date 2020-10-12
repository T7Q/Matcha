const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const accountModel = require("../../models/account");

recommend = async (req, res) => {
    const userId = req.user.userId;

    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            userId,
            "user_id",
            "sex_orientation",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(userId);

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            join: "",
            filter:
                " AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                        WHERE likes.from_user_id = $1\
                        AND likes.to_user_id = users.user_id) = 0\
                        AND (SELECT count(blocked.to_user_id) FROM blocked\
                        WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0",
            order: "match desc, distance desc, fame desc",
            limit: "",
            dateColumn: ", users.created_at as date ",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        // get more filters for nearby, popular, online, new, random
        matchHelper.buildBase(req, settings);

        // add filter to match correct sex orintation
        settings.filter += matchHelper.setSexPreference(
            userDbData.sex_orientation,
            ""
        );
        // console.log(settings.filter);
        // get match from db
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting matches",
        });
    }
};

const likedMe = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.user.userId,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(
            req.user.userId
        );

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            dateColumn: " , likes.date_created as date",
            join: " LEFT JOIN likes ON likes.from_user_id = users.user_id ",
            filter:
                " AND likes.to_user_id = $1\
                    AND (SELECT count(blocked.to_user_id) FROM blocked\
                    WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0",
            order: "date desc, match desc, distance desc",
            limit: "",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting liked you matches",
        });
    }
};

const connected = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.user.userId,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(
            req.user.userId
        );

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            dateColumn: ", users.created_at as date ",
            join: "",
            filter:
                " AND (SELECT count(likes.like_id) AS from_likes FROM likes\
                        WHERE likes.from_user_id = users.user_id AND likes.to_user_id = $1) = 1\
                        AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                        WHERE likes.from_user_id = $1 AND likes.to_user_id = users.user_id) = 1\
                        AND (SELECT count(blocked.to_user_id) FROM blocked\
                        WHERE from_user_id = $1 AND to_user_id = users.user_id) = 0",
            order: "date desc, match desc, distance desc",
            limit: "",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting liked you matches",
        });
    }
};

const visitedMe = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.user.userId,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(
            req.user.userId
        );

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            dateColumn: ", views.date_created AS date ",
            join: " LEFT JOIN views ON views.from_user_id = users.user_id ",
            filter: " AND views.to_user_id = $1",
            order: "date desc, match desc, distance desc",
            limit: "",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting liked you matches",
        });
    }
};

const visitedMeNew = async (req, res) => {
    // NOT FINALIZED
    // need to add reference to DATE_FROM_NOTIFICATIONS
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.user.userId,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(
            req.user.userId
        );

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            dateColumn: ", views.date_created AS date ",
            join: " LEFT JOIN views ON views.from_user_id = users.user_id ",
            filter:
                " AND views.to_user_id = $1\
                        AND views.date_created  = DATE_FROM_NOTIFICATIONS",
            order: "date desc, match desc, distance desc",
            limit: "",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting liked you matches",
        });
    }
};

const visitedByMe = async (req, res) => {
    try {
        let userDbData = await accountModel.findUserInfo(
            "user_id",
            req.user.userId,
            "user_id",
            "geolocation",
            "chinese_horo",
            "western_horo"
        );
        userDbData["userHasTags"] = await profileModel.userHasTags(
            req.user.userId
        );

        let settings = {
            weight: { tag: 0.1, cn: 0.45, west: 0.45 },
            dateColumn: ", views.date_created AS date ",
            join: " LEFT JOIN views ON views.to_user_id = users.user_id ",
            filter: " AND views.from_user_id = $1 ",
            order: "date desc, match desc, distance desc",
            limit: "",
            values: [userDbData.user_id, userDbData.geolocation],
        };
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.json({
            error: e.detail || "Something went wrong getting liked you matches",
        });
    }
};

module.exports = {
    likedMe,
    connected,
    recommend,
    visitedMe,
    visitedMeNew,
    visitedByMe,
};
