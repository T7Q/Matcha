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
    let column1;
    let column2;

    if (table == "likes" || table == "views") {
        column1 = "from_user_id";
        column2 = "to_user_id";
    } else if (table == "block_users") {
        column1 = "user_id";
        column2 = "user_id_blocked";
    } else if (table == "report_users") {
        column1 = "user_id";
        column2 = "user_id_reported";
    }

    const res = await db.query(
        `
        DELETE FROM ${table}\
        WHERE ${column1} = $1
        AND ${column2} = $2`,
        [user_id, other_user_id]
    );
};


// const tagExists = async (tag) => {
//     try {
//         const res = await db.query(
//             `
//         SELECT count(tag_id)
//             FROM tags
//             WHERE tag_name=$1`,
//             [tag]
//         );
//         return res.rows[0].count == 0 ? false : true;
//     } catch (e) {
//         return { error: "Something went wrong with checking tags" };
//     }
// };

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

const validateTags = async (tags) => {
    let placeholder = placeholderValues(tags);
    let res = await db.query(
        `
        SELECT count(tag_id)\
        FROM tags\
        WHERE tag_name IN (${placeholder})`,
        [...tags]
    );
    return res.rows[0].count;
}


// const selectPath = async (image_id) => {
//     try {
//         const res = await db.query(
//             `
//             SELECT image_path\
//             FROM images\
//             WHERE image_id = $1`,
//             [image_id]
//         );
//         return res.rows[0].image_path;
//     } catch (e) {
//         return { error: "Something went wrong getting data from database" };
//     }
// };

const getDataOneCondition = async (table, select, condition, value) => {
    const res = await db.query(`
        SELECT ${select}\
            FROM ${table}\
            WHERE ${condition} = $1`,
        [value]
    );
    return res.rows[0];
};

// const insertTags = async (user_id, tag_id) => {
//     try {
//         const res = await db.query(
//             `
//             INSERT INTO user_tags\
//             (user_id,  tag_id)\
//             VALUES($1, $2)`,
//             [user_id, tag_id]
//         );
//         return { msg: "Tags successfully saved" };
//     } catch (e) {
//         return { error: "Something went wrong adding tags to the database" };
//     }
// };

const saveTags = async (query) => {
    const { values, placeholder } = query;

    console.log(values);
    console.log(placeholder);

    const res = await db.query(
        `
        INSERT INTO public.user_tags(user_id, tag_id)
        VALUES ${placeholder}`,
        [...values]
    );
        // const res = await db.query(
        //     `
        //     INSERT INTO public.user_tags(user_id, tag_id)
        //     VALUES ($1, (SELECT tag_id FROM tags WHERE tag_name = $2)), ($3, (SELECT tag_id FROM tags WHERE tag_name = $4))`,
        //     [...values]
        // );

};


// const getTagId = async (tag) => {
//     try {
//         const res = await db.query(
//             `
//         SELECT tag_id
//             FROM tags
//             WHERE tag_name=$1`,
//             [tag]
//         );
//         return res.rows[0].tag_id;
//     } catch (e) {
//         return { error: "Something went wrong with checking tags" };
//     }
// };

const userHasTags = async (user_id) => {
    const res = await db.query(`
        SELECT count(tag_id)
            FROM user_tags
            WHERE user_id=$1`,
            [user_id]
    );
    return res.rows[0].count == 0 ? false : true;
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
    validateTags
};
