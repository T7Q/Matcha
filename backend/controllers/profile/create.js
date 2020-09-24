const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
	const { user_id,  gender, sex_preference, bio, birth_date, tags} = req.body;
	console.log(req.body);
	// Validate user profile data
	let errors = [];
	errors.push(profileHelper.validateGender(gender));
	errors.push(profileHelper.validateSexPreferences(sex_preference));
	errors.push(profileHelper.validateBio(bio));
	errors.push(profileHelper.validateBirthdate(birth_date));
	let tagsError = profileHelper.validateTags(tags);
	if(!tagsError.error){
		try {
			// Crosscheck the list of new tags with default tags in the database
			let tagsAreValid = await profileModel.validateTagsInDb(tags);
			if (!tagsAreValid){
				tagsError['error'] = "Invalid tags, some of them dont exist";
			} else {
				// Build query to insert tags into database
				const query = profileHelper.buildQueryForSavingTags(tags, user_id);
				// Insert tags to the database
				await profileModel.saveTags(query);
			}
		} catch (e) {
			return res.json({ error: "Something went wrong adding tags" });
		}
	}
	errors.push(tagsError);
	// remove empty objects from errors
	errors = errors.filter(error => { return Object.keys(error).length != 0});
	if (errors.length != 0)
		return res.status(400).json(errors);
	
	try {
		// Add profile data to the database
		await profileModel.registerProfile(user_id, req);

		// Change user status to "2" to be discoverable by other users
		await profileModel.editProfile(user_id, "status", "2");

		return res.json({ msg: 'Your profile was successfully created' });
	} catch (e) {
		return res.status(404).json({ error: "Something went wrong adding Profile info" });
	}
}