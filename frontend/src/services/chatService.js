import axios from 'axios';

const postMessage = async (data) => {
    await axios.post('/chat/message', data);
};

const getChats = async () => {
    const res = await axios.get('/chat');
    return res.data;
};

const getMessages = async (chatId) => {
    const res = await axios.get(`/chat/${chatId}`);
    return res.data;
};

const getNotifications = async () => {
    const res = await axios.get('/profile/notifications/all');
    return res.data;
};

const getMessageNotifications = async () => {
    const res = await axios.get('/profile/notifications/messages');
    return res.data;
};

const updateNotifications = async (type, senderId) => {
    const res = await axios.delete(`/profile/notifications/${type}/${senderId}`);
    return res.data;
};

export default {
    postMessage,
    getChats,
    getMessages,
    getNotifications,
    getMessageNotifications,
    updateNotifications,
};
