import axiosInstance from "./baseAPI";

export const fetchServices = async () => {
  const response = await axiosInstance.get("services");
  return response.data;
};

export const addService = async (service) => {
  const response = await axiosInstance.post("services", service);
  return response.data;
};

export const updateService = async ({ id, updatedService }) => {
  const response = await axiosInstance.put(`services/${id}`, updatedService);
  return response.data;
};

export const deleteService = async (id) => {
  await axiosInstance.delete(`services/${id}`);
};
