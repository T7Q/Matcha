const faker = require("faker");

const { Pool } = require("pg");
const { database } = require("./index");

// number of generated fake accounts
const desiredFakeUsers = 5;

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

let tagsUnshuffled = [];
const tagsArray = (maxTags) => {
    for (let i = 1; i <= maxTags; i++) {
        tagsUnshuffled.push(i);
    }
};

const shuffleTags = () => {
    return tagsUnshuffled
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};

let visits = parseInt(desiredFakeUsers * 0.3);
let likes = parseInt(visits * 0.7);
let connected = parseInt(likes * 0.5);
console.log(desiredFakeUsers, visits, visits + visits, likes, connected);

const prepareTagsStmt = (idMin) => {
    let str = "";
    let allVisits = "";
    let allLikes = "";
    let myVisits = "";
    let myLikes = "";
    let images = "";

    const img = ['/demo1.jpg', '/demo2.jpg', '/demo3.jpg', '/demo4.jpg', '/demo5.jpg'];
    console.log(idMin);
    for (let k = idMin; k < desiredFakeUsers + idMin; k++) {
        console.log(k);
        let shuffled = shuffleTags();
        for (let i = 0; i < 6; i++) {
            str =
                desiredFakeUsers + idMin - 1 === k && i === 5
                    ? str.concat("(" + `${k},` + `${shuffled[i]}` + "" + ")")
                    : str.concat("(" + `${k},` + `${shuffled[i]}` + "" + "),");
        }
        
        for (let i = 0; i < 5; i++) {
            images =
                desiredFakeUsers + idMin - 1 === k && i === 4
                    ? images.concat(`(${k}, '${img[i]}')`)
                    : images.concat(`(${k}, '${img[i]}'),`)
        }
        
        if (k < visits + idMin) {
            console.log("allvisits", visits + idMin);
            allVisits = k === visits + idMin - 1 ?
            allVisits.concat("(" + `${k},`+ "1)") :
            allVisits.concat("(" + `${k},`+ "1), "); 

        }
        if (k < visits + visits + idMin) {
            console.log("my visits", visits + visits + idMin);
            myVisits = k === visits + visits + idMin - 1 ?
            myVisits.concat("(1, " + `${k}`+ ")") :
            myVisits.concat("(1, " + `${k}`+ "), "); 

        }
        if (k < likes + idMin) {
            console.log("all likes", likes + idMin);
            allLikes = k === likes + idMin - 1 ?
            allLikes.concat("(" + `${k},`+ "1)") :
            allLikes.concat("(" + `${k},`+ "1), "); 

        }
        if (k < connected + idMin) {
            console.log("my likes", connected + idMin);
            myLikes = k === connected + idMin - 1 ?
            myLikes.concat("(" + `${k},`+ "1)") :
            myLikes.concat("(" + `${k},`+ "1), "); 

        }
    }

    const tagsQuery = `INSERT INTO user_tags (user_id, tag_id) VALUES ${str};`
    const imgQuery = `INSERT INTO images(user_id, image_path) VALUES ${images};`;
    const allVisitsQuery = visits > 0 ? `INSERT INTO views (from_user_id, to_user_id) VALUES ${allVisits};` : '';
    const myVisitsQuery = visits + visits > 0 ? `INSERT INTO views (from_user_id, to_user_id) VALUES ${myVisits};` : '';
    const allLikesQuery =  likes > 0 ? `INSERT INTO likes (from_user_id, to_user_id) VALUES ${allLikes};` : '';
    const myLikesQuery = connected > 0 ? `INSERT INTO likes (from_user_id, to_user_id) VALUES ${myLikes};` : '';

    return (tagsQuery + allVisitsQuery + myVisitsQuery + allLikesQuery + myLikesQuery + imgQuery);

    // return `INSERT INTO user_tags (user_id, tag_id) VALUES ${str};
    // INSERT INTO likes (from_user_id, to_user_id) VALUES ${myLikes};
    // INSERT INTO likes (from_user_id, to_user_id) VALUES ${allLikes};
    // INSERT INTO views (from_user_id, to_user_id) VALUES ${myVisits};
    // INSERT INTO views (from_user_id, to_user_id) VALUES ${allVisits};
    // INSERT INTO images(user_id, image_path) VALUES ${images};
    // `;
};

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
    let idMin = 479;
    // let res = await pool
    //     .query(`SELECT max(user_id) from users`)
    //     .then((res) => {
    //         console.log("res", res.rows);
    //     })
    //     .catch((err) => {
    //         console.log("\x1b[31m" + err + "\x1b[0m");
    //     });

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

    const tagsStmt = prepareTagsStmt(idMin);

    await pool
        .query(tagsStmt)
        .then((res) => {
            console.log("\x1b[32m" + `Inserted fake users tags, likes, views` + "\x1b[0m");
        })
        .catch((err) => {
            console.log("\x1b[31m" + err + "\x1b[0m");
        })
        .finally(() => {
            pool.end();
        });
};

insertFakeUsers();
