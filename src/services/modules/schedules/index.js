import { api } from "@/services";
const basePath = "/schedules";

export const SchedulesServices = {
  getSchedulesLocationsByPostalCode: async (postalCode, token) => {
    const result = await api.post(
      `${basePath}/location/get`,
      { postalCode },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getSchedulesByDate: async (date, token) => {
    const result = await api.post(
      `${basePath}/date/get`,
      { date },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getAttendantByTimeAndDate: async (date, startTime, token) => {
    const result = await api.post(
      `${basePath}/professional/get`,
      { date, startTime },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  getPatientSchedulesByData: async (body, token) => {
    const result = await api.post(`${basePath}/patient/verify`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  getPatientSchedulesById: async (body, token) => {
    const result = await api.post(`${basePath}/patient/get`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
  getLocationsByName: async (locationName, token) => {
    const result = await api.post(
      `${basePath}/location/name/get`,
      { locationName },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  createSchedule: async (body, token) => {
    const result = await api.post(`${basePath}/create`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return result.data;
  },
};
