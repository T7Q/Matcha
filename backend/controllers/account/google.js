require('dotenv').config({ path: 'config/.env' });
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queryString = require('query-string');
const accountModel = require('../../models/account');
const profileModel = require('../../models/profile');
const getLocation = require('../../utils/location');

// url parameters for login url
const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
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
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
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

// Need to change google redirect url to client url,
// from there we will call this endpoint and send jwt back as if we are making login
// need to check if it will work with google api in that way
const googleLogin = async (req, res) => {
    // after frontend change code to req.body;
    const code = req.query.code;

    // get information about user
    const userInfo = await getUserInfo(code);

    if (userInfo.error) {
        return res.status(400).json(userInfo);
    }

    // get location
    const location = getLocation();

    // check if user already registered
    let user = await accountModel.findUserInfo('email', userInfo.email, 'user_id', 'username', 'status');

    if (!user) {
        return res.json({ 'msg': 'register' });
    }
    // if user has account we sent token to client
    return res.json({
        'status': user.status,
        'username': user.username,
        'tkn': jwt.sign({
            email: userInfo.email,
            userId: user.user_id,
            status: user.status
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });

    // let username = '';

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

    // const newUser = await accountModel.register(data);

    // if (newUser.error) {
    //     return res.send(newUser);
    // }

    // const result = await profileModel.editProfile(newUser.user_id, 'status', 1);

    // return res.json({
    //     'status': 1,
    //     'tkn': jwt.sign({
    //         email: userInfo.email,
    //         userId: newUser.user_id,
    //         status: 1
    //     }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    // });
}

const registerGoogle = async (req, res) => {
    const { code, username, lastname, firstname } = req.body;
    // get information about user
    const userInfo = await getUserInfo(code);

    if (userInfo.error) {
        return res.status(400).json(userInfo);
    }

    // get location
    const location = getLocation();

    let errors = [];

    errors.push(await helper.validateEmail(userInfo.email));
    errors.push(await helper.validateUsername(username));
    errors.push(helper.validateName(firstname));
    errors.push(helper.validateName(lastname));

    // remove empty objects from errors
    errors = errors.filter(error => { return Object.keys(error).length != 0});

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

    // update status to 1 because user does not need to activate account
    await profileModel.editProfile(result.user_id, 'status', 1);

    // update online because user automatically logged in
    await profileModel.editProfile(result.user_id, 'online', 1);

    return res.json({
        'status': 1,
        'username': result.username,
        'tkn': jwt.sign({
            email: result.email,
            userId: result.user_id,
            status: 1
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });
}

module.exports = {
    getGoogleLink, googleLogin, registerGoogle
}
