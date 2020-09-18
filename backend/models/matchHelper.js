const getSexPreference = (userData, req) => {
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

const buildSort = (req) => {
    return { msg: "success" };
};

const getWeights = (req, userHasTags) => {
    let score = { tag: 0.1, cn: 0.45, west: 0.45 };
    if (req.body.believe_cn === 0) {
        score.cn = 0;
    }
    if (req.body.believe_west === 0) {
        score.west = 0;
    }
    if (!userHasTags) {
        score.tag = 0;
    }
    return score;
};

// console.log("\u001b[32m" + 

const getAgePreference = (req) => {
    let min_age = (req.body.min_age ? req.body.min_age - 1 : 17 );
    let max_age = (req.body.max_age ? req.body.max_age + 1 : 121 );
    let age = " and (age > " + min_age + " and age < " + max_age + ") ";
    return age;
}

const buildCondition = (req, userData, userHasTags) => {
    const {
        user_id,
        type,
        min_age,
        max_age,
        min_distance,
        max_distance,
        tags,
        country,
        sort,
        believe_cn,
        believe_west,
    } = req.body;

    let score = getWeights(req, userHasTags);

    let orientation_match = getSexPreference(userData, req);
    let age =  getAgePreference(req);
    // let age = " and (age > " + min_age + " and age < " + max_age + ") ";
    // let distance = 'and (distance > '+ min_distance + ' and distance < ' + max_distance + ')';

    let filter = orientation_match + age;
    let order = `match desc`;
    let data = {
        score: score,
        filter: filter,
        sort: order
    };


    return data;
};

module.exports = {
    buildCondition,
};
