const db = require("./db");

const getMatch = async (user, condition) => {    
    let additionalConditions = condition.condition;

    console.log(" \u001b[32m. MATCH user id  " + user.user_id);
    // console.log(" " + condition.score.tag +" "  + condition.score.cn + " " +  condition.score.west);

    // let temp = 'match asc'
    // let order = 'ORDER BY ' + temp + ', fame asc';

    // console.log(user.user_id, score.tag, score.cn, score.west, user.chinese_horo, user.western_horo, user.geolocation);

    let tagsWeight = `
        (
            select count(*)::float from
            (
                select tag_id from user_tags
                where user_tags.user_id = users.user_id
                intersect 
                select tag_id from user_tags
                where user_tags.user_id = $1
            ) as common_tag
        ) 
        /   
        (
            select count(id)::float as total_tags from user_tags
            where user_tags.user_id = $1
        ) * $7 * 100
        +
    `;

    let variables = `[user_id, geolocation, score.cn, score.west, user_cn, user_west, score.tag]`;



    const res = await db.query(
        `
        SELECT
        users.user_id,
        users.first_name,
        (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
        users.fame_rating as fame,
        users.profile_pic_path,
        ST_Distance(users.geolocation, $2) as distance,
        (
            select count(*)::float as common_tag from
            (
                select tag_id from user_tags
                where user_tags.user_id = users.user_id
                intersect 
                select tag_id from user_tags
                where user_tags.user_id = $1
            ) as common_tag2
        ),
        geolocation, users.sex_preference, users.chinese_horo, users.western_horo, users.country,
        (
            ${tagsWeight}
            
            (
                select compatibility_value::float * 10 as Cn From public.chinese_horo_compatibility 
                where (sign_1 = users.chinese_horo and sign_2 = $5) or
                (sign_1 = $5 and sign_2 = users.chinese_horo) 
            ) * $3
            +
            (
                select compatibility_value::float * 10 as Wt From public.western_horo_compatibility 
                 where (sign_1 = users.western_horo and sign_2 = $6) or
                (sign_1 = $6 and sign_2 = users.western_horo) 
            ) * $4
          

        ) as match
            
        FROM public.users
        
        WHERE
            users.user_id <> $1
            ${additionalConditions}
        `,
        // [user_id, geolocation, score.cn, score.west, user_cn, user_west, score.tag]
        [user.user_id, user.geolocation, condition.score.cn, condition.score.west, user.chinese_horo, user.western_horo, condition.score.tag]
    );
    return res.rows;
};

module.exports = {
    getMatch,
};