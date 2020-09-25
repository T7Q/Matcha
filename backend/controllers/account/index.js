const register = require('./register');
const getAll = require('./getAll');
const login = require('./login');
const pwdReset = require('./pwdReset');
const pwdUpdate = require('./pwdUpdate');
const validateData = require('./validateData');
const activate = require('./activate');
const logout = require('./logout');
const auth = require('./auth');
const { getGoogleLink, googleLogin, registerGoogle } = require('./google');

module.exports = {
    auth,
    register,
    getAll,
    login,
    pwdReset,
    pwdUpdate,
    validateData,
    activate,
    googleLogin,
    logout,
    getGoogleLink,
    registerGoogle,
};
