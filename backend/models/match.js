const db = require("./db");

/* Supporting queries
    Values inserted are calculated on server or by database triggers,
    hence deemed secure and are inserted directly.
    Values include: weight of match formular parameters, user zodiac sign
*/
const numberOfCommonTags = `
    (
        select count(*)::float as common_tag from
        (
            select tag_id from user_tags
            where user_tags.user_id = users.user_id
            intersect 
            select tag_id from user_tags
            where user_tags.user_id = $1
        ) as temp
    )
`;

const totalUserTags = `
    (
        select count(id)::float as total_tags from user_tags
        where user_tags.user_id = $1
    )
`;

const getCompatibilityValue = (signUser1, signUser2, table) => {
    
    let defaultUser = (table === "western" ? "users.western_horo" : "users.chinese_horo");
    signUser1 = (signUser1 === "default" ? defaultUser : "'" + signUser1 + "'");
    table = (table === "western" ? "public.western_horo_compatibility" : "public.chinese_horo_compatibility");

    let query =
    "(\
        SELECT compatibility_value::float * 10 as Cn\
        FROM " + table +
        " WHERE (sign_1 = " + signUser1 + " and sign_2 =" + "'" + signUser2 + "'" + ") or\
                (sign_1 = " + "'" + signUser2 + "'" + " and sign_2 ="  + signUser1 + ")\
    )";
    return query;
}

// Query to get matching recommendations from database
const getMatch = async (user, condition) => {        
    const tagsCompValue = (user.userHasTags ? `${numberOfCommonTags} / ${totalUserTags} * 100` : 0);
    const cnHoroscopeCompValue = getCompatibilityValue("default", user.chinese_horo, "chinese");
    const westHoroscopeCompValue = getCompatibilityValue("default", user.western_horo, "western");

    const res = await db.query(
        `
        SELECT
            users.user_id,
            users.first_name,
            (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
            users.fame_rating as fame,
            users.profile_pic_path,
            ST_Distance(users.geolocation, $2) as distance,
            ${numberOfCommonTags},
            geolocation, users.sex_preference, users.chinese_horo, users.western_horo, users.country,
            (
                ${tagsCompValue} * ${condition.weight.tag} +
                ${cnHoroscopeCompValue} * ${condition.weight.cn} +
                ${westHoroscopeCompValue} * ${condition.weight.west}
            ) as match
        FROM public.users
        WHERE
            users.user_id <> $1
            ${condition.filter}
        ORDER BY
            ${condition.order}
        `,
        [user.user_id, user.geolocation]
    );
    return res.rows;
};

module.exports = {
    getMatch
};