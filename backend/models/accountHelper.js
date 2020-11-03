const bcrypt = require('bcrypt');
const { findUserInfo } = require('./account');

const validateEmail = async (email) => {
    let errors = {};

    if (!email) {
        errors['emailError'] = 'Required field';
    } else if (await findUserInfo('email', email, 'user_id')) {
        errors['emailError'] = 'User with this email already exists';
    } else if (email.length > 63) {
        errors['emailError'] = 'Email is too long';
    } else {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            errors['emailError'] = 'Invalid email';
        }
    }
    return errors;
};

const validateUsername = async (username) => {
    let errors = {};

    if (!username) {
        errors['usernameError'] = 'Required field';
    } else if (await findUserInfo('username', username, 'user_id')) {
        errors['usernameError'] = 'This username has already been taken';
    } else if (username.length >= 30) {
        errors['usernameError'] = 'Username is too long';
    } else {
        const re = /^[A-Za-z0-9]{0,}$/;
        if (!re.test(username)) {
            errors['usernameError'] = 'Username must include letters and numbers only';
        }
    }
    return errors;
};

const validateName = (name) => {
    let errors = {};

    if (!name) {
        errors['firstnameError'] = 'Required field';
    } else if (name.length >= 30) {
        errors['firstnameError'] = 'Name is too long';
    } else {
        const re = /^[A-Za-z0-9]{0,}$/;
        if (!re.test(name)) {
            errors['firstnameError'] = 'Name must include letters and numbers only';
        }
    }
    return errors;
};

const validatePassword = (password, confirmPassword) => {
    let errors = {};

    if (!password) {
        errors['passwordError'] = 'Required field';
    } else if (password.length < 6) {
        errors['passwordError'] = 'Password must be at least 6 characters';
    } else {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

        if (!re.test(password)) {
            errors['passwordError'] =
                'Password must contain at least 1 uppercase, 1 lowercase letter and 1 number';
        }
    }

    if (!confirmPassword) {
        errors['confirmPasswordError'] = 'Required field';
    } else if (password !== confirmPassword) {
        errors['confirmPasswordError'] = 'Passwords do not match';
    }
    return errors;
};

const checkPassword = async (userId, password, username = null) => {
    let user;
    if (userId) {
        user = await findUserInfo('user_id', userId, 'password');
    } else {
        user = await findUserInfo('username', username, 'password');
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return false;
    }
    return true;
};

module.exports = {
    validateEmail,
    validateName,
    validatePassword,
    validateUsername,
    checkPassword,
};
