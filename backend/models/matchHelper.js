const validateOrder = (userSelectedOrder) => {
    if(!userSelectedOrder)
        return false;
    for (const element of userSelectedOrder) {
        let temp = element.split('_');
        if(!(["date", "match", "distance", "age", "fame", "common_tag"].includes(temp[0])))
            return true;
        if(!(["asc", "desc"].includes(temp[1])))
            return true;
    }
    return false;
}

const validateOrientation = (userSelectedOrientation) => {
    if(!userSelectedOrientation)
        return false;
    if(!(["straight_woman", "straight_man", "gay", "bi", "lesbian"].includes(userSelectedOrientation)))
        return true;
    return false;
}

const buildBase = (req, settings) => {
    switch (req.body.type) {
        case "liked_me":
            settings.dateColumn = " , likes.date_created as date";
            settings.join = " LEFT JOIN likes ON likes.from_user_id = users.user_id ";
            settings.filter = " AND likes.to_user_id = $1 ";
            settings.order = "date desc";
            req.body.sex_orientation = (req.body.sex_orientation ? req.body.sex_orientation : "");
            break;
        case "connected":
            settings.filter = " AND (SELECT count(likes.like_id) AS from_likes FROM likes\
                        WHERE likes.from_user_id = users.user_id AND likes.to_user_id = $1) = 1\
                        AND (SELECT count(likes.like_id) AS to_likes FROM likes\
                        WHERE likes.from_user_id = $1 AND likes.to_user_id = users.user_id) = 1";
            req.body.sex_orientation = (req.body.sex_orientation ? req.body.sex_orientation : "");
            break;
        case "visited_me":
            settings.dateColumn = ", views.date_created AS date ";
            settings.join = " LEFT JOIN views ON views.from_user_id = users.user_id ";
            settings.filter = " AND views.to_user_id = $1";
            settings.order = "date desc";
            req.body.sex_orientation = (req.body.sex_orientation ? req.body.sex_orientation : "");
            break;
        // case "visited_me_new":
        //     settings.dateColumn = ", views.date_created AS date ";
        //     settings.join = " LEFT JOIN views ON views.from_user_id = users.user_id ";
        //     settings.filter = " AND views.to_user_id = $1\
        //                         AND views.date_created  = DATE_FROM_NOTIFICATIONS";
        //     settings.order = "date desc";
        //     req.body.sex_orientation = (req.body.sex_orientation ? req.body.sex_orientation : "");
        //     break;
        case "visited_by_me":
            settings.dateColumn = ", views.date_created AS date ";
            settings.join = " LEFT JOIN views ON views.to_user_id = users.user_id ";
            settings.filter = " AND views.from_user_id = $1 ";
            settings.order = "date desc";
            req.body.sex_orientation = (req.body.sex_orientation ? req.body.sex_orientation : "");
            break;
        case "nearby":
            req.body.min_distance = 0;
            req.body.max_distance = 10000;
            settings.limit = " LIMIT 100";
            break;
        case "popular":
            settings.filter = " AND users.fame_rating > 0  ";
            settings.order = "fame desc";
            settings.limit = " LIMIT 100";
            break;
        case "online":
            settings.filter = " AND users.online = 1  ";
            break;
        case "new":
            settings.filter = " AND DATE_PART('day', NOW() - users.created_at) < 14  ";
            settings.order = "date desc";
            break;
        case "random":
            settings.order = "random()";
            settings.limit = " LIMIT 100";
            break;
    }
}

const setWeights = (believeCn, believeWest, userHasTags) => {
    let weight = { tag: 0.1, cn: 0.45, west: 0.45 };
    weight.cn = (believeCn === 0 ? 0 : weight.cn);
    weight.west = (believeWest === 0 ? 0 : weight.west);
    weight.tag = (!userHasTags ? 0 : weight.tag);
    return weight;
};

const setSexPreference = (userSexOrientation, filterSexOrientation) => {
    let orientation = "";

    if (filterSexOrientation === "") {
        return orientation;
    } else if (filterSexOrientation) {
        orientation = "'" + filterSexOrientation + "'";
    } else {
        orientation = 
        userSexOrientation == "straight_woman" ? "'straight_man'"
        : userSexOrientation == "straight_man" ? "'straight_woman'"
        : "'" + userSexOrientation + "'";
    }
    return ("and users.sex_orientation = " + orientation);
};

const setAgePreference = (minAge, maxAge) => {
    minAge = (minAge ? minAge : 18 );
    maxAge = (maxAge ? maxAge : 120 );
    return (" and ((EXTRACT(YEAR FROM AGE(now(), users.birth_date))) >= " + minAge + 
                 " and (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) <= " + maxAge + ")"); 
}

const setDistance = (minDistance, maxDistance) => {
    minDistance = (minDistance ? minDistance : 0 );
    maxDistance = (maxDistance ? maxDistance : 100000);
    return (" and ((ST_Distance(users.geolocation, $2)::integer / 1000) >= " + minDistance +
            " and (ST_Distance(users.geolocation, $2)::integer / 1000) <=  " + maxDistance +")");
}

const setTags = (tags, index, values) => {
    filter = "";
    for (const element of tags) {
        filter += 
                " AND (SELECT count(id) FROM user_tags\
                    LEFT JOIN tags ON user_tags.tag_id = tags.tag_id\
                    WHERE user_tags.user_id = users.user_id AND\
                        tags.tag_name = $" + index.i + " ) = 1";
        values.push(element);
        index.i++;
    };
    return filter;
}

const setCountry = (country, index, values) => {
    if (country.length < 0)
        return "";
    let filter = " AND (users.country IN (";
    for (j = 0; j < country.length - 1; j++) {
        filter += "$" + index.i + ", ";
        index.i++;
    };
    filter += "$" + index.i + "))";
    for (const element of country) {
        values.push(element);
    }
    return filter;
}

const buildFilter= (req, userDbData, values) => {
    let index = {i: values.length + 1};
    let orientation = setSexPreference(userDbData.sex_orientation, req.body.sex_orientation);
    let age =  setAgePreference(req.body.min_age, req.body.max_age);
    let distance = setDistance(req.body.min_distance, req.body.max_distance);
    let tags = (req.body.tags? setTags(req.body.tags, index, values) : "");
    let country = (req.body.country? setCountry(req.body.country, index, values) : "");
    return(orientation + age + distance + tags + country);
};

const buildOrder = (userSuppliedOrder, order) => {
    let defaultOrder = "match desc, distance desc, fame desc";
    let userOrder  = (!userSuppliedOrder ? "" : (" " + userSuppliedOrder.join(', ').replace(/_/g, " ")));
    order = (order === "" ? "" : " " + order + ", ")
    return (userOrder === "" ? order +  defaultOrder : userOrder);
}

module.exports = {
    buildBase,
    buildFilter,
    buildOrder,
    setWeights,
    validateOrder,
    validateOrientation
};