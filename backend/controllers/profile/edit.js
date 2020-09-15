const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

module.exports = async (req, res) => {
    const { user_id, key, value } = req.body;
    let error = {};
    if (!key) {
        return res.status(400).json({ msg: "Invalid parameters" });
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
        case "tags":
            let result = {};
			let error = false;

			let userTags = await profileModel.userHasTags(user_id);
			if (userTags){
				let deleteOldTags = await profileModel.deleteRowOneCondition(
					"user_tags",
					"user_id",
					user_id
				);
				
				if (deleteOldTags.error) {
					return res.json({ 'error': "Error removing old tags" });
				}
			}

            for (const element of value) {
                let result = await profileModel.tagExists(element);
                if (!result) {
                    error = true;
                    return res.json({ 'error': "Tag does not exist" });
				}
				tagId = await profileModel.getTagId(element);
				let addTag = profileModel.insertTags(user_id, tagId);
				if (addTag.error) {
					return res.status(400).json(error);
				}
            }
            return res.json({ msg: "Tags were successfully updated" });
        default:
            return res.status(400).json("Invalid parameters");
    }
    // check for validation errors
    if (Object.keys(error).length !== 0) {
        return res.status(400).json(error);
    }
    let editProfile = {};
    editProfile = await profileModel.editProfile(user_id, key, value);

    // check for entering data to db errors
    if (editProfile.error) {
        return res.status(400).json(editProfile);
    }
    return res.json({ msg: "Your profile was successfully updated" });
};
