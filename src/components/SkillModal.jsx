import { useState, useEffect } from "react";
import ModalContainer from "./ModalContainer";

const SkillModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Technical",
    proficiency: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Edit Skill" : "Add New Skill"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm mb-2">Skill Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
          />
        </div>
        <div>
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
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Skill Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border_primary rounded focus:outline-none focus:ring-2 focus:ring-button_hover bg-input_background_color text-input_text_color"
          >
            <option value="Technical">Technical</option>
            <option value="Professional">Professional</option>
          </select>
        </div>
        {/* <div className="flex justify-end">
         
          <button
            type="submit"
            className="py-2 px-4 bg-button_primary text-button_text rounded hover:bg-button_hover transition"
          >
            {initialData ? "Save Changes" : "Add Skill"}
          </button>
        </div> */}
      </form>
    </ModalContainer>
  );
};

export default SkillModal;
