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

export default { forgetPwd, updatePwd, login, activate };
