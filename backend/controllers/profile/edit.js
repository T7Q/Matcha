const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profile_helper');

module.exports = async (req, res) => {
	const { user_id, key, value } = req.body;
	let error = {};
	if (!key) {
        return res.status(400).json({ 'msg': 'Invalid parameters' });
	}
	switch (key) {
		case "gender":
			error = profileHelper.validateGender(value);
			if (Object.keys(error).length  === 0) {
				let result = await profileModel.editProfile(user_id, key, value);
				return res.json(result);
			}
			return res.status(400).json(error);
		case "sex_preference":
			error = profileHelper.validateSexPreferences(value);
			if (Object.keys(error).length  === 0) {
				let result = await profileModel.editProfile(user_id, key, value);
				return res.json(result);
			}
			return res.status(400).json(error);
		case "bio":
			error = profileHelper.validateBio(value);
			if (Object.keys(error).length  === 0) {
				let result = await profileModel.editProfile(user_id, key, value);
				return res.json(result);
			}
			return res.status(400).json(error);
		case "birth_date":
			error = profileHelper.validateBio(value);
			if (Object.keys(error).length  === 0) {
				let result = await profileModel.editProfile(user_id, key, value);
				return res.json(result);
			}
			return res.status(400).json(error);
		case "tags": // TBC
			return profileHelper.tags(req, res);
		case "photo": // TBC
			return res.json('profile created ' + value);
		default:
			return res.status(400).json('Invalid parameters');
	}
}