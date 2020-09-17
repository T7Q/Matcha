const db = require("./db");

const getMatch = async (userData, score, data, geolocation) => {
    let user_id = userData.user_id;
    let user_cn = userData.chinese_horo;
    let user_west = userData.western_horo;
    let condition = data.condition;

    console.log("MATCH user id  " + user_id);

    // let temp = 'match asc'
    // let order = 'ORDER BY ' + temp + ', fame asc';

    console.log(user_id, score.tag, score.cn, score.west, user_cn, user_west);


    const res = await db.query(
        `
        SELECT
        users.user_id,
        users.first_name,
        (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
        users.fame_rating as fame,
        users.profile_pic_path,
        ST_Distance(users.geolocation, $7) as distance,
        (
            select count(*)::float from
            (
                select tag_id from user_tags
                where user_tags.user_id = users.user_id
                intersect 
                select tag_id from user_tags
                where user_tags.user_id = $1
            ) as common_tag
        ),
        (
            select count(id)::float as temp_total from user_tags
            where user_tags.user_id = $1
        ) ,
        geolocation, users.sex_preference, users.chinese_horo, users.western_horo, users.country,
        (
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
            ) 
        
        ) * $2 * 100 as common_tags_score,
        (
            select compatibility_value::float * 10 as Cn From public.chinese_horo_compatibility 
             where (sign_1 = users.chinese_horo and sign_2 = $5) or
           (sign_1 = $5 and sign_2 = users.chinese_horo) 
        ) ,
        (
            select compatibility_value::float * 10 as Wt From public.western_horo_compatibility 
             where (sign_1 = users.western_horo and sign_2 = $6) or
            (sign_1 = $6 and sign_2 = users.western_horo) 
        ) , 
        (
            select count(*)::float as common from
            (
                select tag_id from user_tags
                where user_tags.user_id = users.user_id
                intersect 
                select tag_id from user_tags
                where user_tags.user_id = $1
            ) as common_tag
        ),  
        (
            select count(id) as total_tags from user_tags
            where user_tags.user_id = $1
        ),
        (
            
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
            ) * $2 * 100
            +
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
            ${condition}
        `,
        [user_id, score.tag, score.cn, score.west, user_cn, user_west, geolocation]
    );
    return res.rows;
};

module.exports = {
    getMatch,
};