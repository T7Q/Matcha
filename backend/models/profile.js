const db = require('./db');

const registerProfile = async (req) => {
    const { user_id, gender, sex_preference, bio, birth_date} = req.body;
    try {
        await db.query('\
            UPDATE users\
            SET gender = $1, sex_preference = $2, bio = $3, birth_date = $4\
            WHERE user_id = $5',
            [gender, sex_preference, bio, birth_date, user_id]);
        return {};
    } catch (e) {
        return ({ 'error': 'Something went wrong adding Profile info' });
    }
}

const editProfile = async (user_id, column, value) => {
    try {
        const res = await db.query(`
            UPDATE users\
            SET ${column} = $1\
            WHERE user_id = $2`,
            [value, user_id]);
        return {};
    } catch (e) {
        return ({ 'error': e.detail || 'Something went wrong adding Profile info' });
    }
}

const insertRow = async (table, user_id, other_user_id) => {
    let column1;
    let column2;

    if (table == 'likes' || table == 'views') {
        column1 = "from_user_id";
        column2 = "to_user_id";
    } else if (table == 'block_users') {
        column1 = "user_id";
        column2 = "user_id_blocked";
    } else if (table == 'report_users') {
        column1 = "user_id";
        column2 = "user_id_reported";
    }

    try {
        const res = await db.query(`
            INSERT INTO ${table}\
            (${column1},  ${column2})\
            VALUES($1, $2)`,
            [user_id, other_user_id]);
        return {};
    } catch (e) {
        return({ 'error': 'Something went wrong adding info to the database' });
    }
}

const deleteRow = async (table, user_id, other_user_id) => {
    let column1;
    let column2;

    if (table == 'likes' || table == 'views') {
        column1 = "from_user_id";
        column2 = "to_user_id";
    } else if (table == 'block_users') {
        column1 = "user_id";
        column2 = "user_id_blocked";
    } else if (table == 'report_users') {
        column1 = "user_id";
        column2 = "user_id_reported";
    }

    try {
        const res = await db.query(`
            DELETE FROM ${table}\
            WHERE ${column1} = $1
            AND ${column2} = $2`,
            [user_id, other_user_id]);
        return {};
    } catch (e) {
        return({ 'error': 'Something went wrong deleting info from the database' });
    }
}

const deleteAccount = async (user_id) => {
    try {
        const res = await db.query(`
            DELETE FROM users\
            WHERE user_id = $1`,
            [user_id]);
        return {};
    } catch (e) {
        return({ 'error': 'Something went wrong with deleting your account' });
    }
}

module.exports = {
    registerProfile,
    editProfile,
    insertRow,
    deleteRow,
    deleteAccount
}