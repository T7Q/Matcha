const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");
const accountModel = require("../../models/account");

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

module.exports = async (req, res) => {
    console.log("\u001b[32m ENTERED id" + req.body.user_id);

    let userData = await accountModel.findUserInfo(
        "user_id",
        req.body.user_id,
        "user_id",
        "sex_orientation",
        "gender",
        "sex_preference",
        "geolocation",
        "chinese_horo",
        "western_horo"
    );
    userData['userHasTags'] = await profileModel.userHasTags(req.body.user_id);
    let values = [userData.user_id, userData.geolocation];
    
    // let base = matchHelper.setBase(req, userData);

    let condition = {
        weight: matchHelper.setWeights(req, userData.userHasTags),
        filter: matchHelper.buildFilter(req, userData, values),
        order:  matchHelper.buildSort(req),
        values: values
    };

    try {
        console.log("before match");
        let matches = await matchModel.getMatch(userData, condition);
        console.log("after match");
        console.log(matches);
        return res.json({ msg: "MATCHED" });
    } catch (e) {
        return res.status(400).json({error: e.detail || "Something went wrong getting matches"});
    }
};
