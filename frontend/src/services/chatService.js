import axios from 'axios';

const chatService = {};

chatService.postMessage = async (data) => {
    const res = await axios.post('/api/chat/message', data);
    return res.data;
};

chatService.getChats = async () => {
    const res = await axios.get('/api/chat');
    return res.data;
};

chatService.getMessages = async (chatId) => {
    const res = await axios.get(`/api/chat/${chatId}`);
    return res.data;
};

chatService.getNotifications = async () => {
    const res = await axios.get('/api/profile/notifications/all');
    return res.data;
};

chatService.getMessageNotifications = async () => {
    const res = await axios.get('/api/profile/notifications/messages');
    return res.data;
};

chatService.updateNotifications = async (type, senderId) => {
    const res = await axios.delete(`/api/profile/notifications/${type}/${senderId}`);
    return res.data;
};

export default chatService;
