const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

const upload = async (req, res) => {
    const { user_id, key, value } = req.body;

    // validate input
    if (!key || !user_id || !value || key !== "photo" || value.length > 5) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    let result = {};
    let i = 0;
    // for each image request
    for (const element of value) {
        // if old_photo id is present, remove it from database
        if (value[i]["old_image_id"]) {
            // get old imag path form db and remove it 
            try {
                let filename = await profileModel.getDataOneCondition("images", "image_path", "image_id", value[i]["old_image_id"]);
                profileHelper.deleteFromFile(filename.image_path);
            } catch (e) {
                return res.status(400).json({ error: "Something went wrong getting data from database" });
            }

            // delete old photo from db
            try {
                await profileModel.deleteRowOneCondition("images", "image_id", value[i]["old_image_id"]);
            } catch (e) {
                return res.status(400).json({ error: "Something went wrong deleting data from database" });
            }
        }

        result[i] = {};
        // save new photo to the images folder on the server
        let uploadPath = profileHelper.saveToFile(element.data);
        let getPhotoId;
        try {
            getPhotoId = await profileModel.addPhotoToDb(user_id, uploadPath);
        } catch (e) {
            return res.status(400).json({ error: "Error saving photo" });
        }

        // for each image return upload path, image id, type and message
        result[i] = {
            path: uploadPath,
            image_id: getPhotoId,
            msg: "Your photo was succesfully saved",
            type: "photo",
        };

        // for profile image, save image path to users table 
        if (element.type === "profile") {
            try{
                await profileModel.editProfile(user_id, "profile_pic_path", uploadPath);
            } catch (e) {
                return res.status(400).json({ error: "Error saving profile photo" });
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
    // validate request parameters
    if (!key || !user_id || !value || key !== "photo" || value.length > 5) {
        return res.status(400).json({ error: "Invalid parameters" });
    }
    let result = {};
    let i = 0;
    for (const element of value) {
        result[i] = {};
        // find filename by image id and remove it from images folder
        try {
            let filename = await profileModel.getDataOneCondition("images", "image_path", "image_id", value[i]["image_id"]);
            profileHelper.deleteFromFile(filename.image_path);
        } catch (e) {
            return res.status(400).json({ error: "Something went wrong getting data from database" });
        }

        // delete image from the database
        try {
            await profileModel.deleteRowOneCondition("images", "image_id", value[i]["image_id"]);
        } catch (e) {
            return res.status(400).json({ error: "Something went wrong deleting data from database" });
        }

        // prepare return message
        result[i] = {
            msg: "Photo was succesfully deleted",
            type: "photo",
        };

        // for profile photo set profile path in users table to null
        if (element.type === "profile") {
            let editProfilePhoto = {};
            try {
                editProfilePhoto = await profileModel.editProfile(user_id, "profile_pic_path", "");
                result[i]["msg"] = "Profile photo was succesfully deleted";
                result[i]["type"] = "profile";
            } catch (e) {
                return res.status(400).json({ error: "Error remoing profile photo" });
            }
        }
        i++;
    }
    return res.json(result);
};

module.exports = {
    upload,
    deletePhoto
};
