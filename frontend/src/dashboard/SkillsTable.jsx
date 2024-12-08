import { useEffect, useState } from "react";
import SkillModal from "../components/SkillModal";
import TableHead from "./components/TableHead";
import TableRow from "./components/TableRow";
import { useDeleteSkillMutation, useSkillsQuery } from "../hooks/skillsQuery";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab, fab);

const SkillsTable = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const { data: skillsData, isLoading, error, status } = useSkillsQuery();
  const { mutate: deleteSkill } = useDeleteSkillMutation();

  useEffect(() => {
    if (skillsData) {
      setSkills(skillsData);
    }
  }, [skillsData]);

  const handleDelete = (id) => {
    deleteSkill(id);
  };

  const columns = ["name", "Type", "Proficiency", "Icon"];

  return (
    <div className="p-6 mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Skill Table
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          + Add Skill
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              Error fetching data. Please try again later.
            </div>
          )}

          {!isLoading && !error && (!skills || skills.length === 0) && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No skills found. Add your first skill!
            </div>
          )}

          {!isLoading && !error && skills && skills.length > 0 && (
            <table className="w-full text-sm text-gray-700 dark:text-gray-200">
              <TableHead columnsData={columns} />
              <tbody>
                {skills.map((skill) => (
                  <TableRow
                    key={skill.id}
                    item={skill}
                    handleDelete={handleDelete}
                    handleEdit={() => {
                      setModalOpen(true);
                      setEditingSkill(skill);
                    }}
                  >
                    <td className="py-2 px-4">{skill.name}</td>
                    <td className="py-2 px-4">{skill.type}</td>
                    <td className="py-2 px-4">{skill.proficiency}</td>
                    <td className="py-2 px-4">
                      <FontAwesomeIcon
                        icon={["fab", skill.icon]}
                        className="text-lg"
                      />
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalOpen && (
        <SkillModal
          isOpen={modalOpen}
          onClose={() => {
            setEditingSkill(null);
            setModalOpen(false);
          }}
          initialData={editingSkill}
        />
      )}
    </div>
  );
};

export default SkillsTable;
