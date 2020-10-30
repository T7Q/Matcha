import axios from 'axios';

const forgetPwd = async (email) => {
    const res = await axios.post('/account/pwdReset', { email });
    return res.data;
};

const updatePwd = async (data) => {
    const res = await axios.post('/account/updatePwd', data);
    return res.data;
};

const login = async (data) => {
    const res = await axios.post('/account/login', data);
    return res.data;
};

const activate = async (query) => {
    const res = await axios.get(`/account/activate${query}`);
    return res.data;
};

const google = async (token) => {
    const res = await axios.post('/account/auth/google', { token });
    return res.data;
};

const auth = async () => {
    const res = await axios.get('/account/auth');
    return res.data;
};

const register = async (data) => {
    const res = await axios.post('/account/register', data);
    return res.data;
};

const logout = async () => {
    await axios.post('/account/logout');
};

export default { forgetPwd, updatePwd, login, activate, google, auth, register, logout };
