import axiosInstance from "./baseAPI"; // Import the Axios instance

// Function to fetch all reference icons
export const fetchReferenceIcons = async () => {
  const response = await axiosInstance.get("/reference-icons"); // Adjust the endpoint as needed
  return response.data;
};

// Function to fetch a single reference icon by ID
export const fetchReferenceIcon = async (id) => {
  const response = await axiosInstance.get(`/reference-icons/${id}`);
  return response.data;
};

// Function to create a new reference icon
export const createReferenceIcon = async (newIcon) => {
  const response = await axiosInstance.post("/reference-icons", newIcon);
  return response.data;
};

// Function to update a reference icon by ID
export const updateReferenceIcon = async ({ id, updatedIcon }) => {
  const response = await axiosInstance.put(
    `/reference-icons/${id}`,
    updatedIcon
  );
  return response.data;
};

// Function to delete a reference icon by ID
export const deleteReferenceIcon = async (id) => {
  const response = await axiosInstance.delete(`/reference-icons/${id}`);
  return response.data;
};
