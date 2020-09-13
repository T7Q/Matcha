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
	let result = {};
	result = await profileModel.registerProfile(req);
	if (result.msg = 'You profile was succesfully created'){
		let temp = {};
		temp = await profileModel.editProfile(user_id, "status", "2");
		if (temp.msg = 'You profile was succesfully updated'){
			// let temp1 = {};
			// temp1 = await profileModel.insertRow("report_users", 1, 2);
			// return res.json(temp1);
			return res.json(result);
		}
	}
	return res.status(400).json(result);
}
