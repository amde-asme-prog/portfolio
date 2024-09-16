import React, { useState } from "react";
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import ModalContainer from "../components/ModalContainer";

export default function SkillTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skills, setSkills] = useState([
    {
      title: "Web Development",
      description: "Building responsive and modern websites.",
      icon: "🌐",
    },
  ]);

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setModalOpen(true);
  };

  const handleDelete = (title) => {
    setSkills(skills.filter((skill) => skill.title !== title));
  };

  const handleSubmit = (newSkill) => {
    if (editingSkill) {
      setSkills(
        skills.map((skill) =>
          skill.title === editingSkill.title ? newSkill : skill
        )
      );
    } else {
      setSkills([...skills, newSkill]);
    }
    setModalOpen(false);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-heading">Services Table</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition"
        >
          Add New Service
        </button>
      </div>
      <table className="min-w-full bg-background_card shadow-lg rounded-lg">
        <TableHead columnsData={["Icon", "Title", "Description"]} />
        <tbody className="text-text_secondary text-sm font-light">
          {skills.map((skill) => (
            <TableRow
              key={skill.id}
              item={skill}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            >
              <td className="py-2 px-4">{skill.icon}</td>
              <td className="py-2 px-4">{skill.title}</td>
              <td className="py-2 px-4">{skill.description}</td>
            </TableRow>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <ModalForm
          isOpen={modalOpen}
          initialData={editingSkill}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function ModalForm({ initialData, onClose, onSubmit, isOpen }) {
  const [formData, setFormData] = useState(
    initialData || { title: "", description: "", icon: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <ModalContainer onClose={onClose} isOpen={isOpen} handleSubmit={onSubmit}>
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Edit Service" : "Add New Service"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Icon
          </label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
      </form>
    </ModalContainer>
  );
}
