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

const buildCondition = (req, userData) => {
    const {
        user_id,
        type,
        min_age,
        max_age,
        min_distance,
        max_distance,
        tags,
        country,
        sort
    } = req.body;

    let match_sex_preference = getSexPreference(userData.sex_orientation, userData.gender);

    let orientation_match = match_sex_preference;
    let age = ' and (age > '+ min_age + ' and age < ' + max_age + ') ';
    let distance = 'and (age > '+ min_distance + ' and age < ' + max_distance + ')';
    whereCondition = orientation_match + age + distance;

    let data = {
        filter: "temp",
        condition: whereCondition
    }
    return data;
}

const buildSort = (req) => {
    return ({'msg': 'success'});
}

module.exports = {
    buildCondition,
    buildSort
};