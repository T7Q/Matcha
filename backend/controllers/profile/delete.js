const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
	const { key, user_id} = req.body;

	let result = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	}
	if (key == "delete") {
		result = await profileModel.deleteRowOneCondition ("users", "user_id", user_id);
		if (result.error){
			return res.status(400).json(result);
		}
		return res.json({ 'msg': 'account successfully removed' });
	} else {
		return res.status(400).json('Invalid parameters: error in key');
	}
}