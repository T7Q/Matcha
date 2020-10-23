const { email, developmentUrl } = require('../config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.address,
        pass: email.password,
    },
});

// console.log(req.protocol);
// console.log(req.get('host'));

const activateAccountEmail = (recipient, userId, username, token) => {
    const link = `${developmentUrl}/account/activate?user=${userId}&token=${token}`;
    const subject = 'Matcha: account activation';
    const content = `
        <div style="font-size:16px;">
            <h2 style="color:#514099; font-family:sans-serif;">
                ${username.charAt(0).toUpperCase() + username.slice(1)}, welcome to Matcha!
            </h2>
            <p style="color:#735fc7;">
                Here is your account activation <a href="${link}">link</a>
            </p>
            <p style="color:#735fc7;"><small>Matcha team</p>
        </div>`;

    try {
        sendMail(recipient, subject, content);
        return { msg: 'Activation link has been send to your email' };
    } catch {
        return { error: 'Could not sent an email' };
    }
};

const pwdResetEmail = (recipient, userId, username, token, req) => {
    const link = `${developmentUrl}/updatePwd?user=${userId}&token=${token}`;
    const subject = 'Matcha: reset password';
    const content = `
        <div style="font-size:16px;">
            <h2 style="color:#514099; font-family:sans-serif;">
                ${username.charAt(0).toUpperCase() + username.slice(1)}, welcome to Matcha!
            </h2>
            <p style="color:#735fc7;">
                We received a password reset request. The link to reset your password is below.
                If you did not make this request, you can ignore this email.
            </p>
            <p style="color:#735fc7;">
                Here is your password reset <a href="${link}">link</a>
            </p>
            <p style="color:#735fc7;"><small>Matcha team</p>
        </div>`;

    try {
        sendMail(recipient, subject, content);
        return { msg: 'Password reset link has been sent to your email' };
    } catch {
        return { error: 'Could not sent an email' };
    }
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
