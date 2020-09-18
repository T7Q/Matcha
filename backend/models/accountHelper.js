const { findUserInfo } = require('./account');

const validateEmail = async (email) => {
    let errors = {};

    if (!email) {
        errors['error'] = 'Email could not be empty';
    } else if (await findUserInfo('email', email, 'user_id')) {
        errors['error'] = 'User with this email already exists';
    } else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors['error'] = 'Invalid email';
        }
    }
    return errors;
}

const validateUsername = async (username) => {
    let errors = {};

    if (!username) {
        errors['error'] = 'Username could not be empty';
    } else if (await findUserInfo('username', username, 'user_id')) {
        errors['error'] = 'This username has already been taken';
    } else {
        const re = /^[A-Za-z0-9]{0,}$/;
        if (!re.test(username)) {
            errors['error'] = 'Username must include letters and numbers only';
        }
    }
    return errors;
}

const validateName = (name) => {
    let errors = {};

    if (!name) {
        errors['error'] = 'Name could not be empty';
    } else {
        const re = /^[A-Za-z0-9]{0,}$/;
        if (!re.test(name)) {
            errors['error'] = 'Name must include letters and numbers only';
        }
    }
    return errors;
}

const validatePassword = (password, confirmPassword) => {
    let errors = {};

    if (!password) {
        errors['error'] = 'Please enter a password';
    } else if (password.length < 6) {
        errors['error'] = 'Password must be at least 6 characters';
    } else {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

        if (!re.test(password)) {
            errors['error'] = 'Password must contain at least 1 uppercase, 1 lowercase letter and 1 number';
        }
    }

    if (!confirmPassword) {
        errors['error_confirm_pwd'] = 'Please confirm a password';
    } else if (password !== confirmPassword) {
        errors['error_confirm_pwd'] = 'Passwords do not match';
    }
    return errors;
}

module.exports = {
    validateEmail,
    validateName,
    validatePassword,
    validateUsername
}
