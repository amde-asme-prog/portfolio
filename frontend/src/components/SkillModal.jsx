import { useState, useEffect } from "react";
import { handleToast } from "../common/handleToast"; // Optional, if you're using a toast library for notifications
import { Toaster } from "sonner";
import {
  useAddSkillMutation,
  useUpdateSkillMutation,
} from "../hooks/skillsQuery";
import { Dialog, DialogPanel } from "@headlessui/react";

const SkillModal = ({ isOpen, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    proficiency: 0,
    type: "None", // Default to "None", options are "Frontend", "Backend", "Mobile", "None"
    status: "active", // Default status is "active"
    icon: "", // Assuming you may add an icon input later
  });

  const { mutate: addSkill } = useAddSkillMutation();
  const { mutate: updateSkill } = useUpdateSkillMutation();

  const [errors, setErrors] = useState({
    name: "",
    proficiency: "",
    icon: "",
  });

  // Handle initial data when modal is opened
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Skill name is required.";
    if (!formData.icon) newErrors.icon = "Skill icon is required.";
    if (formData.proficiency < 0 || formData.proficiency > 100)
      newErrors.proficiency = "Proficiency should be between 0 and 100.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // if (validateForm()) return;

    if (initialData) {
      updateSkill(
        { id: initialData.id, updatedSkill: formData },
        {
          onSuccess: () => {
            handleToast(200, "Skill updated successfully.");
            onClose();
          },
          onError: (error) => {
            handleToast(
              422,
              error.response?.data?.message || "Error updating skill."
            );
          },
        }
      );
    } else {
      addSkill(formData, {
        onSuccess: () => {
          handleToast(200, "Skill added successfully.");
          onClose();
        },
        onError: (error) => {
          handleToast(
            422,
            error.response?.data?.message || "Error adding skill."
          );
        },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="pb-20 fixed inset-0 bg-black/35 backdrop-blur-sm transition-colors duration-200 overflow-y-scroll"
    >
      <DialogPanel className="place-self-center relative top-24 bg-background_card  text-text_primary p-6 rounded-lg shadow-lg w-11/12 mx-auto  md:w-96">
        <Toaster position="top-center" invert richColors />
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Skill" : "Add New Skill"}
        </h2>
        <form>
          {/* Skill Name */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Skill Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Icon *</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
            />
            {errors.icon && (
              <p className="text-red-500 text-xs mt-1">{errors.icon}</p>
            )}
          </div>

          <div className="flex gap-8">
            <div className="mb-4">
              <label className="block rounded-lg text-sm mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-30 rounded-md px-3 py-2 border border-border_primary focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
              >
                <option value="None">None</option>
                <option value="front-end">Frontend</option>
                <option value="back-end">Backend</option>
                <option value="mobile-app">Mobile</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">{errors.type}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Proficiency */}
          <div className="mb-4">
            <label className="block text-sm mb-2">
              Proficiency : {formData.proficiency}
            </label>
            <input
              type="range"
              name="proficiency"
              value={formData.proficiency}
              onChange={handleChange}
              min={0}
              max={100}
              className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
            />
            {errors.proficiency && (
              <p className="text-red-500 text-xs mt-1">{errors.proficiency}</p>
            )}
          </div>

          {/* Skill Type */}

          <div className="flex gap-8 justify-end">
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
              className="py-2 px-4 bg-button_primary text-button_text rounded hover:bg-button_hover transition"
            >
              {initialData ? "Save Changes" : "Add Skill"}
            </button>
          </div>
        </form>
        <div className="flex justify-end space-x-4 mt-6"></div>
      </DialogPanel>
    </Dialog>
  );
};

export default SkillModal;
