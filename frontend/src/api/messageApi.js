import axiosInstance from "./baseAPI";

export const fetchMessages = async () => {
  const response = await axiosInstance.get("messages");
  return response.data;
};

export const addMessage = async (message) => {
  const response = await axiosInstance.post("messages", message);
  return response.data;
};

export const updateMessage = async ({ id, updatedMessage }) => {
  const response = await axiosInstance.put(`messages/${id}`, updatedMessage);
  return response.data;
};

export const deleteMessage = async (id) => {
  await axiosInstance.delete(`messages/${id}`);
};
