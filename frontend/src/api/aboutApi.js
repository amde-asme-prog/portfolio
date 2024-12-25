import axiosInstance from "./baseAPI";

export const getAboutData = async () => {
  const response = await axiosInstance.get("/about");
  return response.data;
};

export const updateAboutData = async (data) => {
  const response = await axiosInstance.post("/about", data, {
    headers: { "Content-Type": "multipart/form-data" },
    validateStatus: (status) => status === 200 || status === 201,
  });
  return response.data;
};
