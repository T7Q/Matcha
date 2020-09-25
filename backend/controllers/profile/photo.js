const profileModel = require("../../models/profile");
const profileHelper = require("../../models/profileHelper");

const upload = async (req, res) => {
    const { key, value } = req.body;
    const userId = req.user.userId;
    // validate input
    if (!key || !userId || !value || key !== "photo" || value.length > 5) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    let result = {};
    let i = 0;
    // for each image in the request
    for (const element of value) {
        try {
            // if old_photo id is present, remove it from database
            if (value[i]["old_image_id"]) {
                // get old image path form db and remove it 
                let filename = await profileModel.getDataOneCondition("images", "image_path", "image_id", value[i]["old_image_id"]);
                profileHelper.deleteFromFile(filename[0].image_path);

                // delete old photo from db
                await profileModel.deleteRowOneCondition("images", "image_id", value[i]["old_image_id"]);
            }

            result[i] = {};
            // save new photo to the images folder on the server
            let uploadPath = profileHelper.saveToFile(element.data);
            let getPhotoId;
            getPhotoId = await profileModel.addPhotoToDb(userId, uploadPath);
 
            // for each image return upload path, image id, type and message
            result[i] = {
                path: uploadPath,
                image_id: getPhotoId,
                msg: "Your photo was succesfully saved",
                type: "photo",
            };

            // for profile image, save image path to users table 
            if (element.type === "profile") {
                await profileModel.editProfile(userId, "profile_pic_path", uploadPath);
                result[i]["msg"] = "Your profile photo was succesfully saved";
                result[i]["type"] = "profile";
            }

            i++;
        } catch (e) {
            return res.json({ error: "Error saving photo" });
        }
    }
    return res.json({ msg: result});
};

const deletePhoto = async (req, res) => {
    const { key, value } = req.body;
    const userId = req.user.userId;
    // validate request parameters
    if (!key || !userId || !value || key !== "photo" || value.length > 5) {
        return res.json({ error: "Invalid parameters" });
    }
    let result = {};
    let i = 0;
    for (const element of value) {
        result[i] = {};
        try {
            // find filename by image id and remove it from images folder
            let filename = await profileModel.getDataOneCondition("images", "image_path", "image_id", value[i]["image_id"]);
            profileHelper.deleteFromFile(filename[0].image_path);

            // delete image from the database
            await profileModel.deleteRowOneCondition("images", "image_id", value[i]["image_id"]);

            // prepare return message
            result[i] = {
                msg: "Photo was succesfully deleted",
                type: "photo",
            };

            // for profile photo set profile path in users table to null
            if (element.type === "profile") {
                let editProfilePhoto = {};
                    editProfilePhoto = await profileModel.editProfile(userId, "profile_pic_path", "");
                    result[i]["msg"] = "Profile photo was succesfully deleted";
                    result[i]["type"] = "profile";
            }
            i++;

        } catch (e) {
            return res.json({ error: "Error deleting photo" });
        }
    }
    return res.json(result);
};

module.exports = {
    upload,
    deletePhoto
};
