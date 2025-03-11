import { supabase } from "../config/supabaseConfig";

export const getAboutData = async () => {
  const response = await supabase.from("about").select("*").single();
  return response.data;
};

export const updateAboutData = async (data) => {
  const response = await supabase.from("about").update(data).eq("id", 1); // Ensure this matches your row ID

  return response.data;
};

export const uploadFile = async ({ file }) => {
  if (!file) return null;

  // Delete the previous file if it exists
  const { data, error } = await supabase
    .from("about")
    .select("image_path")
    .single();

  if (!error && data.image_path) await deleteFile(data.image_path); // Fix field name

  // Generate a unique file path for the uploaded file
  const filePath = `about/${file.name}`;

  const response = await supabase.storage
    .from("portfolio_files")
    .upload(filePath, file);

  if (response.error) {
    return null;
  }

  // Update the `image_path` in `about` table
  await supabase.from("about").update({ image_path: filePath }).eq("id", 1);

  return response.data;
};

export const deleteFile = async (filePath) => {
  if (!filePath || filePath.trim() === "") return null; // Fix condition

  const { data, error } = await supabase.storage
    .from("portfolio_files")
    .remove([filePath]); // Fix: should be an array

  if (error) {
    return null;
  }

  return data;
};
