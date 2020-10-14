const db = require("./db");

// console.log("\u001b[32m" +
const registerProfile = async (user_id, req) => {
    const { gender, sex_preference, bio, birth_date, country } = req.body;
    await db.query(
        `UPDATE users\
        SET gender = $1, sex_preference = $2, bio = $3, birth_date = $4, country = $5\
        WHERE user_id = $6`,
        [gender, sex_preference, bio, birth_date, country, user_id]
    );
};

const editProfile = async (user_id, column, value) => {
    await db.query(
        `UPDATE users\
        SET ${column} = $1\
        WHERE user_id = $2`,
        [value, user_id]
    );
};

const insertRow = async (table, user_id, other_user_id) => {
    await db.query(
        `INSERT INTO ${table}\
        (from_user_id,  to_user_id)\
        VALUES($1, $2)`,
        [user_id, other_user_id]
    );
};

const deleteRow = async (table, user_id, other_user_id) => {
    const res = await db.query(
        `DELETE FROM ${table}\
        WHERE from_user_id = $1
        AND to_user_id = $2`,
        [user_id, other_user_id]
    );
};

const addPhotoToDb = async (user_id, path) => {
    const res = await db.query(
        `INSERT INTO images\
        (user_id, image_path)\
        VALUES($1, $2) RETURNING image_id`,
        [user_id, path]
    );
    return res.rows[0].image_id;
};

const deleteRowOneCondition = async (table, column, value) => {
    await db.query(
        `DELETE FROM ${table}\
        WHERE ${column} = $1`,
        [value]
    );
};

const placeholderValues = (array) => {
    let placeholder = "";
    for (i = 1; i < array.length + 1; i++) {
        placeholder += "$" + i;
        if (i != array.length) placeholder += ",";
    }
    return placeholder;
};

const validateTagsInDb = async (tags) => {
    let placeholder = placeholderValues(tags);
    let res = await db.query(
        `SELECT count(tag_id)\
        FROM tags\
        WHERE tag_name IN (${placeholder})`,
        [...tags]
    );
    return tags.length == res.rows[0].count ? true : false;
};

const getDataOneCondition = async (table, select, condition, value) => {
    const res = await db.query(
        `SELECT ${select}\
        FROM ${table}\
        WHERE ${condition} = $1`,
        [value]
    );
    return res.rows;
};

const saveTags = async (query) => {
    const { values, placeholder } = query;
    await db.query(
        `INSERT INTO public.user_tags(user_id, tag_id)
        VALUES ${placeholder}`,
        [...values]
    );
};

const userHasTags = async (user_id) => {
    const res = await db.query(
        `SELECT count(tag_id)
        FROM user_tags
        WHERE user_id=$1`,
        [user_id]
    );
    return res.rows[0].count == 0 ? false : true;
};

const getUserTags = async (user_id) => {
    const res = await db.query(
        `SELECT tags.tag_name
        FROM public.user_tags
        LEFT JOIN tags ON tags.tag_id = user_tags.tag_id
        WHERE user_tags.user_id = $1`,
        [user_id]
    );
    return res;
};

const getUserPhotos = async (user_id) => {
    const res = await db.query(
        `SELECT image_path
        FROM images
        WHERE user_id = $1`,
        [user_id]
    );
    return res;
};

const getTags = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT tags.tag_name AS tag
            FROM tags`);
        return res.json(result.rows);
    } catch (e) {
        console.log(e);
    }
};

const getNotifications = async (req, res) => {
    try {
        const result = await db.query(
            `
            SELECT email_notification AS email, real_time_notification AS push
            FROM users WHERE user_id = $1`,
            [req.user.userId]
        );
        return res.json(result.rows[0]);
    } catch (e) {
        console.log(e);
    }
};

const userHasPhotos = async (user_id) => {
    const res = await db.query(
        `SELECT count(image_id)
        FROM images WHERE user_id=$1`,
        [user_id]
    );
    return res.rows[0].count;
};

const otherUserLikesYou = async (fromUserId, toUserId) => {
    const res = await db.query(
        `SELECT count(like_id)
        FROM likes
        WHERE from_user_id = $1 and to_user_id = $2`,
        [fromUserId, toUserId]
    );
    return res.rows[0].count;
};

const usersConnected = async (fromUserId, toUserId) => {
    const res = await db.query(
        `SELECT
        (CASE
            WHEN ((SELECT count(likes.like_id) AS from_likes FROM likes
                    WHERE likes.from_user_id = $1
                    AND likes.to_user_id = $2) = 1
            AND (SELECT count(likes.like_id) AS to_likes FROM likes
                    WHERE likes.from_user_id = $2
                    AND likes.to_user_id = $1 ) = 1)
            THEN 2
            WHEN ((SELECT count(likes.like_id) AS to_likes FROM likes
                    WHERE likes.from_user_id = $1
                    AND likes.to_user_id = $2) = 1)
            THEN 1
            ELSE 0
    END) as connected
    FROM users
    where user_id = $1`,
        [fromUserId, toUserId]
    );
    return res.rows[0].connected;
};

const getUserAge = async (userId) => {
    const res = await db.query(
        `SELECT (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age
        FROM users where user_id =$1`,
        [userId]
    );
    return res.rows[0].age;
};
const getDistance = async (authUserId, otherUserId) => {
    const res = await db.query(
        `SELECT (ST_Distance(users.geolocation,
            (SELECT geolocation FROM users WHERE user_id = $2))::integer / 1000)
            as distance
        FROM users
        WHERE user_id = $1`,
        [authUserId, otherUserId]
    );
    return res.rows[0].distance;
};

const getBlockedValue = async (authUserId, otherUserId) => {
    const res = await db.query(
        `SELECT count(blocked.to_user_id) as blocked
            FROM blocked
            WHERE from_user_id = $1 AND to_user_id = $2`,
        [authUserId, otherUserId]
    );
    return res.rows[0].blocked;
};

const getBlockedUsers = async (authUserId) => {
    const res = await db.query(
        `SELECT blocked.to_user_id as user_id, users.profile_pic_path, users.first_name,(EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
            blocked.created_at FROM blocked
        LEFT JOIN users ON users.user_id = blocked.to_user_id
        WHERE blocked.from_user_id = $1
        ORDER BY blocked.created_at desc`,
        [authUserId]
    );
    return res.rows;
};

// ********* 
const faker = require("faker");

// number of generated fake accounts
const desiredFakeUsers = 2;

// statement to insert 21 params to table 'users'
const prepareStmt = (desiredFakeUsers) => {
    let str = "";
    let params = 22;
    let j = 1;
    for (let k = 0; k < desiredFakeUsers; k++) {
        str = str.concat("(");
        for (let i = 1; i < params; i++) {
            str = i === params - 1 ? str.concat(`$${j}`) : str.concat(`$${j},`);
            j++;
        }
        str = k === desiredFakeUsers - 1 ? str.concat(")") : str.concat("),");
    }
    return `INSERT INTO users (username, first_name, last_name, email, status, 
        password, birth_date, gender, sex_preference, email_notification,
        online, latitude, longitude, country, real_time_notification,
        fame_rating, bio, created_at, last_seen, profile_pic_path, fame_14_days)
        VALUES ${str}`;
};

// generate 21 column values for each user with Faker.js
const createFakeUser = () => {
    return [
        faker.internet.userName(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        "2",
        faker.internet.password(),
        faker.date.between("1960-01-01", "2002-01-01"),
        faker.random.arrayElement(["man", "woman"]),
        faker.random.arrayElement(["man", "woman", "both"]),
        false,
        faker.random.number(1),
        faker.address.latitude(),
        faker.address.longitude(),
        faker.address.country(),
        false,
        faker.random.float({ min: 0, max: 5, precision: 0.1 }),
        faker.lorem.sentences(),
        faker.date.between("2018-01-01", Date()),
        faker.date.between("2018-01-01", Date()),
        faker.image.avatar(),
        faker.random.number(30),
    ];
};

// create an array with info of all users
const generateFakeUsers = (desiredFakeUsers) => {
    let fakeUsers = [];
    for (let i = 0; i < desiredFakeUsers; i++) {
        let temp = createFakeUser();
        fakeUsers = fakeUsers.concat(temp);
    }
    return fakeUsers;
};

// insert fake users to the database
const insertFakeUsers = async () => {
    const fakeUsers = generateFakeUsers(desiredFakeUsers);
    const stmt = prepareStmt(desiredFakeUsers);
    console.log('\x1b[32m' + 'Generated 500+ fake users data' + '\x1b[0m');
    try {
        await db.query(stmt, [...fakeUsers]);
        console.log('\x1b[32m' + 'Inserted 500+ fake accounts to the database' + '\x1b[0m');
    } catch (err){
        console.log("ERR", err);
        
    }
};



// const insertFakeUsers = async () => {
//     var faker = require("faker");
//     console.log("got to insertfake");
//     const createFakeUser = () => {
//     return [
//         faker.internet.userName(),
//         faker.name.firstName(),
//         faker.name.lastName(),
//         faker.internet.email(),
//         "2",
//         faker.internet.password(),
//         faker.date.between("1960-01-01", "2002-01-01"),
//         faker.random.arrayElement(["man", "woman"]),
//         faker.random.arrayElement(["man", "woman", "both"]),
//         false,
//         faker.random.number(1),
//         faker.address.latitude(),
//         faker.address.longitude(),
//         faker.address.country(),
//         false,
//         faker.random.float({ min: 0, max: 5, precision: 0.1 }),
//         faker.lorem.sentences(),
//         faker.date.between("2018-01-01", Date()),
//         faker.date.between("2018-01-01", Date()),
//         faker.image.avatar(),
//         faker.random.number(30)
//     ]}

//     let fakeUsers = [];
//     const desiredFakeUsers = 2;
//     for (let i = 0; i < desiredFakeUsers; i++) {
        
//         let temp = createFakeUser();
//         fakeUsers = fakeUsers.concat(temp);
//     }
//     // console.log("fakeUSERS", fakeUsers);

//     let str = "";
//     let params = 22;
//     let j = 1;
//     for (let k = 0; k < desiredFakeUsers; k++) {
//         str = str.concat("(");
//         for (let i = 1; i < params; i++) {
//             str = i === params - 1 ? str.concat(`$${j}`) : str.concat(`$${j},`);
//             j++
//         }
//         str = k === desiredFakeUsers - 1 ? str.concat(")") : str.concat("),");
//     }

   
//     await db.query(
//         `INSERT INTO users (username, first_name, last_name, email, status, 
//             password, birth_date, gender, sex_preference, email_notification,
//             online, latitude, longitude, country, real_time_notification,
//             fame_rating, bio, created_at, last_seen, profile_pic_path, fame_14_days)
//             VALUES ${str}`,
//         [...fakeUsers]
//     );
//     console.log(desiredFakeUsers, "more users");
// };

module.exports = {
    getTags,
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
    getUserTags,
    userHasPhotos,
    otherUserLikesYou,
    usersConnected,
    getUserAge,
    getDistance,
    getNotifications,
    getUserPhotos,
    getBlockedUsers,
    getBlockedValue,
    insertFakeUsers,
};
