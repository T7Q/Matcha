import axios from 'axios';

const getTags = async () => {
    const res = await axios.get('profile/tags');
    return res.data;
};

export default { getTags };
