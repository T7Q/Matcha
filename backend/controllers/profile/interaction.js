const profileModel = require('../../models/profile');

const add = async (req, res) => {
	const { key, to_user_id } = req.body;
	const from_user_id = req.user.userId;
	if (!key) {
		return res.json({ error: "Invalid parameters" });
	}
	if (key == "likes" || key == "views" || key == "report_users" || key == "block_users") {
		try {	
			await profileModel.insertRow(key, from_user_id, to_user_id);
			return res.json({ 'msg': 'Succesfully saved' });
		} catch (e) {
			return res.json({ error: "Something went wrong adding data to the database" });
		}
	} else {
		return res.json({ error: "Invalid parameters" });
	}
}

const remove = async (req, res) => {
	const { key, to_user_id } = req.body;
	const from_user_id = req.user.userId;
	if (!key) {
        return res.json({ error: "Invalid parameters" });
	}
	if (key == "likes" || key == "views" || key == "report_users" || key == "block_users") {
		try {	
			await profileModel.deleteRow(key, from_user_id, to_user_id);
			return res.json({ 'msg': 'Succesfully removed' });
		} catch (e) {
			return res.json({ error: "Something went wrong removing data from the database" });
		}
	} else {
		return res.json({ error: "Invalid parameters" });
	}
}

module.exports = {
	add,
	remove
}
