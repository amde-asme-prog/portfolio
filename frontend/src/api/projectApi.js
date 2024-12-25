import axiosInstance from "./baseAPI";

export const fetchProjects = async () => {
  const response = await axiosInstance.get("projects");
  return response.data;
};

export const addProject = async (project) => {
  const response = await axiosInstance.post("projects", project);
  return response.data;
};

export const updateProject = async ({ id, updatedProject }) => {
  const response = await axiosInstance.put(`projects/${id}`, updatedProject, {
    headers: { "Content-Type": "multipart/form-data" },
    validateStatus: (status) => status === 200 || status === 201,
  });
  return response.data;
};

export const deleteProject = async (id) => {
  await axiosInstance.delete(`projects/${id}`);
};
