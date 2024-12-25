import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../api/skillsApi";
import { handleToast } from "../common/handleToast";

export const useSkillsQuery = () => {
  return useQuery({
    queryKey: ["skills"], // The unique key for the query
    queryFn: fetchSkills, // The function to fetch the data
  });
};

/** Mutation Hook: Add a new skill */
export const useAddSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSkill, // The function for adding a new skill
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]); // Invalidate the cache to refetch data
    },
  });
};

/** Mutation Hook: Update an existing skill */
export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]); // Refetch skills
    },
    onError: (error) => {
      handleToast.error("Mutation Error:", error.response?.data || error);
    },
  });
};

/** Mutation Hook: Delete an skill */
export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill, // The function to delete skill
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]);
    },
  });
};
