const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

module.exports = async (req, res) => {
    const { gender, sex_preference, bio, birth_date, tags, country } = req.body;
    const userId = req.user.userId;

    // Validate user profile data
    let errors = [];
    errors.push(profileHelper.validateGender(gender));
    errors.push(profileHelper.validateSexPreferences(sex_preference));
    errors.push(profileHelper.validateBio(bio));
    errors.push(profileHelper.validateBio(country));
    errors.push(profileHelper.validateBirthdate(birth_date));
    errors.push(await profileHelper.validateTags(tags));

    // remove empty objects from errors
    errors = errors.filter((error) => {
        return Object.keys(error).length != 0;
    });

    errors = Object.assign({}, ...errors);

    if (Object.keys(errors).length !== 0) return res.json({ error: errors });

    // Build query to insert tags into database
    // Remove old tags if user has any
    const userTags = await profileModel.userHasTags(userId);
    if (userTags) {
        await profileModel.deleteRowOneCondition('user_tags', 'user_id', userId);
    }
    const query = profileHelper.buildQueryForSavingTags(tags, userId);

    // Insert tags to the database
    await profileModel.saveTags(query);

    // Add profile data to the database
    await profileModel.registerProfile(userId, req);

    // Change user status to "2" to be discoverable by other users
    await profileModel.editProfile(userId, 'status', '2');
    await profileModel.editProfile(userId, 'online', '1');

    return res.json({
        tkn: jwt.sign({ userId: userId, status: 2 }, jwtSecret, { expiresIn: 1000 * 60 * 60 }),
    });
};
