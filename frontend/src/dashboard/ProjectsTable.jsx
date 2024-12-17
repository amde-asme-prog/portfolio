import { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectsModal";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import {
  useDeleteProjectMutation,
  useProjectsQuery,
} from "../hooks/projectsQuery";

const ProjectsTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const {
    data: projectsData,
    isLoading,
    error,
    fetchStatus,
  } = useProjectsQuery();
  const { mutate: deleteProject } = useDeleteProjectMutation();

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData]);

  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "Failed to fetch projects.";
      handleToast(error.response?.status || 500, errorMessage);
    }
  }, [error]);

  const handleDelete = (id) => {
    deleteProject(id);
  };

  return (
    <div className="p-6 mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Projects
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          + Add Project
        </button>
      </div>

      <div className="rounded-lg shadow-md bg-white dark:bg-gray-800">
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {fetchStatus === "paused" ||
            (fetchStatus === "idle" && (
              <div className="text-center py-8 text-red-500 dark:text-red-400">
                It seems you&apos;re offline. Please check your internet
                connection.
              </div>
            ))}

          {error?.response?.status === 404 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No projects found. Add your first project!
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {!isLoading &&
              !error &&
              projects?.length > 0 &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="relative bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg group transition-transform transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg" />
                  <img
                    onClick={() => {
                      setEditingProject(project);
                      setModalOpen(true);
                    }}
                    src={
                      project.image_path &&
                      typeof project.image_path === "string"
                        ? project.image_path
                        : null
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(typeof project.tools == "string"
                      ? JSON.parse(project.tools)
                      : project.tools
                    ).map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-gray-200 dark:bg-gray-600 py-1 px-3 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role: {project.role}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Demo
                      </a>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {modalOpen && (
          <ProjectModal
            isOpen={modalOpen}
            onClose={() => {
              setEditingProject(null);
              setModalOpen(false);
            }}
            initialData={editingProject}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsTable;
