import axiosInstance from "./baseAPI";

export const fetchCSRFToken = async () => {
  try {
    await axiosInstance.get("sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching CSRF token", error);
  }
};

export const fetchLandingContent = async () => {
  const response = await axiosInstance.get(`landing`);
  return response.data;
};

export const updateLandingContent = async (data) => {
  const response = await axiosInstance.post(`landing`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    validateStatus: (status) => status === 200 || status === 201,
  });
  return response.data;
};

export const downloadCv = async () => {
  const response = await axiosInstance.get(`landing/download-cv`, {
    responseType: "blob",
  });
  const blob = new Blob([response.data], { type: "application/pdf" });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "amdebirhan asmamaw.pdf";
  link.click();
  window.URL.revokeObjectURL(url);
};
