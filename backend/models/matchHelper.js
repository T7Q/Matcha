const getSexPreference = (user_sex_orientation) => {
    let preference = "";
    let temp;

    if (user_sex_orientation == "straight_woman"){
        temp = "\'straight_man\'";
    } else if (user_sex_orientation == 'straight_man'){
        temp = "\'straight_woman\'";
    } else {
        temp = "\'" + user_sex_orientation + "\'";
    }
    preference = 'and users.sex_orientation = ' + temp;
    return preference;
}

const buildSort = (req) => {
    return ({'msg': 'success'});
}

const getWeights = (req, userHasTags) => {
    let score = { tag: 0.1, cn: 0.45, west: 0.45 };
    if(req.body.believe_cn === 0){
        score.cn = 0;
    }
    if(req.body.believe_west === 0){
        score.west = 0;
    }
    if (!userHasTags) {
        score.tag = 0;
    }
    return score;
}

// console.log("\u001b[32m. HERE");
// const getAgePreference = (min_age, max_age) => {

// }

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
        believe_west
    } = req.body;

    let score = getWeights(req, userHasTags);
    console.log(score);

    let orientation_match = getSexPreference(userData.sex_orientation, userData.gender);
    // let age = ' and (age > '+ min_age + ' and age < ' + max_age + ') ';
    let age = ' and (age > '+ min_age + ' and age < ' + max_age + ') ';
    // let distance = 'and (distance > '+ min_distance + ' and distance < ' + max_distance + ')';


    let where = orientation_match + age;

    let data = {
        score: score,
        filter: "temp",
        condition: where
    }
    return data;
}


module.exports = {
    buildCondition
};