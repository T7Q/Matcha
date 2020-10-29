const fs = require('fs');
const { validateTagsInDb, getDataOneCondition, deleteRowOneCondition } = require('./profile');

const validateGender = (gender) => {
    let errors = {};
    if (!gender) {
        errors['genderError'] = 'Gender is missing';
    } else if (!['man', 'woman'].includes(gender)) {
        errors['genderError'] = 'Gender should be man or woman';
    }
    return errors;
};

const validateSexPreferences = (sexPreference) => {
    let errors = {};
    if (!sexPreference) {
        errors['sexPreferenceError'] = 'Sex preference is missing';
    } else if (!['man', 'woman', 'both'].includes(sexPreference)) {
        errors['sexPreferenceError'] = 'Sex preference should be man, woman or both';
    }
    return errors;
};

const validateBio = (bio) => {
    let errors = {};
    if (!bio) {
        errors['bioError'] = 'Bio is missing';
    }
    if (bio.length > 200) {
        errors['bioError'] = 'Bio should be between 1 to 200 characters';
    }
    return errors;
};

const validateName = (name, type = 'name') => {
    let errors = {};
    const error = [type] + 'Error';
    if (!name) {
        errors[[error]] = 'required field';
    } else if (name.length > 25) {
        errors[[error]] = 'Should be between 1 to 25 characthers';
    } else {
        const re = /^[A-Za-z0-9]{0,}$/;
        if (!re.test(name)) {
            errors[[error]] = 'must include letters and numbers only';
        }
    }
    return errors;
};

const validateTags = async (tags) => {
    let errors = {};
    if (!tags || tags.length < 5) {
        errors['tagsError'] = 'You should pick at least 5 passions';
    } else if (tags.length > 10) {
        errors['tagsError'] = 'You should pick no more than 10 passions';
    } else if (!(await validateTagsInDb(tags))) {
        errors['tagsError'] = 'Invalid tags, some of them dont exist';
    }
    return errors;
};

const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const validateBirthdate = (dob) => {
    let errors = {};
    let age = getAge(dob);
    if (age < 18) {
        errors['birth_dateError'] = 'You must be at least 18 years old to user our services';
    } else if (age > 120) {
        errors['birth_dateError'] = 'You must be alive to user our services';
    }
    return errors;
};

const saveToFile = (baseImage) => {
    //path of folder to save the image
    const uploadPath = `${process.cwd()}/images/`;

    //Find extension of file
    const ext = baseImage.substring(baseImage.indexOf('/') + 1, baseImage.indexOf(';base64'));
    const fileType = baseImage.substring('data:'.length, baseImage.indexOf('/'));
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');

    const base64Data = baseImage.replace(regex, '');
    const rand = Math.ceil(Math.random() * 1000);
    //Random photo name with timeStamp so it will not overide previous images.
    const filename = `Photo_${Date.now()}_${rand}.${ext}`;

    //Check that if directory is present or not.
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }
    fs.writeFileSync(uploadPath + filename, base64Data, 'base64');
    return filename;
};

const deleteFromFile = (filename) => {
    const uploadPath = `${process.cwd()}/images/`;
    let files = fs.readdirSync(uploadPath);
    let imgToRemove = filename.split('/');
    for (let i = 0; i < files.length; i++) {
        if (files[i] === imgToRemove[1]) {
            fs.unlinkSync(uploadPath + imgToRemove[1]);
            break;
        }
    }
};

const buildQueryForSavingTags = (tags, user_id) => {
    let query = {
        values: [],
        placeholder: '',
    };

    for (const element of tags) {
        query.values.push(user_id);
        query.values.push(element);
    }
    query.placeholder = '';
    let i = 1;
    let length = tags.length;
    while (length > 0) {
        j = i + 1;
        query.placeholder +=
            '($' + i + ',' + ' (SELECT tag_id FROM tags WHERE tag_name = $' + j + '))';
        if (length != 1) query.placeholder += ',';
        i = i + 2;
        length--;
    }
    return query;
};

const removePhoto = async (imageId) => {
    // get old image path form db and remove it
    let filename = await getDataOneCondition('images', 'image_path', 'image_id', imageId);

    if (filename.length > 0) {
        deleteFromFile(filename[0].image_path);

        // delete old photo from db
        await deleteRowOneCondition('images', 'image_id', imageId);
    }
};

module.exports = {
    validateGender,
    validateSexPreferences,
    validateBio,
    validateBirthdate,
    validateName,
    validateTags,
    getAge,
    saveToFile,
    deleteFromFile,
    buildQueryForSavingTags,
    removePhoto,
};
