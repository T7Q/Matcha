const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profile_helper');

module.exports = async (req, res) => {
	const { user_id,  gender, sex_preference, bio, birth_date} = req.body;
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
	// return res.json( {'msg': 'Your profile was successfully updated'} );
	return profileModel.registerProfile(req, res);
}
