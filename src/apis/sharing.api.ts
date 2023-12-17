import httpRequest from 'services/httpRequest';
import { ISharingPostState } from 'models/ISharingPostState';

export const getAllSharing = async () => {
  return httpRequest.get('/shares/admin-get?take=50');
};

export const updateSharing = async (data: ISharingPostState) => {
  return httpRequest.put(`/shares/update-share/${data.id}`, data);
};

export const createSharing = async (data: ISharingPostState) => {
  return httpRequest.post('/shares', data);
};

export const deleteSharing = async (id: string) => {
  return httpRequest.delete(`/shares/${id}`);
};

export const changeTogglePublicSharing = async (id: string) => {
  return httpRequest.put(`/shares/toggle-public/${id}`, {});
};
