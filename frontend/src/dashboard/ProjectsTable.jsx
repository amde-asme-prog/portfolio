import { useEffect, useState } from "react";
import ProjectModal from "../components/ProjectsModal";
import { handleToast } from "../common/handleToast";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLink,
  faPlus,
  faClock,
  faCode,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  useDeleteProjectMutation,
  useProjectsQuery,
} from "../hooks/projectsQuery";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    if (dragStart && dragStart - e.clientX > 100) {
      onDelete(project.id);
    }
    setDragStart(null);
    setIsDragging(false);
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl group transition-all duration-300 
        hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden
        ${isDragging ? "scale-95 opacity-70" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div onClick={() => onEdit(project)} className="cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${
              import.meta.env.VITE_SUPABASE_URL
            }/storage/v1/object/public/portfolio_files/${project?.image_path}`}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <div className="flex items-center text-gray-200 text-sm">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {(Array.isArray(project.tools)
              ? project.tools
              : JSON.parse(project.tools)
            ).map((tool, idx) => (
              <span
                key={idx}
                className="text-sm bg-gradient-to-r from-indigo-50 to-purple-50 
                  dark:from-indigo-900/30 dark:to-purple-900/30 
                  text-indigo-600 dark:text-indigo-300 
                  py-1.5 px-4 rounded-full font-medium
                  border border-indigo-100 dark:border-indigo-800
                  flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faCode} className="text-xs" />
                {tool}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faGlobe} />
            <span>{project.role}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex gap-4">
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 
              transition-colors transform hover:scale-110 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a
            href={project.demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 
              transition-colors transform hover:scale-110 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faExternalLink} size="lg" />
          </a>
        </div>
        <div className="flex gap-2">
          <a
            href={project.linkedin_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a
            href={project.twitter_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const { data: projectsData, isLoading, error } = useProjectsQuery();
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

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  return (
    <div className="m-5 p-5  text-stone-900 dark:text-stone-100">
      <Toaster position="top-center" invert richColors />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-2">
              Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Drag cards left to delete. Click to edit.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
              py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 
              transition duration-300 shadow-lg hover:shadow-xl 
              transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Project
          </button>
        </div>

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

        {!isLoading && !error && (!projects || projects.length === 0) && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-300">
            No projects found. Add your first project!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading &&
            !error &&
            projects?.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={deleteProject}
              />
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
  );
};

export default ProjectsTable;
