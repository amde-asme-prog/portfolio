import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchMessages,
  addMessage,
  updateMessage,
  deleteMessage,
} from "../api/messageApi";
import { handleToast } from "../common/handleToast";

export const useMessagesQuery = () => {
  return useQuery({
    queryKey: ["messages"], // The unique key for the query
    queryFn: fetchMessages, // The function to fetch the data
  });
};

/** Mutation Hook: Add a new message */
export const useAddMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addMessage, // The function for adding a new message
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]); // Invalidate the cache to refetch data
    },
  });
};

/** Mutation Hook: Update an existing message */
export const useUpdateMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]); // Refetch messages
    },
    onError: (error) => {
      handleToast.error("Mutation Error:", error.response?.data || error);
    },
  });
};

/** Mutation Hook: Delete an message */
export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage, // The function to delete message
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
};
