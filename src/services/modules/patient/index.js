import { api } from "@/services";
const basePath = "/patient";

export const PatientServices = {
  getPatientDataById: async (patientId, token) => {
    const result = await api.post(
      `${basePath}/get`,
      { patientId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
  cancelPatientSchedule: async (scheduleId, patientId, token) => {
    const result = await api.post(
      `${basePath}/schedules/cancel`,
      { scheduleId, patientId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return result.data;
  },
};
