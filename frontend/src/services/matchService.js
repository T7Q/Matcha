import axios from 'axios';

const matchFilter = async (data) => {
    const res = await axios.post('/match/filter', data);
    return res.data;
};

const getMatch = async (route) => {
    const res = await axios.get(route);
    return res.data;
};

export default { matchFilter, getMatch };
