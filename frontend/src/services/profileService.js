import axios from 'axios';

const profileService = {};

profileService.getMyProfile = async () => {
    const res = await axios.get('/api/profile/me');
    return res;
};

profileService.getUserProfile = async (userId) => {
    const res = await axios.get(`/api/profile/user/${userId}`);
    return res;
};

profileService.deleteProfile = async () => {
    const res = await axios.post('/api/profile/delete/', {});
    return res;
};

profileService.editProfile = async (data) => {
    const res = await axios.post('/api/profile/edit/', data);
    return res.data;
};

profileService.create = async (data) => {
    const res = await axios.post('/api/profile/create', data);
    return res.data;
};

profileService.editTags = async (data) => {
    const res = await axios.post('/api/profile/editTags', data);
    return res.data;
};

profileService.checkConnection = async (toUserId) => {
    const res = await axios.post(`/api/profile/connected/${toUserId}`, {});
    return res;
};

profileService.addLike = async (toUserId) => {
    await axios.post(`/api/profile/addinteraction/likes/${toUserId}`, {});
};

profileService.removeLike = async (toUserId) => {
    await axios.post(`/api/profile/removeinteraction/likes/${toUserId}`, {});
};

profileService.addInteraction = async (type, toUserId) => {
    const res = await axios.post(`/api/profile/addinteraction/${type}/${toUserId}`, {});
    return res;
};

profileService.unblockUser = async (userId) => {
    const res = axios.post(`/api/profile/removeinteraction/blocked/${userId}`, {});
    return res;
};

profileService.getTags = async () => {
    const res = await axios.get('/api/profile/tags');
    return res.data;
};

profileService.getBlockedUsers = async () => {
    const res = await axios.get('/api/profile/blockedUsers');
    return res.data;
};

profileService.getUserTags = async () => {
    const res = await axios.get('/api/profile/me/tags');
    return res.data;
};

profileService.uploadPhotos = async (data) => {
    const res = await axios.post('/api/profile/uploadphoto', data);
    return res.data;
};

profileService.visit = async (userId) => {
    await axios.get(`/api/profile/visit/${userId}`);
};

export default profileService;
