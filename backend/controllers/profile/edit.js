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
			break;
		case "sex_preference":
			error = profileHelper.validateSexPreferences(value);
			break;
		case "bio":
			error = profileHelper.validateBio(value);
			break;
		case "birth_date":
			error = profileHelper.validateBio(value);
			break;
		case "tags": // TBC
			return profileHelper.tags(req, res);
		case "photo": // TBC
			return res.json('profile created ' + value);
		default:
			return res.status(400).json('Invalid parameters');
	}
	// check for validation errors
	if (Object.keys(error).length  !== 0) {
		return res.status(400).json(error);
	}
	let editProfile= {};
	editProfile= await profileModel.editProfile(user_id, key, value);

	// check for entering data to db errors
	if (editProfile.error){
		return res.status(400).json(editProfile);
	}
	return res.json({ 'msg': 'Your profile was successfully updated' });
}