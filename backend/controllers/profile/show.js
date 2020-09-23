const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');
const accountModel = require('../../models/account');

const userProfile = async (req, res) => {
    console.log(req.body);

    try {
        let userInfo = await accountModel.findUserInfo("user_id", req.body.user_id, "user_id", "fame_rating",
        "bio", "first_name", "last_name", 
        "chinese_horo", "western_horo", "gender", "sex_preference", "birth_date");
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: "Error getting profile info" });
    }
};

const getProfile = async (req, res) => {
    let user_id = 1;    

    try {
        let userInfo = await accountModel.findUserInfo("user_id", user_id, "user_id", "fame_rating",
        "bio", "first_name", "last_name", 
        "chinese_horo", "western_horo", "gender", "sex_preference", "birth_date");
        return res.json(userInfo);
    } catch (e) {
        return res.json({ error: "Error getting profile info" });
    }
};

module.exports = {
    userProfile,
    getProfile
};
