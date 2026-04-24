import api from './api';

export const getDashboard = () => api.get('/admin/dashboard').then((r) => r.data);
export const getUsers = (params) => api.get('/admin/users', { params }).then((r) => r.data);
export const getUser = (id) => api.get(`/admin/users/${id}`).then((r) => r.data);
export const createUser = (data) => api.post('/admin/users', data).then((r) => r.data);
export const getStores = (params) => api.get('/admin/stores', { params }).then((r) => r.data);
export const createStore = (data) => api.post('/admin/stores', data).then((r) => r.data);
