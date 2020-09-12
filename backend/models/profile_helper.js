const validateGender = (gender) => {
	let errors = {};
	if (!gender) {
        errors['error'] = 'Mandatory field';
	}
	return errors;
}

const validateSexPreferences = (sexPreference) => {
	let errors = {};
	if (!sexPreference){
		errors['error'] = 'Pick one';
	}
	return errors;
}

const validateBio = (bio) => {
	let errors = {};
	if (!bio){
		errors['error'] = 'Required field';
	}
	if (bio.length > 200) {
		errors['error'] = 'Bio should be less between 1 to 200 characters';
	}
	return errors;
}

const getAge = (dob) => {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const validateBirthdate = (dob) => {
	let errors = {};
	let age = getAge(dob);
	if (age < 18) {
		errors['error'] = 'You must be at least 18 years old to user our services';
	} else if (age > 120) {
		errors['error'] =  'You must be alive to user our services';
	}
	return errors;
}


const tags = async (req, res) => {
	const { key, value } = req.body;
	if (value.length < 5) {
		return res.send({'msg': 'Pick at least 5 interests'});
	} else {
		return res.send({'msg': 'valid'});
	}
}

module.exports = {
	validateGender,
	validateSexPreferences,
	validateBio,
	validateBirthdate,
	getAge,
	tags
}