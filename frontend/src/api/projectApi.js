import axiosInstance from "./baseAPI";

// export const fetchCSRFToken = async () => {
//   try {
//     await axiosInstance.get("sanctum/csrf-cookie", {
//       withCredentials: true,
//     });
//   } catch (error) {
//     console.error("Error fetching CSRF token", error);
//   }
// };

export const fetchProjects = async () => {
  const response = await axiosInstance.get("projects");
  return response.data;
};

export const addProject = async (project) => {
  console.log("project", project);
  const response = await axiosInstance.post("projects", project);
  return response.data;
};

export const updateProject = async ({ id, updatedProject }) => {
  console.log("updatedProject", updatedProject);
  const response = await axiosInstance.put(`projects/${id}`, updatedProject, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", response);
  return response.data;
};

export const deleteProject = async (id) => {
  await axiosInstance.delete(`projects/${id}`);
};
