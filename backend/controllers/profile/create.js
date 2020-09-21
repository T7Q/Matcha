const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
	const { user_id,  gender, sex_preference, bio, birth_date, tags} = req.body;
	// Validate user profile data
	let errors = [];
	errors.push(profileHelper.validateGender(gender));
	errors.push(profileHelper.validateSexPreferences(sex_preference));
	errors.push(profileHelper.validateBio(bio));
	errors.push(profileHelper.validateBirthdate(birth_date));

	// Crosscheck the list of new tags with default tags in the database
	try {
		let tagsAreValid = await profileModel.validateTags(tags);
		if (!tagsAreValid)
			errors.push({ "error": "Invalid tags, some of them dont exist" });

		// remove empty objects from errors
		errors = errors.filter(error => { return Object.keys(error).length != 0});
		if (errors.length != 0)
			return res.status(400).json(errors);

		// Build query to insert tags into database
		const query = profileHelper.buildQueryForSavingTags(tags, user_id);

		// Insert tags to the database
		await profileModel.saveTags(query);
		
		// Add profile data to the database
			await profileModel.registerProfile(req);

		// Change user status to "2" to be discoverable by other users
		await profileModel.editProfile(user_id, "status", "2");
		return res.json({ msg: 'Your profile was successfully created' });
	} catch (e) {
		return res.status(404).json({ error: "Something went wrong adding Profile info" });
	}
}