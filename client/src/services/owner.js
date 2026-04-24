import api from './api';

export const getOwnerDashboard = () => api.get('/owner/dashboard').then((r) => r.data);
export const getOwnerRatings = (params) => api.get('/owner/ratings', { params }).then((r) => r.data);
