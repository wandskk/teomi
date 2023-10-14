import { api } from '@/services';
const basePath = '/auth';

export const AuthServices = {
  getAuthToken: async (token) => {
    const result = await api.post(`${basePath}`, null, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return result.data
  },
};
