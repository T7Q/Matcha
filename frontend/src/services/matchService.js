import axios from 'axios';

const matchService = {};

matchService.matchFilter = async (data) => {
    const res = await axios.post('/match/filter', data);
    return res.data;
};

matchService.getMatch = async (route) => {
    const res = await axios.get(route);
    return res.data;
};

export default matchService;
