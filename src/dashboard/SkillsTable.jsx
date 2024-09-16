import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SkillModal from "../components/SkillModal";
import TableHead from "./components/TableHead";
import TableRow from "./components/TableRow";

const SkillsTable = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", type: "Technical", proficiency: 95 },
    {
      id: 2,
      name: "Project Management",
      type: "Professional",
      proficiency: 90,
    },
  ]);
  const columns = ["name", "Type", "Proficiency"];
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleSubmit = (formData) => {
    if (editingSkill) {
      setSkills(
        skills.map((skill) =>
          skill.id === editingSkill.id ? { ...skill, ...formData } : skill
        )
      );
    } else {
      setSkills([...skills, { id: skills.length + 1, ...formData }]);
    }
    setModalOpen(false);
    setEditingSkill(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-heading">Skills Table</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition"
          >
            Add New Skill
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-background_card border border-border_primary">
          <table className="w-full text-sm text-text_secondary">
            <TableHead columnsData={columns} />
            <tbody>
              {skills.map((skill) => (
                <TableRow
                  key={skill.id}
                  item={skill}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                >
                  <td className="py-2 px-4">{skill.name}</td>
                  <td className="py-2 px-4">{skill.type}</td>
                  <td className="py-2 px-4">{skill.proficiency}</td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <SkillModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={editingSkill}
        />
      )}
    </>
  );
};

export default SkillsTable;
