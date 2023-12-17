import httpRequest from 'services/httpRequest';

export const uploadImage = async (data: any) => {
  return httpRequest.post('/files/upload/images', data);
};
export const deleteImage = async (filename: string) => {
  return httpRequest.delete(`/files/images/${filename}`);
};
