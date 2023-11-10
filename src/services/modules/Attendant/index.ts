import { api } from "@/services";
const basePath = "/attendant";

export const AttendantServices = {
  getAttendantData: async (attendantId: number, token: string) => {
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
};
