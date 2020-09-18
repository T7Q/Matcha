const { readSync } = require("fs");

const setWeights = (req, userHasTags) => {
    let weight = { tag: 0.1, cn: 0.45, west: 0.45 };
    weight.cn = (req.body.believe_cn === 0 ? 0 : weight.cn);
    weight.west = (req.body.believe_west === 0 ? 0 : weight.west);
    weight.tag = (!userHasTags ? 0 : weight.tag);
    return weight;
};

const setSexPreference = (userData, req) => {
    let orientation;
    if (req.body.sex_orientation) {
        orientation = "'" + req.body.sex_orientation + "'";
    } else {
        if (userData.sex_orientation == "straight_woman") {
            orientation = "'straight_man'";
        } else if (userData.sex_orientation == "straight_man") {
            orientation = "'straight_woman'";
        } else {
            orientation = "'" + userData.sex_orientation + "'";
        }
    }
    let preference = "and users.sex_orientation = " + orientation;
    return preference;
};

const setAgePreference = (req) => {
    let min_age = (req.body.min_age ? req.body.min_age : 18 );
    let max_age = (req.body.max_age ? req.body.max_age : 120 );
    let age = " and ((EXTRACT(YEAR FROM AGE(now(), users.birth_date))) >= " + min_age + 
                 " and (EXTRACT(YEAR FROM AGE(now(), users.birth_date))) <= " + max_age + ")"; 
    return age;
}

const setDistance = (req) => {
    min_distance = (req.body.min_distance ? req.body.min_distance : 0 );
    max_distance = (req.body.max_distance ? req.body.max_distance : 100000);
    distance = 
                "and ((ST_Distance(users.geolocation, $2)::integer / 1000) >= " + min_distance +
                " and (ST_Distance(users.geolocation, $2)::integer / 1000) <=  " + max_distance +")";
    return distance;
}

const setTags = (req, index, values) => {
    let i = index.i
    tags = "";
    for (const element of req.body.tags) {
        tags += 
                " AND (SELECT count(id) FROM user_tags\
                    LEFT JOIN tags ON user_tags.tag_id = tags.tag_id\
                    WHERE user_tags.user_id = users.user_id AND\
                        tags.tag_name = $" + i + " ) = 1";
        values.push(element);
        i++;
    };
    index.i = i;
    return tags;
}

const setCountry = (req, index, values) => {
    let i = index.i;
    filter = "";
    let country = req.body.country;
    for (j = 0; j < country.length - 1; j++) {
        filter += 
                " AND (users.country IN ($" + i + ", ";
        i++;
    };
    filter += "$" + i + "))";
    index.i = i++;

    for (const element of country) {
        values.push(element);
    }
    index.i = i;
    return filter;
}

const buildFilter= (req, userData, values) => {
    let index = {i: values.length + 1};

    let orientation_match = setSexPreference(userData, req);
    let age =  setAgePreference(req);
    let distance = setDistance(req);
    let tags = (req.body.tags? setTags(req, index, values) : "");
    let country = (req.body.country? setCountry(req, index, values) : "");

    filter = orientation_match + age + distance + tags + country;
    let temp = buildSort(req);
    return filter;
};

// console.log("\u001b[32m" + 

const buildSort = (req) => {
    if(!req.body.order) {
        return "match desc";
    }
    temp = req.body.order
    let order = temp.join(', ');
    order = " " + order.replace(/_/g, " ");
    return order;
}

module.exports = {
    buildFilter,
    setWeights,
    buildSort
};
