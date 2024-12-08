import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  downloadCv,
  fetchLandingContent,
  updateLandingContent,
} from "../api/landingContentAPI";

export const useLandingContent = () => {
  return useQuery({
    queryKey: ["landingContent"],
    queryFn: fetchLandingContent,
    keepPreviousData: true,
    networkMode: "offlineFirst",
  });
};

export const useUpdateLandingContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLandingContent,
    onSuccess: () => {
      queryClient.invalidateQueries(["landingContent"]);
    },
  });
};

export const useDownloadCv = () => {
  return useQuery({
    queryKey: ["download-cv"],
    queryFn: downloadCv,
    enabled: false,
  });
};