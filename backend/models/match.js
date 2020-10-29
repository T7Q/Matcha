const db = require('./db');

/* Supporting queries
    Values inserted are calculated on server or by database triggers,
    hence deemed secure and are inserted directly.
    Values include: weight of match formular parameters, user zodiac sign
*/
const numberOfCommonTags = `(select count(*)::float as commonTag from
        (select tag_id from user_tags where user_tags.user_id = users.user_id
            intersect
            select tag_id from user_tags where user_tags.user_id = $1) as temp)`;

const totalUserTags = `(select count(id)::float as total_tags from user_tags where user_tags.user_id = $1)`;

const getCompatibilityValue = (signUser1, signUser2, table) => {
    let defaultUser = table === 'western' ? 'users.western_horo' : 'users.chinese_horo';
    signUser1 = signUser1 === 'default' ? defaultUser : "'" + signUser1 + "'";
    table =
        table === 'western'
            ? 'public.western_horo_compatibility'
            : 'public.chinese_horo_compatibility';

    let query =
        '(SELECT compatibility_value::float * 10 as Cn FROM ' +
        table +
        ' WHERE (sign_1 = ' +
        signUser1 +
        ' and sign_2 =' +
        "'" +
        signUser2 +
        "'" +
        ') or (sign_1 = ' +
        "'" +
        signUser2 +
        "'" +
        ' and sign_2 =' +
        signUser1 +
        '))';
    return query;
};

const getConnectionValue = (userId1, userId2) => {
    userId1 = userId1 === '' ? 'users.user_id' : userId1;
    let query =
        '(CASE WHEN ((SELECT count(likes.like_id) AS from_likes FROM likes WHERE likes.from_user_id = ' +
        userId1 +
        ' AND likes.to_user_id = ' +
        userId2 +
        ') = 1 AND (SELECT count(likes.like_id) AS to_likes FROM likes WHERE likes.from_user_id = ' +
        userId2 +
        ' AND likes.to_user_id = ' +
        userId1 +
        ') = 1) THEN 2 WHEN ((SELECT count(likes.like_id) AS to_likes FROM likes WHERE likes.from_user_id = ' +
        userId1 +
        ' AND likes.to_user_id = ' +
        userId2 +
        ') = 1) THEN 3 WHEN ((SELECT count(likes.like_id) AS to_likes FROM likes WHERE likes.from_user_id = ' +
        userId2 +
        ' AND likes.to_user_id = ' +
        userId1 +
        ') = 1) THEN 1 ELSE 0 END) as connected';
    return query;
};

// Query to get matching recommendations from database
const getMatch = async (user, settings) => {
    const tagsCompValue = user.userHasTags ? `${numberOfCommonTags} / ${totalUserTags} * 100` : 0;
    const cnHoroscopeCompValue = getCompatibilityValue('default', user.chinese_horo, 'chinese');
    const westHoroscopeCompValue = getCompatibilityValue('default', user.western_horo, 'western');
    const connected = getConnectionValue('', user.user_id);
    const res = await db.query(
        `SELECT users.user_id, users.first_name,
            (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
            users.fame_rating as fame, users.profile_pic_path,
            (ST_Distance(users.geolocation, $2)::integer / 1000) as distance,
            ${numberOfCommonTags}, ${connected},
            (${tagsCompValue} * ${settings.weight.tag} +
                ${cnHoroscopeCompValue} * ${settings.weight.cn} +
                ${westHoroscopeCompValue} * ${settings.weight.west}) as match
            ${settings.dateColumn}
        FROM public.users ${settings.join} WHERE users.user_id <> $1 and users.status = 2 ${settings.filter}
        ORDER BY ${settings.order} ${settings.limit}`,
        [...settings.values]
    );
    return res.rows;
};

const getCompatibility = async (authUser, otherUser, weight) => {
    const commonTags = `(select count(*)::float as commonTag from
        (select tag_id from user_tags where user_tags.user_id = $2 intersect
            select tag_id from user_tags where user_tags.user_id = $1) as temp)`;

    const tagsCompValue = authUser.hasTags ? `${commonTags} / ${totalUserTags} * 100` : 0;

    const cnHoroscopeCompValue = getCompatibilityValue(
        authUser.chinese_horo,
        otherUser.chinese_horo,
        'chinese'
    );
    const westHoroscopeCompValue = getCompatibilityValue(
        authUser.western_horo,
        otherUser.western_horo,
        'western'
    );

    const res = await db.query(
        `SELECT users.user_id,
            (${tagsCompValue} * ${weight.tag} +
                ${cnHoroscopeCompValue} * ${weight.cn} +
                ${westHoroscopeCompValue} * ${weight.west}
            ) as match
        FROM public.users WHERE user_id = $2`,
        [authUser.user_id, otherUser.user_id]
    );
    return res.rows[0].match;
};

module.exports = {
    getMatch,
    getCompatibility,
};
