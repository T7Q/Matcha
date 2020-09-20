const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const accountModel = require("../../models/account");
const { validateOrder } = require("../../models/matchHelper");

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
    // add check if user_id exists
    let errorOrder = matchHelper.validateOrder(req.body.order);
    let errorOrientation = matchHelper.validateOrientation(req.body.sex_orientation);
    if (errorOrder || errorOrientation)
        return res.status(400).json({ msg: "Invalid parameters or values" });

    let userDbData = await accountModel.findUserInfo(
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
    userDbData['userHasTags'] = await profileModel.userHasTags(req.body.user_id);
    let values = [userDbData.user_id, userDbData.geolocation];
    
    let settings = {
        weight: "",
        join: "",
        filter: "",
        order: "",
        limit: "",
        dateColumn: ", users.created_at as date ",
        values: values
    };
    matchHelper.buildBase(req, settings);
    settings.order = matchHelper.buildOrder(req.body.order, settings.order);
    settings.weight = matchHelper.setWeights(req.body.believe_cn, req.body.believe_west, userDbData.userHasTags);
    settings.filter = settings.filter + matchHelper.buildFilter(req, userDbData, values);

    try {
        let matches = await matchModel.getMatch(userDbData, settings);
        return res.json(matches);
    } catch (e) {
        return res.status(400).json({error: e.detail || "Something went wrong getting matches"});
    }
};
