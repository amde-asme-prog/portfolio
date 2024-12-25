import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaBriefcase, FaCalendarAlt, FaTasks, FaCogs } from "react-icons/fa";
import { handleToast } from "../../common/handleToast"; // Optional, if you're using a toast library for notifications.
import {
  useAddExperienceMutation,
  useUpdateExperienceMutation,
} from "../../hooks/experienceQuery";
import { Toaster } from "sonner";

const ExperienceModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [achievements, setAchievements] = useState("");

  const { mutate: updateExperience } = useUpdateExperienceMutation();
  const { mutate: addExperience } = useAddExperienceMutation();

  const [errors, setErrors] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  // Handle initial data when the modal is opened
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCompany(initialData.company);
      setStartDate(initialData.start_date);
      setEndDate(initialData.end_date);
      setResponsibilities(initialData.responsibilities || "");
      // Parse technologies and achievements correctly if they're in string format
      setTechnologies(
        initialData.technologies ? JSON.parse(initialData.technologies) : []
      );
      setAchievements(initialData.achievements || "");
    }
  }, [initialData]);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!company) newErrors.company = "Company is required.";
    if (!startDate) newErrors.startDate = "Start Date is required.";
    if (!endDate) newErrors.endDate = "End Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // if no errors, return true
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      const newExperience = {
        title,
        company,
        start_date: startDate,
        end_date: endDate,
        responsibilities: responsibilities || "",
        technologies: technologies || [],
        achievements: achievements || "",
      };

      if (initialData) {
        updateExperience(
          { id: initialData.id, updatedExperience: newExperience },
          {
            onSuccess: () => {
              handleToast(200, "Experience updated successfully.");
              onClose();
            },
            onError: (error) => {
              handleToast(
                422,
                error.response?.data?.message || "Error updating experience."
              );
            },
          }
        );
      } else {
        addExperience(newExperience, {
          onSuccess: () => {
            handleToast(200, "Experience added successfully.");
            onClose();
          },
          onError: (error) => {
            handleToast(
              422,
              error.response?.data?.message || "Error adding experience."
            );
          },
        });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed content-center inset-0 bg-black/35 backdrop-blur-sm transition-colors duration-200 overflow-y-scroll mb-4"
    >
      <Toaster position="top-center" invert richColors />
      <DialogPanel className="place-self-center relative top-24 bg-background_card  text-text_primary p-6 rounded-lg shadow-lg w-11/12 mx-auto  md:w-96">
        <DialogTitle className="text-2xl font-bold text-center mb-6 text-heading">
          Add/Edit Experience
        </DialogTitle>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <div className="flex items-center mt-1">
              <FaBriefcase className="mr-2 text-lg text-primary" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the job title"
                className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Company Input */}
          <div>
            <label className="block text-sm font-medium">Company *</label>
            <div className="flex items-center mt-1">
              <FaBriefcase className="mr-2 text-lg text-primary" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter the company name"
                className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              />
            </div>
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">{errors.company}</p>
            )}
          </div>

          {/* Start Date Input */}
          <div>
            <label className="block text-sm font-medium">Start Date *</label>
            <div className="flex items-center mt-1">
              <FaCalendarAlt className="mr-2 text-lg text-primary" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* End Date Input */}
          <div>
            <label className="block text-sm font-medium">End Date *</label>
            <div className="flex items-center mt-1">
              <FaCalendarAlt className="mr-2 text-lg text-primary" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              />
            </div>
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>

          {/* Responsibilities Textarea */}
          <div>
            <label className="block text-sm font-medium">
              Responsibilities
            </label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Enter your responsibilities"
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
            />
          </div>

          {/* Technologies Used Input */}
          <div>
            <label className="block text-sm font-medium">
              Technologies Used
            </label>
            <div className="flex items-center mt-1">
              <FaCogs className="mr-2 text-lg text-primary" />
              <input
                type="text"
                value={technologies.join(", ")} // Join the technologies array into a comma-separated string
                onChange={(e) =>
                  setTechnologies(
                    e.target.value.split(", ").map((item) => item.trim()) // Split and trim input
                  )
                }
                placeholder="Enter technologies used (comma-separated)"
                className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
              />
            </div>
          </div>

          {/* Achievements Textarea */}
          <div>
            <label className="block text-sm font-medium">Achievements</label>
            <textarea
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="Enter your achievements"
              className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
            />
          </div>
        </form>
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

export default ExperienceModal;
