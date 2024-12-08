import axiosInstance from "./baseAPI";

export const fetchSkills = async () => {
  const response = await axiosInstance.get("skills");
  return response.data;
};

export const addSkill = async (skill) => {
  const response = await axiosInstance.post("skills", skill);
  return response.data;
};

export const updateSkill = async ({ id, updatedSkill }) => {
  const response = await axiosInstance.put(`skills/${id}`, updatedSkill);
  return response.data;
};

export const deleteSkill = async (id) => {
  await axiosInstance.delete(`skills/${id}`);
};
