import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";
import { handleToast } from "../common/handleToast";

export const useProjectsQuery = () => {
  return useQuery({
    queryKey: ["projects"], // The unique key for the query
    queryFn: fetchProjects, // The function to fetch the data
  });
};

/** Mutation Hook: Add a new project */
export const useAddProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProject, // The function for adding a new project
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // Invalidate the cache to refetch data
    },
  });
};

/** Mutation Hook: Update an existing project */
export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]); // Refetch projects
    },
    onError: (error) => {
      handleToast.error("Mutation Error:", error.response?.data || error);
    },
  });
};

/** Mutation Hook: Delete an project */
export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject, // The function to delete project
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });
};
