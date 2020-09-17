const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");
const accountModel = require("../../models/account");

/* 
    data = {
        user_id,
        type,
        min_age,
        max_age,
        min_distance,
        max_distance,
        tags,
        country,
        sort
    }
*/

module.exports = async (req, res) => {
    console.log("user id " + req.body.user_id);

    // score to weight tags, western and chinese horoscope, should match to 1
    let scoreWeight = { tag: 0.1, cn: 0.45, west: 0.45 };

    let userHasTags = await profileModel.userHasTags(req.body.user_id);
    if (!userHasTags) {
        return res.json({ msg: "user does not have tags" });
    }
    let userData = await accountModel.findUserInfo(
        "user_id",
        req.body.user_id,
        "user_id",
        "sex_orientation",
        "gender",
        "geolocation",
        "chinese_horo",
        "western_horo"
    );

    // console.log(userData['geolocation']);
    let condition = {};
    condition = matchHelper.buildCondition(req, userData);

    try {
        console.log("before match");
        let matches = await matchModel.getMatch(
            userData,
            scoreWeight,
            condition,
            userData.geolocation,
        );


        console.log("after match");
        console.log(matches);

        return res.json({ msg: "MATCHED" });
    } catch (e) {
        return res
            .status(400)
            .json({
                error:
                    e.detail ||
                    "Something went wrong getting matches from database",
            });
    }
};
