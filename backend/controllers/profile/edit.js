const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

const general = async (req, res) => {
    const { user_id, key, value } = req.body;
    let error = {};

    if (!key) {
        return res.status(400).json({ msg: "Invalid parameters" });
    }
    // Validate new profile info
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
            error = profileHelper.validateBirthdate(value);
            break;
        case "country":
            break;
        default:
            return res.status(400).json("Invalid parameters");
    }
    // Check for validation errors
    if (Object.keys(error).length !== 0) {
        return res.status(400).json(error);
    }
    // Update profile parameter
    try {
        await profileModel.editProfile(user_id, key, value);
        return res.json({ msg: "Your profile was successfully updated" });
    } catch (e) {
        return res
            .status(404)
            .json({ error: "Something went wrong adding Profile info" });
    }
};

const tags = async (req, res) => {
    const { user_id, key, value } = req.body;
    try {
        // Crosscheck the list of new tags with default tags in the database
        let validateTagsInDb = await profileModel.validateTagsInDb(value);
        if (!validateTagsInDb) {
            return res.status(404).json({ error: "Invalid tags, some of them dont exist" });
        }
        // Remove old tags if user has any
        userTags = await profileModel.userHasTags(user_id);
        if (userTags) {
            await profileModel.deleteRowOneCondition("user_tags", "user_id", user_id);
        }
        // Build query to insert tags into database
        const query = profileHelper.buildQueryForSavingTags(value, user_id);

        // Insert tags to the database
        await profileModel.saveTags(query);

        return res.json({ msg: "Tags were successfully updated" });
    } catch (e) {
        return res.status(404).json({error: "Something went wrong adding tags to the database",});
    }
};

module.exports = {
    general,
    tags,
};
