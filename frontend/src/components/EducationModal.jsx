import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ModalContainer from "./ModalContainer";

const EducationModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  //! closing the modal when clicking outside of the modal

  const [title, setTitle] = useState("");
  const [institute, setInstitute] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [courses, setCourses] = useState("");
  const [achievements, setAchievements] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setInstitute(initialData.institute);
      setStartYear(initialData.startYear);
      setEndYear(initialData.endYear);
      setCourses(initialData.courses);
      setAchievements(initialData.achievements);
    }
  }, [initialData]);

  const handleSubmit = () => {
    const newEducation = {
      title,
      institute,
      startYear,
      endYear,
      courses,
      achievements,
    };
    onSubmit(newEducation);
    onClose();
  };

  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <DialogTitle className="text-xl font-bold mb-4">
        Add/Edit Education
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
          <label className="block text-sm font-medium">Institute</label>
          <input
            type="text"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Start Year</label>
          <input
            type="date"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Year</label>
          <input
            type="date"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Courses</label>
          <textarea
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Achievements</label>
          <textarea
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            className="mt-1 block w-full border border-input_border_color rounded-md p-2 bg-input_background_color text-input_text_color"
          />
        </div>
      </form>
    </ModalContainer>
  );
};

export default EducationModal;
