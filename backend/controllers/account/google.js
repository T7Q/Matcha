const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const accountModel = require('../../models/account');
const { google, jwtSecret } = require('../../config');
const { getLocation } = require('../../utils/location');
const client = new OAuth2Client(google.id);

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: google.id,
    });
    const payload = ticket.getPayload();
    return payload;
}

const googleLogin = async (req, res) => {
    const token = req.body.token;
    const userInfo = await verify(token).catch();
    const user = await accountModel.findUserInfo('email', userInfo.email, 'user_id', 'status');

    if (!user) {
        return registerGoogle(userInfo, req, res);
    }

    const location = await getLocation(req, user);
    await accountModel.updateAccount(user.user_id, { ...location, online: 1 });

    return res.json({
        user: { status: user.status, userId: user.user_id },
        tkn: jwt.sign({ userId: user.user_id, status: user.status }, jwtSecret, {
            expiresIn: 1000 * 60 * 60,
        }),
    });
};

const len = (word) => {
    if (!word) return null;
    return word.length > 30 ? word.substring(0, 30).toLowerCase() : word.toLowerCase();
};

const registerGoogle = async (info, req, res) => {
    const data = {
        email: info.email,
        password: await bcrypt.hash(info.sub, 10),
        username: len(info.name) || len(info.given_name) || len(info.email.split('@')[0]),
        firstname: len(info.given_name) || len(info.email.split('@')[0]),
        lastname: len(info.family_name) || len(info.email.split('@')[0]),
    };

    const result = await accountModel.register(data);
    const location = await getLocation(req, result);

    // set status, online and location
    await accountModel.updateAccount(result.user_id, { ...location, online: 1, status: 1 });

    return res.json({
        user: { status: 1, userId: result.user_id },
        tkn: jwt.sign({ userId: result.user_id, status: 1 }, jwtSecret, {
            expiresIn: 1000 * 60 * 60,
        }),
    });
};

module.exports = {
    googleLogin,
    registerGoogle,
};
