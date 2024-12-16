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
    console.log("deleting", id);
    deleteProject(id);
  };

  return (
    <div className="p-6 mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <Toaster position="top-center" invert richColors />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Projects
        </h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          + Add Project
        </button>
      </div>

      <div className="border border-gray-300 dark:border-gray-700 p-1 bg-white dark:bg-gray-800 rounded-md shadow-lg">
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

          {error?.response?.status == 404 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-300">
              No projects found. Add your first service!
            </div>
          )}

          <div className="flex flex-wrap gap-10">
            {!isLoading &&
              !error &&
              projects &&
              projects.length > 0 &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="box project-card w-96 bg-white rounded-lg shadow-lg px-4 py-8 relative group cursor-pointer transition-all duration-300 hover:shadow-xl"
                >
                  <div className="card-gradient absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                    className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="my-5 h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <h3 className="text-xl font-bold text-primary mb-2 relative">
                    {project.title}
                  </h3>
                  <p className="text-xl text-text_secondary mb-4 relative">
                    {project.description}
                  </p>
                  <div className="relative">
                    <div className="flex gap-2 flex-wrap">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-opacity-80 bg-gray-200 py-1 px-3 rounded-full transition-colors duration-300 hover:bg-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="self-end flex justify-between mt-4 relative">
                    <p className="text-sm text-text_secondary mb-2">
                      As a {project.role}
                    </p>
                    <div className="flex justify-between gap-5">
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Demo
                      </a>
                      <button onClick={() => deleteProject(project.id)}>
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

        <style jsx="true">{`
          .box {
            /* width: 100%;
  height: 100%; */
            background-size: 200% 100%;
            background-image: linear-gradient(to right, #3b82f6, #9333ea);
            -webkit-transition: background-position 1s;
            -moz-transition: background-position 1s;
            transition: background-position 1s;
          }

          .box:hover {
            color: white;
            background-position: -100% 0;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ProjectsTable;
