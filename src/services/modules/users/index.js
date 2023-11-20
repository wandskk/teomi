import { api } from "@/services";
const basePath = "/users";
const createPath = basePath + "/create";
const updatePath = basePath + "/update";

export const UsersServices = {
  getUserData: async (body, userToken) => {
    const result = await api.post(`${basePath}/info`, body, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    return result.data;
  },
  getUserLocation: async (body, userToken) => {
    const result = await api.post(`${basePath}/location/info`, body, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    return result.data;
  },
  getTokenForgotPassword: async (body, userToken) => {
    const result = await api.post(`${basePath}/update/token/password`, body, {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });
    return result.data;
  },
  verifyTokenForgotPassword: async (token, userToken) => {
    const result = await api.patch(
      `${basePath}/update/password`,
      { token },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );
    return result.data;
  },
  userLogin: async (body, authToken) => {
    const result = await api.post(`${basePath}/login`, body, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return result;
  },
  createUser: async (body, authToken) => {
    const result = await api.put(createPath, body, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return result;
  },
  updateUser: async (body, authToken) => {
    const result = await api.patch(`${updatePath}`, body, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return result;
  },
  updateUserLocation: async (body, authToken) => {
    const result = await api.patch(`${updatePath}/location`, body, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return result;
  },
  updateUserPhoto: async (body, authToken) => {
    const result = await api.patch(`${updatePath}/userphoto`, body, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return result;
  },
};
