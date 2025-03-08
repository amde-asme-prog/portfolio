import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../hooks/projectsQuery";

const ProjectModal = ({ isOpen, onClose, initialData }) => {
  const [title, setTitle] = useState("");
  const [tools, setTools] = useState([]);
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { mutate: updateProject } = useUpdateProjectMutation();
  const { mutate: addProject } = useAddProjectMutation();

  const [errors, setErrors] = useState({
    title: "",
    tools: "",
    role: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setTitle(initialData.title || "");
      setTools(
        Array.isArray(initialData.tools)
          ? initialData.tools
          : JSON.parse(initialData.tools) || []
      );
      setRole(initialData.role || "");
      setDescription(initialData.description || "");
      setDemoLink(initialData.demo_link || "");
      setGithubLink(initialData.github_link || "");
      setImagePreview(
        `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/portfolio_files/${initialData.image_path}`
      );
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Project title is required.";
    if (tools.length === 0) newErrors.tools = "At least one tool is required.";
    if (!role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const formData = {
        title,
        tools,
        role,
        description,
        demo_link: demoLink,
        github_link: githubLink,
      };
      if (initialData) {
        updateProject(
          { id: initialData.id, updatedProject: formData, newImageFile: image },
          {
            onSuccess: () => {
              handleToast(200, "Project updated successfully.");
              onClose();
            },
            onError: (error) => {
              handleToast(
                error.response?.status || 500,
                error.response?.data?.message || "Error updating project."
              );
            },
          }
        );
      } else {
        addProject(
          { project: formData, imageFile: image },
          {
            onSuccess: () => {
              handleToast(200, "Project added successfully.");
              onClose();
            },
            onError: (error) => {
              handleToast(
                error.response?.status || 500,
                error.response?.data?.message || "Error adding project."
              );
            },
          }
        );
      }
    }
  };

  const addTool = () => setTools((prevTools) => [...prevTools, ""]);

  const handleToolChange = (index, value) => {
    const updatedTools = [...tools];
    updatedTools[index] = value;
    setTools(updatedTools);
  };

  const removeTool = (index) => setTools(tools.filter((_, i) => i !== index));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm overflow-y-auto transition-colors duration-200"
    >
      <Toaster position="top-center" invert richColors />
      <DialogPanel className="relative mx-auto mt-20 w-11/12 max-w-md p-6 rounded-lg bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-200">
        <DialogTitle className="text-xl font-semibold mb-4">
          {initialData ? "Edit Project" : "Add Project"}
        </DialogTitle>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Tools *</label>
            {tools.map((tool, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tool}
                  onChange={(e) => handleToolChange(index, e.target.value)}
                  className="mt-1 flex-1 rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  placeholder={`Tool #${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTool}
              className="mt-2 text-blue-500 dark:text-blue-400 hover:underline"
            >
              Add Tool
            </button>
            {errors.tools && (
              <p className="text-red-500 text-xs mt-1">{errors.tools}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            />
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>

        {/* Demo Link */}
        <div>
          <label className="block text-sm font-medium">Demo Link</label>
          <input
            type="text"
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter project demo link"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Github Link</label>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter project github link"
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">Project Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              setImage(e.target.files[0]);
            }}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        dark:file:bg-blue-900/30 dark:file:text-blue-400
        hover:file:bg-blue-100 dark:hover:file:bg-blue-900/40
        transition-colors cursor-pointer"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image}</p>
          )}
          {image && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-xs rounded-lg shadow-md dark:shadow-gray-900/50"
            />
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-gray-300 text-gray-900 hover:bg-gray-400 transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ProjectModal;
