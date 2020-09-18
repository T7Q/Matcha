const db = require("./db");

/* Supporting queries
    Values inserted are calculated on server or by database triggers,
    hence deemed secure and are inserted directly.
    Values include: score.
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
    
const getMatch = async (user, condition) => {        
    console.log(" \u001b[32m. MATCH user id  " + user.user_id);
    console.log(condition);
    let western_horo = "'" + user.western_horo + "'";
    let chinese_horo = "'" + user.chinese_horo + "'";

    const tags = (user.userHasTags ? `${numberOfCommonTags} / ${totalUserTags} * 100` : 0);
    const chineseHoroscope = `
        (
            select compatibility_value::float * 10 as Cn From public.chinese_horo_compatibility 
            where (sign_1 = users.chinese_horo and sign_2 = ${chinese_horo}) or
            (sign_1 = ${chinese_horo} and sign_2 = users.chinese_horo) 
        )
    `;
    const westernHoroscope = `
        (
            select compatibility_value::float * 10 as Wt From public.western_horo_compatibility 
            where (sign_1 = users.western_horo and sign_2 = ${western_horo}) or
            (sign_1 = ${western_horo} and sign_2 = users.western_horo) 
        )
    `;

    // Query to find matches in the database
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
                ${tags} * ${condition.score.tag}
                +
                ${chineseHoroscope} * ${condition.score.cn}
                +
                ${westernHoroscope} * ${condition.score.west}
            ) as match
        FROM public.users
        
        WHERE
            users.user_id <> $1
            ${condition.filter}
        ORDER BY
            ${condition.sort}
        `,
        [user.user_id, user.geolocation]
        // [user.user_id, user.geolocation]
    );
    return res.rows;
};

module.exports = {
    getMatch,
};