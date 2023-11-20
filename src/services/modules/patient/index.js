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
};
