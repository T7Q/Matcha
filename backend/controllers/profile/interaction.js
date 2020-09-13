const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profile_helper');

module.exports = async (req, res) => {
	const { key, from_user_id, to_user_id } = req.body;
	let result = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	}
	if (key == "likes" || key == "views" || key == "report_users" || key == "block_users") {
			result = await profileModel.insertRow(key, from_user_id, to_user_id);
			if (result.msg == 'success') {
				return res.json(result);
			}
			return res.status(400).json(result);
	} else {
		return res.status(400).json('Invalid parameters: error in key');
	}
}