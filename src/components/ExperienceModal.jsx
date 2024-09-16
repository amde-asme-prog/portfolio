import React, { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaBriefcase, FaCalendarAlt, FaTasks, FaCogs } from "react-icons/fa";
import ModalContainer from "./ModalContainer";

const ExperienceModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [responsibilities, setResponsibilities] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCompany(initialData.company);
      setDuration(initialData.duration);
      setResponsibilities(initialData.responsibilities);
      setTechnologies(initialData.technologies);
      setAchievements(initialData.achievements);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newExperience = {
      title,
      company,
      duration,
      responsibilities,
      technologies,
      achievements,
    };
    onSubmit(newExperience);
    onClose();
  };

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <DialogTitle className="text-xl font-bold mb-4">
        Add/Edit Experience
      </DialogTitle>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Responsibilities</label>
          <textarea
            value={responsibilities.join("\n")}
            onChange={(e) => setResponsibilities(e.target.value.split("\n"))}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Technologies Used</label>
          <input
            type="text"
            value={technologies.join(", ")}
            onChange={(e) => setTechnologies(e.target.value.split(", "))}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Achievements</label>
          <textarea
            value={achievements.join("\n")}
            onChange={(e) => setAchievements(e.target.value.split("\n"))}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
      </form>
    </ModalContainer>
  );
};

export default ExperienceModal;
