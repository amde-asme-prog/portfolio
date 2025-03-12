import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutData, updateAboutData, uploadFile } from "../api/aboutApi";

export const useAboutQuery = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: getAboutData,
  });
};

export const useUpdateAboutQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAboutData,
    onSuccess: () => queryClient.invalidateQueries(["about"]),
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};
