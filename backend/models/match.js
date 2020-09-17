const db = require("./db");

const getMatch = async (user_id) => {
    let score_tag = 0.50;
    let score_cn = 0.25;
    let score_west = 0.25;
    let user_cn = 'Ox';
    let user_west = 'Leo';
    let division = "\\";

    const res = await db.query(
        `
        SELECT
        users.user_id,
        users.first_name,
        (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) as age,
        users.fame_rating,
        users.profile_pic_path,
        ST_Distance(users.geolocation, 'point(61.46 24.04)') as distance,
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
            ) * 100 * $2
        
        ) as common_tags_score,
        (
            select compatibility_value::float * 10 as Cn From public.chinese_horo_compatibility 
             where (sign_1 = users.chinese_horo and sign_2 = $3) or
           (sign_1 = $3 and sign_2 = users.chinese_horo) 
        ) ,
        (
            select compatibility_value::float * 10 as Wt From public.western_horo_compatibility 
             where (sign_1 = users.western_horo and sign_2 = $4) or
            (sign_1 = $4 and sign_2 = users.western_horo) 
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
            )  * $2 * 100 
            +
            (
                select compatibility_value::float * 10 as Cn From public.chinese_horo_compatibility 
                where (sign_1 = users.chinese_horo and sign_2 = $3) or
                (sign_1 = $3 and sign_2 = users.chinese_horo) 
            ) * $5
            +
            (
                select compatibility_value::float * 10 as Wt From public.western_horo_compatibility 
                 where (sign_1 = users.western_horo and sign_2 = $4) or
                (sign_1 = $4 and sign_2 = users.western_horo) 
            ) * $6

        ) as match
            
        FROM public.users
        
        WHERE
        users.user_id <> $1
        `,
        [user_id, score_tag, user_cn, user_west, score_cn, score_west]
    );
    return res.rows;
};

module.exports = {
    getMatch,
};


// SELECT
// users.user_id,
// users.first_name,
// (EXTRACT(YEAR FROM AGE(now(), users.birth_date))),
// users.fame_rating,
// users.profile_pic_path,
// users.sex_preference, users.chinese_horo, users.western_horo, users.country,
// (
// 	(
// 		select count(*)::float from
// 		(
// 		select tag_id from user_tags
// 		where user_tags.user_id = users.user_id
// 		intersect 
// 		select tag_id from user_tags
// 		where user_tags.user_id = 1
// 		) as common_tag
// 	)
// 	/   
// 	(
// 		select count(id)::float as total_tags from user_tags
// 		where user_tags.user_id = 1
// 	) * 0.5 * 100

// ),
// (
// 	select compatibility_value as Cn From public.chinese_horo_compatibility 
// 	 where (sign_1 = users.chinese_horo and sign_2 = 'Ox') or
// 	(sign_1 = 'Ox' and sign_2 = users.chinese_horo) 
// ),
// (
// 	select compatibility_value as Wt From public.western_horo_compatibility 
// 	 where (sign_1 = users.western_horo and sign_2 = 'Leo') or
// 	(sign_1 = 'Leo' and sign_2 = users.western_horo) 
// ), 
// (
// 	select count(*)::float as common from
// 	(
// 	select tag_id from user_tags
// 	where user_tags.user_id = users.user_id
// 	intersect 
// 	select tag_id from user_tags
// 	where user_tags.user_id = 1
// 	) as common_tag
// ),  
// (
// 	select count(id) as total_tags from user_tags
// 	where user_tags.user_id = 1
// ),
// (
// 	(
// 		select count(*)::float from
// 		(
// 		select tag_id from user_tags
// 		where user_tags.user_id = users.user_id
// 		intersect 
// 		select tag_id from user_tags
// 		where user_tags.user_id = 1
// 		) as common_tag
// 	)
// 	/   
// 	(
// 		select count(id)::float as total_tags from user_tags
// 		where user_tags.user_id = 1
// 	)  * 0.5 * 100
// 	+
// 	(
// 		select compatibility_value * 0.25 as Cn From public.chinese_horo_compatibility 
// 		 where (sign_1 = users.chinese_horo and sign_2 = 'Ox') or
// 		(sign_1 = 'Ox' and sign_2 = users.chinese_horo) 
// 	) * 10
// 	+
// 	(
// 	select compatibility_value as Wt From public.western_horo_compatibility 
// 	 where (sign_1 = users.western_horo and sign_2 = 'Leo') or
// 	(sign_1 = 'Leo' and sign_2 = users.western_horo) 
// 	) * 0.25 * 10
// ) as match, 
// geolocation,
// ST_Distance(users.geolocation, 'point(61.46 24.04)') as distance
	
// FROM public.users

// WHERE
// users.user_id <> 1 and

// -- LIKES
// -- (select count(likes.like_id) as from_likes from likes
// -- where
// -- likes.from_user_id = users.user_id and
// -- likes.to_user_id = 1) = 1 and

// -- CONNECTED
// -- (select count(likes.like_id) as to_likes from likes
// -- where
// -- likes.from_user_id = 1 and
// -- likes.to_user_id = users.user_id) = 1 and

// -- TAGS
// -- (
// -- select count(id) from user_tags
// -- where
// -- user_tags.user_id = users.user_id and
// -- user_tags.tag_id = 6
// -- ) = 1 and

// ((EXTRACT(YEAR FROM AGE(now(), users.birth_date))) > 18 and 
//  (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) < 100) and 
//  (users.sex_preference = 'woman' or users.sex_preference = 'both') and 
//  (users.country IN ('Finland', 'Russia', 'Spain'))

// order by match desc, common desc, users.fame_rating desc, distance asc