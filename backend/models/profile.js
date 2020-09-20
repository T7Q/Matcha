const db = require("./db");

const registerProfile = async (req) => {
    const { user_id, gender, sex_preference, bio, birth_date, country} = req.body;
    try {
        await db.query(
            "\
            UPDATE users\
            SET gender = $1, sex_preference = $2, bio = $3, birth_date = $4, country = $5\
            WHERE user_id = $6",
            [gender, sex_preference, bio, birth_date, country, user_id]
        );
        return {};
    } catch (e) {
        return { error: "Something went wrong adding Profile info" };
    }
};

const editProfile = async (user_id, column, value) => {
    try {
        const res = await db.query(
            `
            UPDATE users\
            SET ${column} = $1\
            WHERE user_id = $2`,
            [value, user_id]
        );
        return {};
    } catch (e) {
        return {
            error: e.detail || "Something went wrong adding Profile info",
        };
    }
};

const insertRow = async (table, user_id, other_user_id) => {
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

    try {
        const res = await db.query(
            `
            INSERT INTO ${table}\
            (${column1},  ${column2})\
            VALUES($1, $2)`,
            [user_id, other_user_id]
        );
        return {};
    } catch (e) {
        return { error: "Something went wrong adding info to the database" };
    }
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

    try {
        const res = await db.query(
            `
            DELETE FROM ${table}\
            WHERE ${column1} = $1
            AND ${column2} = $2`,
            [user_id, other_user_id]
        );
        return {};
    } catch (e) {
        return {
            error: "Something went wrong deleting info from the database",
        };
    }
};

const tagExists = async (tag) => {
    try {
        const res = await db.query(
            `
        SELECT count(tag_id)
            FROM tags
            WHERE tag_name=$1`,
            [tag]
        );
        return res.rows[0].count == 0 ? false : true;
    } catch (e) {
        return { error: "Something went wrong with checking tags" };
    }
};

const addPhotoToDb = async (user_id, path) => {
    try {
        const res = await db.query(
            `
            INSERT INTO images\
            (user_id, image_path)\
            VALUES($1, $2) RETURNING image_id`,
            [user_id, path]
        );
        return { msg: res.rows[0].image_id };
    } catch (e) {
        return { error: "Something went wrong adding info to the database" };
    }
};

const deleteRowOneCondition = async (table, column, value) => {
    try {
        const res = await db.query(
            `
            DELETE FROM ${table}\
            WHERE ${column} = $1`,
            [value]
        );
        return {};
    } catch (e) {
        return { error: "Something went wrong removing data from database" };
    }
};

const selectPath = async (image_id) => {
    try {
        const res = await db.query(
            `
            SELECT image_path\
            FROM images\
            WHERE image_id = $1`,
            [image_id]
        );
        return res.rows[0].image_path;
    } catch (e) {
        return { error: "Something went wrong getting data from database" };
    }
};

const getDataOneCondition = async (table, select, condition, value) => {
    try {
        const res = await db.query(
            `
            SELECT ${select}\
                FROM ${table}\
                WHERE ${condition} = $1`,
            [value]
        );
        return res.rows[0];
    } catch (e) {
        return { error: "Something went wrong getting data from database" };
    }
};

const insertTags = async (user_id, tag_id) => {
    try {
        const res = await db.query(
            `
            INSERT INTO user_tags\
            (user_id,  tag_id)\
            VALUES($1, $2)`,
            [user_id, tag_id]
        );
        return { msg: "Tags successfully saved" };
    } catch (e) {
        return { error: "Something went wrong adding tags to the database" };
    }
};

const getTagId = async (tag) => {
    try {
        const res = await db.query(
            `
        SELECT tag_id
            FROM tags
            WHERE tag_name=$1`,
            [tag]
        );
        return res.rows[0].tag_id;
    } catch (e) {
        return { error: "Something went wrong with checking tags" };
    }
};

const userHasTags = async (user_id) => {
    try {
        const res = await db.query(
            `
        SELECT count(tag_id)
            FROM user_tags
            WHERE user_id=$1`,
            [user_id]
        );
        return res.rows[0].count == 0 ? false : true;
    } catch (e) {
        return { error: "Something went wrong with checking tags" };
    }
};

module.exports = {
    registerProfile,
    editProfile,
    insertRow,
    deleteRow,
    tagExists,
    addPhotoToDb,
    deleteRowOneCondition,
    getDataOneCondition,
    selectPath,
    getTagId,
    insertTags,
    userHasTags
};
