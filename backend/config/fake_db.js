const faker = require('faker');
const { Pool } = require('pg');
const { database } = require('./index');

// this file generates fake users and adds interactions with demo user
// there is also a demo user (user_id 1) created on setup_db stage

// number of generated fake accounts
const desiredFakeUsers = 10;

// statement to insert 19 params to table 'users'
const prepareStmt = (desiredFakeUsers) => {
    let str = '';
    let params = 20;
    let j = 1;
    for (let k = 0; k < desiredFakeUsers; k++) {
        str = str.concat('(');
        for (let i = 1; i < params; i++) {
            str = i === params - 1 ? str.concat(`$${j}`) : str.concat(`$${j},`);
            j++;
        }
        str = k === desiredFakeUsers - 1 ? str.concat(')') : str.concat('),');
    }

    return `INSERT INTO users (first_name, last_name, username, email, password,
        status, birth_date, gender, sex_preference,
        online, latitude, longitude, country,
        fame_rating, bio, created_at, last_seen, profile_pic_path, fame_14_days)
        VALUES ${str}`;
};

// generate 21 column values for each user with Faker.js
const createFakeUser = () => {
    return [
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.userName().toLowerCase(),
        faker.internet.email(),
        '$2b$10$z9rS6JC9v6oWJBgl5lrcteKcho3ESt4V3xf.O2mxdjK1hxhxGLAlS',
        '2',
        faker.date.between('1960-01-01', '2002-01-01'),
        faker.random.arrayElement(['man', 'woman']),
        faker.random.arrayElement(['man', 'woman', 'both']),
        faker.random.number(1),
        faker.address.latitude(),
        faker.address.longitude(),
        faker.address.country(),
        faker.random.float({ min: 0, max: 5, precision: 0.1 }),
        faker.lorem.sentences(),
        faker.date.between('2018-01-01', Date()),
        faker.date.between('2018-01-01', Date()),
        faker.image.avatar(),
        faker.random.number(30),
    ];
};

// create an array with info of all users
const generateFakeUsers = (desiredFakeUsers) => {
    let fakeUsers = [];
    for (let i = 0; i < desiredFakeUsers; i++) {
        let temp = createFakeUser();
        fakeUsers = fakeUsers.concat(temp);
    }

    return fakeUsers;
};

// create array for storing tags_id
let tagsUnshuffled = [];
const tagsArray = (maxTags) => {
    for (let i = 1; i <= maxTags; i++) {
        tagsUnshuffled.push(i);
    }
};

// function to shuffle tags before assignment
const shuffleTags = () => {
    return tagsUnshuffled
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};

// generate random number between min and max
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate statements to add fake users like, views to data
const prepareDataStmt = (idMin, currentUsers) => {
    let str = '';
    let images = '';
    let fakeLikes = '';
    let fakeVisits = '';

    const img = ['/demo6.jpg', '/demo7.jpg', '/demo8.jpg', '/demo9.jpg', '/demo10.jpg'];

    // get array of current users in db
    currentUsers = currentUsers.map((element) => {
        return parseInt(element.user_id);
    });

    // total amount of users in db
    const usersTotal = desiredFakeUsers + idMin - 1;

    // fake data is added to each user
    for (let k = idMin; k < desiredFakeUsers + idMin; k++) {
        // each user gets 6 random tags
        let shuffled = shuffleTags();
        let tagsPerPerson = 5;
        for (let i = 0; i < tagsPerPerson; i++) {
            str = str.concat('(' + `${k},` + `${shuffled[i]}` + '' + ')');
            str =
                desiredFakeUsers + idMin - 1 === k && i === tagsPerPerson - 1
                    ? str
                    : str.concat(',');
        }
        // each user gets 2 (same) images for profile
        for (let i = 0; i < 2; i++) {
            images = images.concat(`(${k}, '${img[i]}')`);
            images = desiredFakeUsers + idMin - 1 === k && i === 1 ? images : images.concat(',');
        }

        const amountLikes = getRandomInt(1, usersTotal / 4);
        const amountVisits = getRandomInt(1, usersTotal / 4);
        let users = [];

        for (let i = 0; i < amountLikes; i++) {
            const randomUserId = getRandomInt(1, usersTotal);
            if (
                currentUsers.includes(randomUserId) &&
                !users.includes(randomUserId) &&
                k !== randomUserId
            ) {
                users.push(randomUserId);
            }
        }

        // generate random likes for fake users
        let userLikes = '';
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                userLikes = userLikes.concat('(' + `${k},` + `${users[i]}` + ')');
                userLikes = i === users.length - 1 ? userLikes : userLikes.concat(',');
            }
            fakeLikes = fakeLikes.concat(userLikes);
            fakeLikes = k === desiredFakeUsers + idMin - 1 ? fakeLikes : fakeLikes.concat(',');
        }

        // generate random views for fake users
        users = [];
        for (let i = 0; i < amountVisits; i++) {
            const randomUserId = getRandomInt(1, usersTotal);
            if (
                currentUsers.includes(randomUserId) &&
                !users.includes(randomUserId) &&
                k !== randomUserId
            ) {
                users.push(randomUserId);
            }
        }
        let userVisits = '';
        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                userVisits = userVisits.concat('(' + `${k},` + `${users[i]}` + ')');
                userVisits = i === users.length - 1 ? userVisits : userVisits.concat(',');
            }
            fakeVisits = fakeVisits.concat(userVisits);
            fakeVisits = k === desiredFakeUsers + idMin - 1 ? fakeVisits : fakeVisits.concat(',');
        }
    }

    const tagsQuery = `INSERT INTO user_tags (user_id, tag_id) VALUES ${str};`;
    const imgQuery = `INSERT INTO images(user_id, image_path) VALUES ${images};`;

    let fakeVisitsQuery =
        fakeVisits !== ''
            ? `INSERT INTO views (from_user_id, to_user_id) VALUES ${fakeVisits};`
            : '';
    let fakeLikesQuery =
        fakeLikes !== '' ? `INSERT INTO likes (from_user_id, to_user_id) VALUES ${fakeLikes};` : '';

    // remove extra ',', that appears if there are no visits or likes from last user(s)
    fakeVisitsQuery = fakeVisitsQuery.replace(',;', ';');
    fakeLikesQuery = fakeLikesQuery.replace(',;', ';');

    return tagsQuery + imgQuery + fakeLikesQuery + fakeVisitsQuery;
};

// connect to / disconnect from the database
const pool = new Pool(database);
pool.on('connect', () => {
    console.log(`Connected to the database  ${database.database}`);
});
pool.on('remove', () => {
    console.log('Connection to the database closed');
});

// insert fake users to the database
const insertFakeUsers = async () => {
    const fakeUsers = generateFakeUsers(desiredFakeUsers);
    const stmt = prepareStmt(desiredFakeUsers);
    console.log('\x1b[34m' + 'Generating fake users' + '\x1b[0m');
    tagsArray(56);
    // calculate the id of first inserted user to add info
    let errorCount = false;

    // add fake users to the database
    await pool
        .query(stmt, [...fakeUsers])
        .then(() => {
            console.log(
                '\x1b[32m' +
                    `Inserted ${desiredFakeUsers} fake accounts to the database` +
                    '\x1b[0m'
            );
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
            errorCount = true;
        });

    // get all user id from database
    let currentUsers = {};
    await pool
        .query(`SELECT user_id from users`)
        .then((res) => {
            currentUsers = res.rows;
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
            errorCount = true;
        });

    // calculate first id of inserted fake users
    let idMin = 1;
    await pool
        .query(`SELECT max(user_id) from users`)
        .then((res) => {
            idMin = parseInt(res.rows[0].max) - desiredFakeUsers + 1;
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
            errorCount = true;
        });

    // prepare fake users data (likes, visits) statements
    let tagsStmt = '';
    if (!errorCount) tagsStmt = prepareDataStmt(idMin, currentUsers);

    // insert data to the database
    await pool
        .query(tagsStmt)
        .then(() => {
            console.log('\x1b[32m' + `Inserted fake users tags, likes, views` + '\x1b[0m');
        })
        .catch((err) => {
            console.log('\x1b[31m' + err + '\x1b[0m');
        })
        .finally(() => {
            pool.end();
        });
};

insertFakeUsers();
