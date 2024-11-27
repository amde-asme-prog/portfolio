import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { handleToast } from "../common/handleToast"; // Optional, if you're using a toast library for notifications.
import { Toaster } from "sonner"; // Optional, if you're using a toast library.
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../hooks/projectsQuery";

const ProjectModal = ({ isOpen, onClose, initialData }) => {
  const [title, setTitle] = useState("");
  const [tools, setTools] = useState([]); // Now handling tools as an array directly
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [image, setImage] = useState(null); // To handle image file
  const [status, setStatus] = useState(false); // To handle project status

  const { mutate: updateProject } = useUpdateProjectMutation();
  const { mutate: addProject } = useAddProjectMutation();

  const [errors, setErrors] = useState({
    title: "",
    tools: "",
    role: "",
  });

  // Handle initial data when the modal is opened
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTools(JSON.parse(initialData.tools) || []); // Ensure tools are an array
      setRole(initialData.role || "");
      setDescription(initialData.description || "");
      setDemoLink(initialData.demo_link || ""); // Using demo_link
      setGithubLink(initialData.github_link || "");
      setImage(initialData.image_path || null); // Set the image path if available
      setStatus(initialData.status || false); // Set the project status
    }
  }, [initialData]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Project title is required.";
    if (tools.length === 0) newErrors.tools = "At least one tool is required.";
    if (!role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // if no errors, return true
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      console.log("Submitting form with image:", image);

      const formData = {
        title,
        tools: tools,
        role,
        description,
        image_path: image,
        demo_link: demoLink,
        github_link: githubLink,
        status,
      };

      if (initialData) {
        updateProject(
          { id: initialData.id, updatedProject: formData },
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
        // Update project
      } else {
        addProject(formData, {
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
        });
      }
    }
  };

  // Add a tool to the tools array
  const addTool = () => {
    setTools((prevTools) => [...prevTools, ""]); // Adds an empty string to the tools list
  };

  // Update a specific tool
  const handleToolChange = (index, value) => {
    const updatedTools = [...tools];
    updatedTools[index] = value; // Update tool at specific index
    setTools(updatedTools);
  };

  // Remove a tool
  const removeTool = (index) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed content-center inset-0 bg-black/35 backdrop-blur-sm transition-colors duration-200 overflow-y-scroll mt-10 mb-4"
    >
      <Toaster position="top-center" invert richColors />
      <DialogPanel className="place-self-center relative top-24 bg-background_card  text-text_primary p-6 rounded-lg shadow-lg w-11/12 mx-auto  md:w-96">
        <DialogTitle className="text-xl font-bold mb-4">
          {initialData ? "Edit Project" : "Add Project"}
        </DialogTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Tools */}
          <div>
            <label className="block text-sm font-medium">Tools *</label>
            {tools &&
              tools.map((tool, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tool}
                    onChange={(e) => handleToolChange(index, e.target.value)}
                    className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
                    placeholder={`Tool #${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={addTool}
              className="text-blue-500 mt-2"
            >
              Add Tool
            </button>
            {errors.tools && (
              <p className="text-red-500 text-xs mt-1">{errors.tools}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
            />
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
            />
          </div>

          {/* Demo Link */}
          <div>
            <label className="block text-sm font-medium">Demo Link</label>
            <input
              type="text"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              placeholder="Enter project demo link"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Github Link</label>
            <input
              type="text"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              placeholder="Enter project github link"
            />
          </div>

          {/* Image Upload */}

          <div className="space-y-4">
            <label className="block text-sm font-medium">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                console.log(e.target.files[0]);
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
            {image && (
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Preview"
                className="max-w-xs rounded-lg shadow-md dark:shadow-gray-900/50"
              />
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="mt-1"
            />
            <span className="ml-2">Active</span>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-button_primary text-white px-6 py-3 rounded-lg hover:bg-button_hover transition"
          >
            Save
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ProjectModal;
