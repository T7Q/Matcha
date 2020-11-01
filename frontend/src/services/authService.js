import axios from 'axios';
const authService = {};

authService.forgetPwd = async (email) => {
    const res = await axios.post('/account/pwdReset', { email });
    return res.data;
};

authService.updatePwd = async (data) => {
    const res = await axios.post('/account/updatePwd', data);
    return res.data;
};

authService.login = async (data) => {
    const res = await axios.post('/account/login', data);
    return res.data;
};

authService.activate = async (query) => {
    const res = await axios.get(`/account/activate${query}`);
    return res.data;
};

authService.google = async (token) => {
    const res = await axios.post('/account/auth/google', { token });
    return res.data;
};

authService.auth = async () => {
    const res = await axios.get('/account/auth');
    return res.data;
};

authService.register = async (data) => {
    const res = await axios.post('/account/register', data);
    return res.data;
};

authService.logout = async () => {
    await axios.post('/account/logout');
};

export default authService;
