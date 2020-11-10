import axios from 'axios';
const authService = {};

authService.forgetPwd = async (email) => {
    const res = await axios.post('/api/account/pwdReset', { email });
    return res.data;
};

authService.updatePwd = async (data) => {
    const res = await axios.post('/api/account/updatePwd', data);
    return res.data;
};

authService.login = async (data) => {
    const res = await axios.post('/api/account/login', data);
    return res.data;
};

authService.activate = async (query) => {
    const res = await axios.get(`/api/account/activate${query}`);
    return res.data;
};

authService.google = async (token) => {
    const res = await axios.post('/api/account/auth/google', { token });
    return res.data;
};

authService.auth = async () => {
    const res = await axios.get('/api/account/auth');
    return res.data;
};

authService.register = async (data) => {
    const res = await axios.post('/api/account/register', data);
    return res.data;
};

authService.logout = async () => {
    await axios.post('/api/account/logout');
};

export default authService;
