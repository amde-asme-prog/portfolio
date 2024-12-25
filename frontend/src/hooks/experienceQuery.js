import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../api/experienceApi";
import { handleToast } from "../common/handleToast";

export const useExperiencesQuery = () => {
  return useQuery({
    queryKey: ["experiences"], // The unique key for the query
    queryFn: fetchExperiences, // The function to fetch the data
  });
};

/** Mutation Hook: Add a new experience */
export const useAddExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addExperience, // The function for adding a new experience
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]); // Invalidate the cache to refetch data
    },
  });
};

/** Mutation Hook: Update an existing experience */
export const useUpdateExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]); // Refetch experiences
    },
    onError: (error) => {
      handleToast.error("Mutation Error:", error.response?.data || error);
    },
  });
};

/** Mutation Hook: Delete an experience */
export const useDeleteExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience, // The function to delete experience
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};
