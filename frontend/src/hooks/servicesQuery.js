import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchServices,
  addService,
  updateService,
  deleteService,
} from "../api/servicesApi";
import { handleToast } from "../common/handleToast";

export const useServicesQuery = () => {
  return useQuery({
    queryKey: ["services"], // The unique key for the query
    queryFn: fetchServices, // The function to fetch the data
  });
};

/** Mutation Hook: Add a new service */
export const useAddServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addService, // The function for adding a new service
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]); // Invalidate the cache to refetch data
    },
  });
};

/** Mutation Hook: Update an existing service */
export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]); // Refetch services
    },
    onError: (error) => {
      handleToast.error("Mutation Error:", error.response?.data || error);
    },
  });
};

/** Mutation Hook: Delete an service */
export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService, // The function to delete service
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });
};
