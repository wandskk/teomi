import { api } from "@/services";
const basePath = "/chat";

export const ChatServices = {
  getAttendant: async (token) => {
    const result = await api.get(`${basePath}/attendant/get`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  getAttendantListByCategory: async (categoryId, token) => {
    const result = await api.post(
      `${basePath}/attendant/get/category`,
      { categoryId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getCategories: async (token) => {
    const result = await api.get(`${basePath}/categories/get`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  getAllMessages: async (chatId, userId, token) => {
    const result = await api.post(
      `${basePath}/get`,
      { chatId, userId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getQuizChat: async (chatId, token) => {
    const result = await api.post(
      `${basePath}/quiz/get`,
      { chatId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getRandomAttendantChat: async (patientId, token) => {
    const result = await api.post(
      `${basePath}/attendant/random`,
      { patientId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  postUserInQueue: async (body, token) => {
    const result = await api.post(`${basePath}/queue/enter`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
};
