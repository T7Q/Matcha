const faker = require("faker");

const { Pool } = require("pg");
const { database } = require("./index");

// user 1 is a demo user, created on setup_db stage
// this file generates fake users and adds interactions with demo user

// number of generated fake accounts
const desiredFakeUsers = 50;

// statement to insert 21 params to table 'users'
const prepareStmt = (desiredFakeUsers) => {
    let str = "";
    let params = 22;
    let j = 1;
    for (let k = 0; k < desiredFakeUsers; k++) {
        str = str.concat("(");
        for (let i = 1; i < params; i++) {
            str = i === params - 1 ? str.concat(`$${j}`) : str.concat(`$${j},`);
            j++;
        }
        str = k === desiredFakeUsers - 1 ? str.concat(")") : str.concat("),");
    }
    return `INSERT INTO users (username, first_name, last_name, email, status, 
        password, birth_date, gender, sex_preference, email_notification,
        online, latitude, longitude, country, real_time_notification,
        fame_rating, bio, created_at, last_seen, profile_pic_path, fame_14_days)
        VALUES ${str}`;
};

// generate 21 column values for each user with Faker.js
const createFakeUser = () => {
    return [
        faker.internet.userName(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        "2",
        faker.internet.password(),
        faker.date.between("1960-01-01", "2002-01-01"),
        faker.random.arrayElement(["man", "woman"]),
        faker.random.arrayElement(["man", "woman", "both"]),
        false,
        faker.random.number(1),
        faker.address.latitude(),
        faker.address.longitude(),
        faker.address.country(),
        false,
        faker.random.float({ min: 0, max: 5, precision: 0.1 }),
        faker.lorem.sentences(),
        faker.date.between("2018-01-01", Date()),
        faker.date.between("2018-01-01", Date()),
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

// calculate number of fake likes, visits based on number of generated users
let visits = parseInt(desiredFakeUsers * 0.3);
let likes = parseInt(visits * 0.7);
let connected = parseInt(likes * 0.5);

// generate statements to add fake users like, views to data
const prepareDataStmt = (idMin) => {
    let str = "";
    let allVisits = "";
    let allLike = "";
    let myVisits = "";
    let myLike = "";
    let images = "";

    const img = [
        "/demo6.jpg",
        "/demo7.jpg",
        "/demo8.jpg",
        "/demo9.jpg",
        "/demo10.jpg",
    ];

    // fake data is added to each user
    for (let k = idMin; k < desiredFakeUsers + idMin; k++) {
        // each user gets 10 random tags
        let shuffled = shuffleTags();
        let tagsPerPerson = 10;
        for (let i = 0; i < tagsPerPerson; i++) {
            str = str.concat("(" + `${k},` + `${shuffled[i]}` + "" + ")");
            str =
                desiredFakeUsers + idMin - 1 === k && i === tagsPerPerson - 1
                    ? str
                    : str.concat(",");
        }
        // each user gets 5 (same) images for profile
        for (let i = 0; i < 5; i++) {
            images = images.concat(`(${k}, '${img[i]}')`);
            images =
                desiredFakeUsers + idMin - 1 === k && i === 4
                    ? images
                    : images.concat(",");
        }

        //  fake user visits to demo user profile
        if (k < visits + idMin) {
            allVisits = allVisits.concat("(" + `${k},` + "1)");
            allVisits =
                k === visits + idMin - 1 ? allVisits : allVisits.concat(",");
        }

        // demo user visits to fake users profiles 
        if (k < visits * 2 + idMin) {
            myVisits = myVisits.concat("(1, " + `${k}` + ")");
            myVisits =
                k === visits * 2 + idMin - 1 ? myVisits : myVisits.concat(",");
        }

        //  fake user likes of demo user profiles
        if (k < likes + idMin) {
            allLike = allLike.concat("(" + `${k},` + "1)");
            allLike = k === likes + idMin - 1 ? allLike : allLike.concat(", ");
        }

        // demo user likes of fake users profiles 
        if (k < connected + idMin) {
            myLike = myLike.concat("(1, " + `${k})`);
            myLike = k === connected + idMin - 1 ? myLike : myLike.concat(", ");
        }
    }

    // queries are generated if there are visits, likes
    const tagsQuery = `INSERT INTO user_tags (user_id, tag_id) VALUES ${str};`;
    const imgQuery = `INSERT INTO images(user_id, image_path) VALUES ${images};`;
    const allVisitsQuery =
        visits > 0
            ? `INSERT INTO views (from_user_id, to_user_id) VALUES ${allVisits};`
            : "";
    const myVisitsQuery =
        visits + visits > 0
            ? `INSERT INTO views (from_user_id, to_user_id) VALUES ${myVisits};`
            : "";
    const allLikeQuery =
        likes > 0
            ? `INSERT INTO likes (from_user_id, to_user_id) VALUES ${allLike};`
            : "";
    const myLikeQuery =
        connected > 0
            ? `INSERT INTO likes (from_user_id, to_user_id) VALUES ${myLike};`
            : "";

    return (
        tagsQuery +
        imgQuery +
        allVisitsQuery +
        myVisitsQuery +
        allLikeQuery +
        myLikeQuery
    );
};

// connect to / disconnect from the database
const pool = new Pool(database);
pool.on("connect", () => {
    console.log(`Connected to the database  ${database.database}`);
});
pool.on("remove", () => {
    console.log("Connection to the database closed");
});

// insert fake users to the database
const insertFakeUsers = async () => {
    const fakeUsers = generateFakeUsers(desiredFakeUsers);
    const stmt = prepareStmt(desiredFakeUsers);
    console.log("\x1b[34m" + "Generating fake users" + "\x1b[0m");
    tagsArray(56);
    // calculate the id of first inserted user to add info
    let idMin = 1;
    await pool
        .query(`SELECT max(user_id) from users`)
        .then((res) => {
            idMin += parseInt(res.rows[0].max);
        })
        .catch((err) => {
            console.log("\x1b[31m" + err + "\x1b[0m");
        });

    // add fake users to the database
    await pool
        .query(stmt, [...fakeUsers])
        .then((res) => {
            console.log(
                "\x1b[32m" +
                    `Inserted ${desiredFakeUsers} fake accounts to the database` +
                    "\x1b[0m"
            );
        })
        .catch((err) => {
            console.log("\x1b[31m" + err + "\x1b[0m");
        });
    
    // prepare fake users data (likes, visits) statements
    const tagsStmt = prepareDataStmt(idMin);

    // insert data to the database
    await pool
        .query(tagsStmt)
        .then((res) => {
            console.log(
                "\x1b[32m" +
                    `Inserted fake users tags, likes, views` +
                    "\x1b[0m"
            );
        })
        .catch((err) => {
            console.log("\x1b[31m" + err + "\x1b[0m");
        })
        .finally(() => {
            pool.end();
        });
};

insertFakeUsers();
