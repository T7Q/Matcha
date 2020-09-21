const profileModel = require('../../models/profile');
const profileHelper = require("../../models/profileHelper");

module.exports = async (req, res) => {
	const { key, user_id} = req.body;
	if (!key) {
		return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	} else if (key === "delete") {
		try {
			// get all photo file names from the database
			let filename = {};
			filename = await profileModel.getDataOneCondition("images", "image_path", "user_id", user_id);
			// delete photos from server and from the database
			for(const element of filename) {
				profileHelper.deleteFromFile(element.image_path);
				await profileModel.deleteRowOneCondition("images", "image_path", element.image_path);
			}
			// delete account
			await profileModel.deleteRowOneCondition ("users", "user_id", user_id);
			return res.json({ msg: 'Account was successfully removed' });
		} catch (e) {
			return res.status(404).json({ error: "Something went wrong removing data from database" });
		}
	} else {
		return res.status(400).json('Invalid parameters');
	}
}