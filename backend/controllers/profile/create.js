const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
	const { user_id,  gender, sex_preference, bio, birth_date} = req.body;
	// Validate user profile data
	let errors = [];
	errors.push(profileHelper.validateGender(gender));
	errors.push(profileHelper.validateSexPreferences(sex_preference));
	errors.push(profileHelper.validateBio(bio));
	errors.push(profileHelper.validateBirthdate(birth_date));

	// remove empty objects from errors
    errors = errors.filter(error => { return Object.keys(error).length != 0});
    if (errors.length != 0) {
        return res.status(400).json(errors);
	}
	
	// Add profile data to the database
	try {
		await profileModel.registerProfile(req);
	} catch (e) {
		return res.status(404).json({ error: "Something went wrong adding Profile info" });
	}

	// Change user status to "2" to be discoverable by other users
	try {
		await profileModel.editProfile(user_id, "status", "2");
	} catch (e) {
		return res.status(404).json({ error: "Something went wrong adding Profile info" });
	}
	return res.json({ msg: 'Your profile was successfully created' });
}
