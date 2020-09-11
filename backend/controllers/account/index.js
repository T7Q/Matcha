const register = require('./register');
const getAll = require('./getAll');
const login = require('./login');
const pwdReset = require('./pwdReset');
const pwdUpdate = require('./pwdUpdate');
const authRequired = require('./authRequired');
const validateData = require('./validateData');
const activate = require('./activate');

module.exports = {
    register,
    getAll,
    login,
    pwdReset,
    pwdUpdate,
    authRequired,
    validateData,
    activate
}
