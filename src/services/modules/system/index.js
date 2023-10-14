import { api } from '@/services';
const basePath = '/system';

export const SystemServices = {
  getAddressByPostalCode: async (postalCode, tokenAuth) => {
    const result = await api.get(`${basePath}/cep/${postalCode}`, {
      headers: {
        Authorization: 'Bearer ' + tokenAuth,
      },
    });
    return result;
  },
  getCityIdByName: async (city, tokenAuth) => {
    const result = await api.get(`${basePath}/city/name/${city}`, {
      headers: {
        Authorization: 'Bearer ' + tokenAuth,
      },
    });
    return result;
  },
  getStateIdByName: async (state, tokenAuth) => {
    const result = await api.get(`${basePath}/state/name/${state}`, {
      headers: {
        Authorization: 'Bearer ' + tokenAuth,
      },
    });
    return result;
  },
  verifyEmailExist: async (email, tokenAuth) => {
    const result = await api.post(
      `${basePath}/verify/email`,
      { email },
      {
        headers: {
          Authorization: 'Bearer ' + tokenAuth,
        },
      }
    );
    return result;
  },
};
