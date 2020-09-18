const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queryString = require('query-string');
const accountModel = require('../../models/account');
const helper = require('../../models/accountHelper');
const { google, jwtSecret } = require('../../config');
const getLocation = require('../../utils/location'); // change naming to locate

// url parameters for login url
const stringifiedParams = queryString.stringify({
    client_id: google.id,
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' '),
    redirect_uri: 'http://localhost:5000/account/auth/google',
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
});

// endpoint for retrieving google login link
const getGoogleLink = (req, res) => {
    // login url, should be on the client side
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    return res.json(googleLoginUrl);
}

// get access token for google and send this token to client
const getAccessToken = async (code) => {
    const { data } = await axios({
        url: 'https://oauth2.googleapis.com/token',
        method: 'post',
        data: {
            client_id: google.id,
            client_secret: google.secret,
            redirect_uri: 'http://localhost:5000/account/auth/google',
            grant_type: 'authorization_code',
            code,
        }
    });
    return data.access_token;
}

// get user information about user
const getUserInfo = async (code) => {
    try {
        const token = await getAccessToken(code);
        const { data } = await axios({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (e) {
        return { 'error': 'Invalid parameters' };
    }
}

// Need to change google redirect url to client url
// if from here response register, need to render register for google
const googleLogin = async (req, res) => {
    // after frontend change code to req.body;
    const code = req.query.code;

    // get information about user
    const userInfo = await getUserInfo(code);

    if (userInfo.error) {
        return res.status(400).json(userInfo);
    }

    // check if user already registered
    let user = await accountModel.findUserInfo('email', userInfo.email, 'user_id', 'username', 'status', 'longitude', 'latitude');

    if (!user) {
        return res.json({
            'msg': 'register',
            'google': jwt.sign({
                email: userInfo.email,
                id: userInfo.id
            }, jwtSecret, { expiresIn: 60 * 60 })
        });
    }

    // get location
    const location = await getLocation(req, user);

    await accountModel.updateProfile(user.user_id, location);

    // if user has account we sent token to client
    return res.json({
        'status': user.status,
        'username': user.username,
        'tkn': jwt.sign({
            userId: user.user_id,
            status: user.status
        }, jwtSecret, { expiresIn: 10 * 60 })
    });

    // // generate some random username for user
    // while (true) {
    //     username = Math.random().toString(36).slice(2);
    //     console.log(username);
    //     let usernameExists = await accountModel.findUserInfo('username', username, 'user_id');
    //     if (!usernameExists) {
    //         break;
    //     }
    // }

    // const data = {
    //     email: userInfo.email,
    //     password: await bcrypt.hash(userInfo.id, 10),
    //     username: username,
    //     firstname: userInfo.given_name || userInfo.email.split("@")[0],
    //     lastname: userInfo.family_name || userInfo.email.split("@")[0]
    // }
}

const registerGoogle = async (req, res) => {
    const { google, username, lastname, firstname } = req.body;

    const userInfo = jwt.verify(google, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(400).json({ 'error': 'Try to login again' });
        } else {
            return decode;
        }
    });

    let errors = [];

    errors.push(await helper.validateEmail(userInfo.email));
    errors.push(await helper.validateUsername(username));
    errors.push(helper.validateName(firstname));
    errors.push(helper.validateName(lastname));

    // remove empty objects from errors
    errors = errors.filter(error => { return Object.keys(error).length != 0 });

    // check if we have errors
    if (errors.length != 0) {
        return res.status(400).json(errors);
    }

    req.body.password = await bcrypt.hash(userInfo.id, 10);
    req.body.email = userInfo.email;

    const result = await accountModel.register(req.body);

    if (result.error) {
        return res.status(400).json(result);
    }

    // get location
    const data = await getLocation(req, result);

    // set status and online
    data.online = 1;
    data.status = 1;

    await accountModel.updateProfile(result.user_id, data);

    return res.json({
        'status': 1,
        'username': result.username,
        'tkn': jwt.sign({
            userId: result.user_id,
            status: 1
        }, jwtSecret, { expiresIn: 60 * 60 })
    });
}

module.exports = {
    getGoogleLink, googleLogin, registerGoogle
}
