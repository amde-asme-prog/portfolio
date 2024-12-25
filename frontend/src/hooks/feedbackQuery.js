import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addFeedback,
  deleteFeedback,
  fetchFeedbacks,
  updateFeedback,
} from "../api/feedbackApi";
import { handleToast } from "../common/handleToast";

export const useFeedbacksQuery = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });
};

export const useAddFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      handleToast.success(200, "Feedback added successfully.");
    },
    onError: () => {
      handleToast.error(400, "couldn't add feedback.");
    },
  });
};

export const useUpdateFeedbackMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      handleToast.success(200, "Feedback updated successfully.");
    },
    onError: () => {
      handleToast.error(400, "couldn't update feedback.");
    },
  });
};

export const useDeleteFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      handleToast.success(200, "Feedback deleted successfully.");
    },
    onError: () => {
      handleToast.error(400, "Couldn't delete feedback.");
    },
  });
};
