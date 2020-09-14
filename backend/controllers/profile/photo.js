const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

const upload = async (req, res) => {
    const { user_id, key, value } = req.body;

    if (!key || !user_id || !value || key !== "photo" || value.length > 5) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    let result = {};
    let i = 0;
    for (const element of value) {
        let uploadPath = profileHelper.saveToFile(element.data);
        result[i] = {};

        let getPhotoId = {};
        getPhotoId = await profileModel.addPhotoToDb(user_id, uploadPath);

        if (getPhotoId.error) {
            result[i]["error"] = "Error saving photo to database";
        }

        result[i] = {
            path: uploadPath,
            image_id: getPhotoId.msg,
            msg: "Your photo was succesfully saved",
            type: "photo",
        };

        if (element.type === "profile") {
            let editProfilePhoto = {};
            editProfilePhoto = await profileModel.editProfile(
                user_id,
                "profile_pic_path",
                uploadPath
            );
            if (editProfilePhoto.error) {
                result[i]["error"] = "Error saving profile photo to database";
            }
            result[i]["msg"] = "Your profile photo was succesfully saved";
            result[i]["type"] = "profile";
        }
        i++;
    }
    return res.json(result);
};


const deletePhoto = async (req, res) => {
    const { user_id, key, value } = req.body;
    if (!key || !user_id || !value || key !== "photo" || value.length > 5) {
        return res.status(400).json({ error: "Invalid parameters" });
    }
    let result = {};
    let i = 0;
    for (const element of value) {
        result[i] = {};
        deletePhotoFromDb = await profileModel.deleteRowOneCondition(
            "images",
            "image_id",
            value[i]["image_id"]
        );
        if (deletePhotoFromDb.error) {
            result[i]["error"] = "Error saving photo to database";
		}
		
		// get filename from db by image_id
		// deleteFrom file

        result[i] = {
            msg: "Photo was succesfully deleted",
            type: "photo",
        };

        if (element.type === "profile") {
            let editProfilePhoto = {};
            editProfilePhoto = await profileModel.editProfile(
                user_id,
                "profile_pic_path",
                ""
            );
            if (editProfilePhoto.error) {
                result[i]["error"] = "Error saving profile photo to database";
            }
            result[i]["msg"] = "Profile photo was succesfully deleted";
            result[i]["type"] = "profile";
        }
        i++;
    }
    return res.json(result);
};

module.exports = {
    upload,
    deletePhoto,
};
