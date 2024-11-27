import axiosInstance from "./baseAPI";

export const fetchSkills = async () => {
  const response = await axiosInstance.get("skills");
  console.log("skills response", response);
  return response.data;
};

export const addSkill = async (skill) => {
  console.log("skill", skill);
  console.log("adding skill");
  const response = await axiosInstance.post("skills", skill);
  return response.data;
};

export const updateSkill = async ({ id, updatedSkill }) => {
  console.log("updating skill", id, updatedSkill);
  const response = await axiosInstance.put(`skills/${id}`, updatedSkill);
  return response.data;
};

export const deleteSkill = async (id) => {
  await axiosInstance.delete(`skills/${id}`);
};
