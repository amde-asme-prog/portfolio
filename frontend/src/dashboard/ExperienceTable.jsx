import { useEffect, useState } from "react";
import {
  useExperiencesQuery,
  useDeleteExperienceMutation,
} from "../hooks/experienceQuery";
import ExperienceModal from "../components/ExperienceModal";
import TableHead from "./components/TableHead";
import TableRow from "./components/TableRow";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";

const ExperienceTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const {
    data: experiencesData,
    isLoading,
    error,
    fetchStatus,
  } = useExperiencesQuery();
  const { mutate: deleteExperience } = useDeleteExperienceMutation();

  const handleDeleteExperience = (id) => {
    const response = deleteExperience(id);
    if (response.isSuccess) {
      handleToast.success(200, "Experience deleted successfully.");
    }
  };

  useEffect(() => {
    if (experiencesData) {
      setExperiences(experiencesData);
    }
  }, [experiencesData]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "Failed to fetch experiences.";
      handleToast(error.response?.status || 500, errorMessage);
    }
  }, [error]);

  const tableColumns = [
    "Title",
    "Company",
    "Duration",
    "Technologies",
    "Responsibilities",
    "Accomplishment",
  ];

  return (
    <div className="m-5 p-5  text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
          Experience Table
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          + Add Experience
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {error?.response?.status >= 500 && (
            <div className="text-center py-8 text-red-500 dark:text-red-400">
              Error fetching data. Please try again later.
            </div>
          )}

          {error?.response?.status == 404 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No experiences found. Add your first experience!
            </div>
          )}

          {!isLoading && !error && experiences && experiences.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 rounded-md">
              <TableHead columnsData={tableColumns} />
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {experiences.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    handleEdit={() => {
                      setEditingExperience(item);
                      setModalOpen(true);
                    }}
                    handleDelete={handleDeleteExperience}
                  >
                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {item.company}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-gray-800 dark:text-gray-200">
                      {calculateDuration(item.start_date, item.end_date)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {item.technologies &&
                          typeof item.technologies === "string" &&
                          JSON.parse(item.technologies).map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-full text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {item.responsibilities}
                    </td>
                    <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                      {item.accomplishment}
                    </td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalOpen && (
        <ExperienceModal
          isOpen={modalOpen}
          onClose={() => {
            setEditingExperience(null);
            setModalOpen(false);
          }}
          initialData={editingExperience}
        />
      )}
    </div>
  );
};

const calculateDuration = (startDate, endDate) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

export default ExperienceTable;
