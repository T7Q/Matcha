const validateOrder = (userSelectedOrder) => {
    if (!userSelectedOrder) return false;
    for (const element of userSelectedOrder) {
        let temp = element.split("_");
        if (
            !["date", "match", "distance", "age", "fame", "commonTag"].includes(
                temp[0]
            )
        )
            return true;
        if (!["asc", "desc"].includes(temp[1])) return true;
    }
    return false;
};

const validateOrientation = (userSelectedOrientation) => {
    if (!userSelectedOrientation) return false;
    if (
        ![
            "straight_woman",
            "straight_man",
            "gay",
            "bi_man",
            "bi_woman",
            "lesbian",
        ].includes(userSelectedOrientation)
    )
        return true;
    return false;
};

const buildBase = (req, settings) => {
    switch (req.body.type) {
        case "nearby":
            settings.filter += setDistance(0, 10000);
            settings.limit = " LIMIT 100";
            break;
        case "popular":
            settings.filter += " AND users.fame_rating > 0  ";
            settings.order = "fame desc";
            settings.limit = " LIMIT 100";
            break;
        case "online":
            settings.filter += " AND users.online = 1  ";
            break;
        case "new":
            settings.filter +=
                " AND DATE_PART('day', NOW() - users.created_at) < 14  ";
            settings.order = "date desc";
            break;
        case "random":
            settings.order += "random()";
            settings.limit = " LIMIT 100";
            break;
    }
};

const setWeights = (believeCn, believeWest, userHasTags) => {
    let weight = { tag: 0.1, cn: 0.45, west: 0.45 };
    if (believeCn === true && believeWest === false) {
        weight.cn = weight.cn + weight.west;
        weight.west = 0;
    } else if (believeCn === false && believeWest === true)  {
        weight.west = weight.west + weight.cn;
        weight.cn = 0;
    } else if (believeCn === false && believeWest === false)  {
        weight.cn = 0;
        weight.west = 0;
    }
    weight.tag = !userHasTags
        ? 0
        : believeCn === false && believeWest === false
        ? 1
        : weight.tag;
    return weight;
};

const setSexPreference = (userSexOrientation, filterSexOrientation) => {
    let orientation = "";

    if (filterSexOrientation) {
        return "and users.sex_orientation = '" + filterSexOrientation + "'";
    } else {
        switch (userSexOrientation) {
            case "bi_woman":
                orientation = "'lesbian', 'bi_woman', 'bi_man', 'straight_man'";
                break;
            case "bi_man":
                orientation = "'gay', 'bi_woman', 'bi_man', 'staight_woman'";
                break;
            case "straight_woman":
                orientation = "'straight_man', 'bi_man'";
                break;
            case "straight_man":
                orientation = "'straight_woman', 'bi_woman'";
                break;
            case "gay":
                orientation = "'gay', 'bi_man'";
                break;
            case "lesbian":
                orientation = "'lesbian', 'bi_woman'";
                break;
        }
        return " and (users.sex_orientation  in (" + orientation + "))";
    }
};

const setAgePreference = (minAge, maxAge) => {
    minAge = minAge ? minAge : 18;
    maxAge = maxAge ? maxAge : 120;
    return (
        " and ((EXTRACT(YEAR FROM AGE(now(), users.birth_date))) >= " +
        minAge +
        " and (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) <= " +
        maxAge +
        ")"
    );
};

const setDistance = (minDistance, maxDistance) => {
    minDistance = minDistance ? minDistance : 0;
    maxDistance = maxDistance ? maxDistance : 100000;
    return (
        " and ((ST_Distance(users.geolocation, $2)::integer / 1000) >= " +
        minDistance +
        " and (ST_Distance(users.geolocation, $2)::integer / 1000) <=  " +
        maxDistance +
        ")"
    );
};

const setFame = (minFame, maxFame) => {
    minFame = minFame ? minFame : 0;
    maxFame = maxFame ? maxFame : 5;
    return (
        " and (fame_rating >= " +
        minFame +
        " and fame_rating <=  " +
        maxFame +
        ")"
    );
};

const setTags = (tags, index, values) => {
    filter = "";
    for (const element of tags) {
        filter +=
            " AND (SELECT count(id) FROM user_tags\
                    LEFT JOIN tags ON user_tags.tag_id = tags.tag_id\
                    WHERE user_tags.user_id = users.user_id AND\
                        tags.tag_name = $" +
            index.i +
            " ) = 1";
        values.push(element);
        index.i++;
    }
    return filter;
};

const setCountry = (country, index, values) => {
    if (country.length < 0) return "";
    let filter = " AND (users.country IN (";
    for (j = 0; j < country.length - 1; j++) {
        filter += "$" + index.i + ", ";
        index.i++;
    }
    filter += "$" + index.i + "))";
    for (const element of country) {
        values.push(element);
    }
    return filter;
};

const buildFilter = (req, userDbData, values) => {
    let index = { i: values.length + 1 };
    let orientation = setSexPreference(
        userDbData.sex_orientation,
        req.body.sex_orientation
    );
    let age = setAgePreference(req.body.min_age, req.body.max_age);
    let distance = setDistance(req.body.min_distance, req.body.max_distance);
    let fame = setFame(req.body.min_fame, req.body.max_fame);
    let tags = req.body.tags ? setTags(req.body.tags, index, values) : "";
    let country = req.body.country
        ? setCountry(req.body.country, index, values)
        : "";
    return orientation + age + distance + tags + country + fame;
};

const buildOrder = (userSuppliedOrder, order) => {
    let defaultOrder = "match desc, distance desc, fame desc";
    let userOrder = !userSuppliedOrder
        ? ""
        : " " + userSuppliedOrder.join(", ").replace(/_/g, " ");
    order = order === "" ? "" : " " + order + ", ";
    return userOrder === "" ? order + defaultOrder : userOrder;
};

module.exports = {
    buildBase,
    buildFilter,
    buildOrder,
    setSexPreference,
    setWeights,
    validateOrder,
    validateOrientation,
};
