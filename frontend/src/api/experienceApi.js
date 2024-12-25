import axiosInstance from "./baseAPI";

export const fetchExperiences = async () => {
  const response = await axiosInstance.get("experiences");
  return response.data;
};

// Function to add a new experience
export const addExperience = async (newExperience) => {
  const response = await axiosInstance.post("experiences", newExperience);
  return response.data;
};

// Function to update an existing experience
export const updateExperience = async ({ id, updatedExperience }) => {
  const response = await axiosInstance.put(
    `experiences/${id}`,
    updatedExperience,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Function to delete an experience
export const deleteExperience = async (id) => {
  await axiosInstance.delete(`experiences/${id}`);
};
