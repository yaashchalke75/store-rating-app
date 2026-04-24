import api from './api';

export const login = (data) => api.post('/auth/login', data).then((r) => r.data);
export const register = (data) => api.post('/auth/register', data).then((r) => r.data);
export const changePassword = (data) => api.patch('/auth/change-password', data).then((r) => r.data);
export const logoutApi = () => api.post('/auth/logout').then((r) => r.data);
