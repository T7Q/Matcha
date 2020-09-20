const profileModel = require('../../models/profile');

module.exports = async (req, res) => {
	const { key, user_id} = req.body;

	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	} else if (key == "delete") {
		try {
			await profileModel.deleteRowOneCondition ("users", "user_id", user_id);
			return res.json({ msg: 'Account was successfully removed' });
		} catch (e) {
			return res.status(404).json({ error: "Something went wrong removing data from database" });
		}
	} else {
		return res.status(400).json('Invalid parameters');
	}
}