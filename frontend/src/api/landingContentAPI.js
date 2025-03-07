// ==============================================================================
import { supabase } from "../config/supabaseConfig";
export const fetchLandingContent = async () => {
  const response = await supabase.from("landing").select("*").single();
  return response.data;
};

export const updateLandingContent = async (data) => {
  const response = await supabase
    .from("landing")
    .update(data)
    .eq("id", "5c389ee8-c493-467b-9729-effb78c00a01"); // Ensure this matches your row ID
  return response.data;
};

export const uploadFile = async ({ file, type }) => {
  if (!file) return null;

  // Delete the previous file if it exists
  if (type === "cv") {
    const { data, error } = await supabase
      .from("landing")
      .select("cv_path")
      .single();

    if (!error && data.cv_path) await deleteFile(data.cv_path);
  } else if (type === "image") {
    const { data, error } = await supabase
      .from("landing")
      .select("image_path")
      .single();
    if (!error && data.image_path) await deleteFile(data.image_path);
  }

  // Generate a unique file path for the uploaded file
  const filePath = `${type}/${file.name}`;

  const response = await supabase.storage
    .from("portfolio_files")
    .upload(filePath, file);

  return response.data;
};

export const deleteFile = async (filePath) => {
  if (!filePath || filePath.trim() == "") return null;
  const response = await supabase.storage
    .from("portfolio_files")
    .remove(filePath);
  return response.data;
};

export const downloadCv = async () => {
  const { data, error } = await supabase
    .from("landing")
    .select("cv_path")
    .single();

  if (error) throw new Error("Failed to fetch CV path");

  const response = await supabase.storage
    .from("portfolio_files")
    .download(data.cv_path);

  if (!response.data) throw new Error("Failed to download CV");

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "amdebirhan_asmamaw.pdf";
  document.body.appendChild(link); // Append to DOM to avoid some browser security issues
  link.click();
  document.body.removeChild(link); // Remove from DOM after click
  URL.revokeObjectURL(url);
};
