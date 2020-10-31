import axios from 'axios';

const chatService = {};

chatService.postMessage = async (data) => {
    await axios.post('/chat/message', data);
};

chatService.getChats = async () => {
    const res = await axios.get('/chat');
    return res.data;
};

chatService.getMessages = async (chatId) => {
    const res = await axios.get(`/chat/${chatId}`);
    return res.data;
};

chatService.getNotifications = async () => {
    const res = await axios.get('/profile/notifications/all');
    return res.data;
};

chatService.getMessageNotifications = async () => {
    const res = await axios.get('/profile/notifications/messages');
    return res.data;
};

chatService.updateNotifications = async (type, senderId) => {
    const res = await axios.delete(`/profile/notifications/${type}/${senderId}`);
    return res.data;
};

export default chatService;
