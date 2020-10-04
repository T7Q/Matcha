const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
    // console.log('create profile', req.body);
    const { gender, sex_preference, bio, birth_date, tags, country } = req.body;
    const userId = req.user.userId;
    console.log(req.body);
    try {
        // Validate user profile data
        let errors = [];
        errors.push(profileHelper.validateGender(gender));
        errors.push(profileHelper.validateSexPreferences(sex_preference));
        errors.push(profileHelper.validateBio(bio));
        errors.push(profileHelper.validateBio(country));
        errors.push(profileHelper.validateBirthdate(birth_date));
        errors.push(await profileHelper.validateTags(tags));
        // console.log('create1');
        // remove empty objects from errors
        errors = errors.filter(error => {
            return Object.keys(error).length != 0;
        });

        if (errors.length != 0) return res.json({ error: errors });

        // Build query to insert tags into database
        // console.log('create2');
        const query = profileHelper.buildQueryForSavingTags(tags, userId);
        // console.log('create3');
        // Insert tags to the database
        await profileModel.saveTags(query);
        // console.log('create4');
        // Add profile data to the database
        await profileModel.registerProfile(userId, req);
        console.log('create5');

        // Change user status to "2" to be discoverable by other users
        await profileModel.editProfile(userId, 'status', '2');

        return res.json({ msg: 'Your profile was successfully created' });
    } catch (e) {
        return res.json({ error: 'Something went wrong adding Profile info' });
    }
};
