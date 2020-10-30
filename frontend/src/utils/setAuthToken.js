import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.authorization = 'JWT ' + token;
    } else {
        delete axios.defaults.headers.authorization;
    }
};

export default setAuthToken;
