const { email, url } = require('../config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.address,
        pass: email.password,
    },
});

const getRootUrl = (req) => {
    if (url) return url;
    return req.protocol + '://' + req.get('host');
};

const activateAccountEmail = (recipient, userId, username, token, req) => {
    const link = `${getRootUrl(req)}/account/activate?user=${userId}&token=${token}`;
    const subject = 'Matcha: account activation';
    const content = `
        <div style="font-size:14px; background: #12172d; padding-top: 20px; padding-bottom: 20px;">
             <h3 style="color: #219bf1; font-family:sans-serif; text-align: center;">
                ${username.charAt(0).toUpperCase() + username.slice(1)}, welcome to Astro Matcha!
             </h3>
            <p style="color:white; text-align: center; padding-top: 5px;">
                Here is your account activation <a style="color: #ca416e; font-weight: bold;" href="${link}">link</a>
            </p>
            <p style="color:#b5bad3; text-align: center; padding-top: 5px;"><small>Astro Matcha team</p>
        </div>`;
    sendMail(recipient, subject, content);
    return { msg: 'Activation link has been send to your email' };
};

const pwdResetEmail = (recipient, userId, username, token, req) => {
    const link = `${getRootUrl(req)}/updatePwd?user=${userId}&token=${token}`;
    const subject = 'Matcha: reset password';
    const content = `
        <div style="font-size:14px; background: #12172d; padding-top: 20px; padding-bottom: 20px;">
            <h3 style="color: #219bf1; font-family:sans-serif; text-align: center;">
                Hi, ${
                    username.charAt(0).toUpperCase() + username.slice(1)
                }! You have submitted a password change request
            </h3>
            <p style="color:white; text-align: center; padding-top: 5px;">
                If it was you, to change your Astro Match password click the link below.
            </p>
            <p style="color:white; text-align: center; padding-top: 5px;">
                <a style="color: #ca416e; font-weight: bold;" href="${link}">Reset my password</a>
            </p>
            <p style="color:#b5bad3; text-align: center; padding-top: 5px;"><small>Thank you for using Astro Matcha
            </p>
            <p style="color:#b5bad3; text-align: center; ">The Astro Matcha team
            </p>
        </div>`;

    sendMail(recipient, subject, content);
    return { msg: 'Password reset link has been sent to your email' };
};

const sendMail = (recipient, subject, content) => {
    const mailOptions = {
        from: 'matcha@no-reply.com',
        to: recipient,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions);
};

module.exports = {
    pwdResetEmail,
    activateAccountEmail,
};
