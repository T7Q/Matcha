const db = require('./db');

const registerProfile = async (req, res) => {
    const { user_id, gender, sex_preference, bio, birth_date} = req.body;
    try {
        await db.query('\
            UPDATE users\
            SET gender = $1, sex_preference = $2, bio = $3, birth_date = $4\
            WHERE user_id = $5',
            [gender, sex_preference, bio, birth_date, user_id]);
        return res.send({ 'msg': 'You profile was succesfully created' });
    } catch (e) {
        return res.send({ 'msg': 'Something went wrong adding Profile info' });
    }
}

const editProfile = async (user_id, column, value) => {
    try {
        const res = await db.query(`
            UPDATE users\
            SET ${column} = $1\
            WHERE user_id = $2`,
            [value, user_id]);
        return({ 'msg': 'Your profile was successfully updated' });
    } catch (e) {
        return({ 'msg': 'Something went wrong adding Profile info' });
    }
}

module.exports = {
    registerProfile,
    editProfile
}