import axios from 'axios';

const postMessage = async (data) => {
    await axios.post('/chat/message', data);
};

export default {
    postMessage,
};
