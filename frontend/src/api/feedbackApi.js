import axiosInstance from "./baseAPI";

export const fetchFeedbacks = async () => {
  const response = await axiosInstance.get("feedbacks");
  return response.data;
};

export const addFeedback = async (feedback) => {
  const response = await axiosInstance.post("feedbacks", feedback, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateFeedback = async ({ id, updatedFeedback }) => {
  const response = await axiosInstance.put(`feedbacks/${id}`, updatedFeedback);
  return response.data;
};

export const deleteFeedback = async (id) => {
  const response = await axiosInstance.delete(`feedbacks/${id}`);
  return response.data;
};
