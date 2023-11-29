import { api } from "@/services";
const basePath = "/attendant";

export const AttendantServices = {
  createAttendant: async (data, token) => {
    return await api.put(`${basePath}/users/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateAttendantData: async (data, token) => {
    return await api.patch(`${basePath}/users/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAttendantData: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getQueueList: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/queue/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getQueueListWithScheduled: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/queue/scheduled/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getPendingSchedules: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/schedules/pending/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getConfirmedSchedules: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/schedules/confirmed/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getQtdHomeAttendantSchedules: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/schedules/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getAttendantStatus: async (attendantId, token) => {
    const result = await api.post(
      `${basePath}/status/get`,
      { attendantId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  changeAttendantStatus: async (attendantId, status, token) => {
    const result = await api.post(
      `${basePath}/status`,
      { attendantId, status },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  acceptPendingSchedule: async (body, token) => {
    const result = await api.post(`${basePath}/schedules/accept`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  acceptChat: async (body, token) => {
    const result = await api.post(`${basePath}/queue/accept`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  updateScheduleMeetLink: async (scheduleId, meetUrl, token) => {
    const result = await api.patch(
      `${basePath}/schedules/meet/update`,
      { scheduleId, meetUrl },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
};
