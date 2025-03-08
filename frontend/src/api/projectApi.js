import { supabase } from "../config/supabaseConfig";
export const fetchProjects = async () => {
  const response = await supabase.from("projects").select("*");
  return response.data;
};

// Add new project (with optional image upload)
export const addProject = async ({ project, imageFile }) => {
  try {
    let imagePath = null;

    // Upload image if provided
    if (imageFile) {
      imagePath = await uploadImage(imageFile);
    }

    // Insert project into Supabase
    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...project, image_path: imagePath }]);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

// Update existing project (replace image if a new one is uploaded)
export const updateProject = async ({ id, updatedProject, newImageFile }) => {
  try {
    let imagePath = updatedProject.image_path;

    // Fetch existing project to check for an existing image
    const { data: existingProject } = await supabase
      .from("projects")
      .select("image_path")
      .eq("id", id)
      .single();

    // If a new image is uploaded, delete the old one and upload the new one
    if (newImageFile) {
      if (existingProject?.image_path) {
        await deleteImage(existingProject.image_path);
      }
      imagePath = await uploadImage(newImageFile);
    }

    // Update project in Supabase
    const { data, error } = await supabase
      .from("projects")
      .update({ ...updatedProject, image_path: imagePath })
      .eq("id", id);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete project (including its associated image)
export const deleteProject = async (id) => {
  try {
    // Fetch project to get image path before deleting
    const { data: project } = await supabase
      .from("projects")
      .select("image_path")
      .eq("id", id)
      .single();

    // Delete the project from Supabase
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw new Error(error.message);

    // If project had an image, delete it from storage
    if (project?.image_path) {
      await deleteImage(project.image_path);
    }

    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

//=================================
// Upload image to Supabase storage
const uploadImage = async (file) => {
  if (!file) return null;
  const fileName = `projects/${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("portfolio_files") // Storage bucket name
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) throw new Error("Image upload failed: " + error.message);
  return data.path; // Return stored image path
};

// Delete an existing image from Supabase storage
const deleteImage = async (imagePath) => {
  if (!imagePath) return;
  await supabase.storage.from("portfolio_files").remove([imagePath]);
};
