const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profile_helper');

const add = async (req, res) => {
	const { key, from_user_id, to_user_id } = req.body;
	let insertData = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	}
	if (key == "likes" || key == "views" || key == "report_users" || key == "block_users") {
			insertData = await profileModel.insertRow(key, from_user_id, to_user_id);
			if (insertData.error){
				return res.status(400).json(insertData);
			}
			return res.json({ 'msg': 'succesfully saved' });
	} else {
		return res.status(400).json('Invalid parameters: error in key');
	}
}

const remove = async (req, res) => {
	const { key, from_user_id, to_user_id } = req.body;
	let insertData = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters: add key' });
	}
	if (key == "likes" || key == "views" || key == "report_users" || key == "block_users") {
			insertData = await profileModel.deleteRow(key, from_user_id, to_user_id);
			if (insertData.error){
				return res.status(400).json(insertData);
			}
			return res.json({ 'msg': 'succesfully removed' });
	} else {
		return res.status(400).json('Invalid parameters: error in key');
	}
}

module.exports = {
	add,
	remove
}
