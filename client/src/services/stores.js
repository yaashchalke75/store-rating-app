import api from './api';

export const listStores = (params) => api.get('/stores', { params }).then((r) => r.data);
export const submitRating = (storeId, rating) =>
  api.post('/ratings', { storeId, rating }).then((r) => r.data);
export const updateRating = (storeId, rating) =>
  api.patch(`/ratings/${storeId}`, { rating }).then((r) => r.data);
