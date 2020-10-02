import axios from 'axios';

const setAuthToken = token => {
    // console.log('in auth token');
    if (token) {
        // console.log('token ok');
        axios.defaults.headers.authorization = 'JWT ' + token;
    } else {
        delete axios.defaults.headers.authorization;
    }
};

export default setAuthToken;
