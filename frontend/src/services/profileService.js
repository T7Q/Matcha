import axios from 'axios';

const profileService = {};

profileService.getMyProfile = async () => {
    const res = await axios.get('/profile/me');
    return res;
};

profileService.getUserProfile = async (userId) => {
    const res = await axios.get(`/profile/user/${userId}`);
    return res;
};

profileService.deleteProfile = async () => {
    const res = await axios.post('/profile/delete/', {});
    return res;
};

profileService.editProfile = async (data) => {
    const res = await axios.post('/profile/edit/', data);
    return res.data;
};

profileService.create = async (data) => {
    const res = await axios.post('/profile/create', data);
    return res.data;
};

profileService.editTags = async (data) => {
    const res = await axios.post('/profile/editTags', data);
    return res.data;
};

profileService.checkConnection = async (toUserId) => {
    const res = await axios.post(`/profile/connected/${toUserId}`, {});
    return res;
};

profileService.addLike = async (toUserId) => {
    await axios.post(`/profile/addinteraction/likes/${toUserId}`, {});
};

profileService.removeLike = async (toUserId) => {
    await axios.post(`/profile/removeinteraction/likes/${toUserId}`, {});
};

profileService.addInteraction = async (type, toUserId) => {
    const res = await axios.post(`/profile/addinteraction/${type}/${toUserId}`, {});
    return res;
};

profileService.unblockUser = async (userId) => {
    const res = axios.post(`/profile/removeinteraction/blocked/${userId}`, {});
    return res;
};

profileService.getTags = async () => {
    const res = await axios.get('/profile/tags');
    return res.data;
};

profileService.getBlockedUsers = async () => {
    const res = await axios.get('/profile/blockedUsers');
    return res.data;
};

profileService.getUserTags = async () => {
    const res = await axios.get('/profile/me/tags');
    return res.data;
};

profileService.uploadPhotos = async (data) => {
    const res = await axios.post('/profile/uploadphoto', data);
    return res.data;
};

profileService.visit = async (userId) => {
    await axios.get(`/profile/visit/${userId}`);
};

export default profileService;
