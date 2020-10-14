const faker = require("faker");

const { Pool } = require("pg");
const { database } = require("./index");

// number of generated fake accounts
const desiredFakeUsers = 2;

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

    await pool
        .query(stmt, [...fakeUsers])
        .then((res) => {
            console.log(
                "\x1b[32m" +
                    "Inserted 500+ fake accounts to the database" +
                    "\x1b[0m"
            );
        })
        .catch((err) => {
            console.log("here we got the error");
            console.log("\x1b[31m" + err + "\x1b[0m");
        })
        .finally(() => {
            pool.end();
        });
};

insertFakeUsers();
