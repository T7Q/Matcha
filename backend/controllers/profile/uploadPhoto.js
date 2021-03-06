const profileModel = require('../../models/profile');
const profileHelper = require('../../models/profileHelper');

module.exports = async (req, res) => {
    const { key, value } = req.body;
    const userId = req.user.userId;

    if (!key || !userId || !value || key !== 'photo' || value.length > 5) {
        return res.json({ error: 'Invalid parameters' });
    }

    let result = {};
    let i = 0;
    // for each image in the request
    for (const element of value) {
        // if old_photo id is present, remove it from database
        if (value[i]['old_image_id'] && value[i]['old_image_id'] !== '') {
            await profileHelper.removePhoto(value[i]['old_image_id']);
        }

        result[i] = {};
        if (value[i]['data'] !== '') {
            // save new photo to the images folder on the server
            let uploadPath = profileHelper.saveToFile(element.data);
            let getPhotoId = await profileModel.addPhotoToDb(userId, `/${uploadPath}`);

            // for each image return upload path, image id, type and message
            result[i] = {
                path: uploadPath,
                image_id: getPhotoId,
                msg: 'Your photo was succesfully saved',
                type: 'photo',
            };
            // for profile image, save image path to users table
            if (element.type === 'profile') {
                await profileModel.editProfile(userId, 'profile_pic_path', `/${uploadPath}`);
                result[i]['msg'] = 'Your profile photo was succesfully saved';
                result[i]['type'] = 'profile';
            }
        } else if (element.type === 'profile') {
            await profileModel.editProfile(userId, 'profile_pic_path', '');
            result[i]['msg'] = 'Your profile photo was succesfully saved';
            result[i]['type'] = 'profile';
        }

        i++;
    }
    const photos = await profileModel.userHasPhotos(userId);
    return res.json({ userHasPhotos: photos });
};
