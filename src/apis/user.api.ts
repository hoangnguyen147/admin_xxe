import httpRequest from 'services/httpRequest';

export const getAllUser = async () => {
  return httpRequest.get('/users', {
    showSpinner: true,
  });
};
