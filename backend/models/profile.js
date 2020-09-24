const db = require("./db");

// console.log("\u001b[32m" + 
const registerProfile = async (req) => {
    const { user_id, gender, sex_preference, bio, birth_date, country} = req.body;
    await db.query(`\
        UPDATE users\
        SET gender = $1, sex_preference = $2, bio = $3, birth_date = $4, country = $5\
        WHERE user_id = $6`,
        [gender, sex_preference, bio, birth_date, country, user_id]
    );
};

const editProfile = async (user_id, column, value) => {
    await db.query(`
        UPDATE users\
        SET ${column} = $1\
        WHERE user_id = $2`,
        [value, user_id]
    );
};

const insertRow = async (table, user_id, other_user_id) => {
    await db.query(
        `
        INSERT INTO ${table}\
        (from_user_id,  to_user_id)\
        VALUES($1, $2)`,
        [user_id, other_user_id]
    );
};

const deleteRow = async (table, user_id, other_user_id) => {
    const res = await db.query(
        `
        DELETE FROM ${table}\
        WHERE from_user_id = $1
        AND to_user_id = $2`,
        [user_id, other_user_id]
    );
};

const addPhotoToDb = async (user_id, path) => {
    const res = await db.query(
        `
        INSERT INTO images\
        (user_id, image_path)\
        VALUES($1, $2) RETURNING image_id`,
        [user_id, path]
    );
    return res.rows[0].image_id;
};

const deleteRowOneCondition = async (table, column, value) => {
    await db.query(`
        DELETE FROM ${table}\
        WHERE ${column} = $1`,
        [value]
    );
};

const placeholderValues = (array) => {
    let placeholder = "";
    for (i = 1; i < array.length + 1; i++) {
        placeholder += "$" + i;
        if (i != array.length)
            placeholder += ",";
    };
    return placeholder;
}

const validateTagsInDb = async (tags) => {
    let placeholder = placeholderValues(tags);
    let res = await db.query(
        `
        SELECT count(tag_id)\
        FROM tags\
        WHERE tag_name IN (${placeholder})`,
        [...tags]
    );
    return (tags.length == res.rows[0].count ? true : false);
}

const getDataOneCondition = async (table, select, condition, value) => {
    const res = await db.query(`
        SELECT ${select}\
            FROM ${table}\
            WHERE ${condition} = $1`,
        [value]
    );
    return res.rows;
};

const saveTags = async (query) => {
    const { values, placeholder } = query;
    await db.query(
        `
        INSERT INTO public.user_tags(user_id, tag_id)
        VALUES ${placeholder}`,
        [...values]
    );
};

const userHasTags = async (user_id) => {
    const res = await db.query(`
        SELECT count(tag_id)
            FROM user_tags
            WHERE user_id=$1`,
            [user_id]
    );
    return res.rows[0].count == 0 ? false : true;
};

const getUserTags = async (user_id) => {
    const res = await db.query(`
        SELECT tags.tag_name
            FROM public.user_tags
            LEFT JOIN tags ON tags.tag_id = user_tags.tag_id
            WHERE user_tags.user_id = $1`,
            [user_id]
    );
    return res;
};

module.exports = {
    addPhotoToDb,
    deleteRow,
    deleteRowOneCondition,
    editProfile,
    getDataOneCondition,
    insertRow,
    registerProfile,
    saveTags,
    userHasTags,
    validateTagsInDb,
    getUserTags
};