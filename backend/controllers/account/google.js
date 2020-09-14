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
const loginGoogle = (req, res) => {
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
    const token = await getAccessToken(code);
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
}

// Need to change google redirect url to client url,
// from there we will call this endpoint and send jwt back as if we are making login
// need to check if it will work with google api in that way
const google = async (req, res) => {
    const code = req.query.code;

    // check if we have code
    if (!code) {
        res.status(400).json({ 'error': 'Invalid parameters' });
    }

    // get information about user
    const userInfo = await getUserInfo(code);

    // get location
    const location = getLocation();

    // check if user already registered
    let user = await accountModel.findUserInfo('email', userInfo.email, 'user_id', 'username', 'google_id', 'status');

    if (user && user.google_id === userInfo.id) {
        // if user has account we sent token to client
        return res.json({
            'tkn': jwt.sign({
                email: userInfo.email,
                username: username,
                userId: user.user_id,
                status: user.status
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        });
    } else if (user) {
        let result = await profileModel.editProfile(user.user_id, 'google_id', userInfo.id);

        if (result.error) {
            return res.send(result);
        }

        return res.json({
            'tkn': jwt.sign({
                email: userInfo.email,
                username: username,
                userId: user.user_id,
                status: user.status
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
        });
    }
    const data = {
        email: userInfo.email,
        password: await bcrypt.hash(userInfo.id, 10),
        username: userInfo.name || userInfo.given_name || userInfo.family_name || explode("@", userInfo.email)[0],
        firstname: userInfo.given_name || null,
        lastname: userInfo.family_name || null
    }

    const newUser = await accountModel.register(data);

    if (newUser.error) {
        return res.send(newUser);
    }

    const result = await profileModel.editProfile(newUser.user_id, 'status', 1);

    if (result.error) {
        return res.send(result);
    }

    return res.json({
        'tkn': jwt.sign({
            email: newUser.email,
            username: newUser.username,
            userId: newUser.user_id,
            status: newUser.status
        }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    });
}

module.exports = {
    loginGoogle, google
}
