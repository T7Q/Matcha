const profileModel = require('../../models/profile');

const edit = async (req, res) => {
	const { user_id, key, value } = req.body;
	return res.json(req.body);
	let error = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters' });
	}
	switch (key) {
		case "email_notification":
	// 		// check current setting in db
	// 		// value = 
			break;
		case "real_time_notification":
	// 		// check current setting in db
	// 		// value = 
			break;
		default:
			return res.status(400).json('Invalid parameters');
	}
	// check for validation errors
	if (Object.keys(error).length  !== 0) {
		return res.status(400).json(error);
	}

	// let editProfile = {};
	// editProfile= await profileModel.editProfile(user_id, key, value);

	// // check for entering data to db errors
	// if (editProfile.error){
	// 	return res.status(400).json(editProfile);
	// }
	return res.json({ 'msg': 'Your profile was successfully updated' });
}

module.exports = {
	edit
}