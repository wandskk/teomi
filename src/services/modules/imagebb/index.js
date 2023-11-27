import { apiImageBB, API_IMAGEBB_CLIENT_API_KEY as apiKey } from "@/services";
const basePath = "/upload";

export const ImageBBServices = {
  uploadImage: async (formData) => {
    const result = await apiImageBB.post(`${basePath}`, formData, {
      params: {
        key: apiKey
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return result.data;
  },
};
