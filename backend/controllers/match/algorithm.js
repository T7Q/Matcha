const matchModel = require("../../models/match");
const matchHelper = require("../../models/matchHelper");
const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

module.exports = async (req, res) => {
    const {
        user_id,
        type,
        min_age,
        max_age,
        min_distance,
        max_distance,
        tags,
		country,
		sort
	} = req.body;
	console.log("user id " + user_id);
	let userTags = await profileModel.userHasTags(user_id);
	
	if (!userTags){
		return res.json({ msg: 'user does not have tags' });
    }
    
    try {
        let matches = await matchModel.getMatch(user_id);
        // console.log(matches);
        console.log(matches);
        return res.json({ 'msg': '1st response' });
    } catch (e) {
        return res.status(400).json({ 'error': e.detail || "Something went wrong getting matches from database" });
    }
};
