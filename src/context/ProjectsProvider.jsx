import { createContext, useState } from "react";

const ProjectContext = createContext([]);

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([
    {
      name: "Newsroom Management",
      tools: ["NextJS", "Material UI", "Redux", "Sun Editor", "Calendar"],
      myRole: "Full Stack Developer",
      description:
        "My team and I developed a newspaper management dashboard application called Newsroom Management...",
      link: "#",
    },
    {
      name: "Project Two",
      tools: ["React", "Node.js", "Express", "MongoDB"],
      myRole: "Backend Developer",
      description: "I was responsible for developing the backend...",
      link: "#",
    },
    {
      name: "Project Three",
      tools: ["Flutter", "Firebase", "Google Maps API"],
      myRole: "Mobile Developer",
      description: "As a mobile developer, I developed a cross-platform app...",
      link: "#",
    },
    {
      name: "Newsroom Management",
      tools: ["NextJS", "Material UI", "Redux", "Sun Editor", "Calendar"],
      myRole: "Full Stack Developer",
      description:
        "My team and I developed a newspaper management dashboard application called Newsroom Management...",
      link: "#",
    },
    {
      name: "Project Two",
      tools: ["React", "Node.js", "Express", "MongoDB"],
      myRole: "Backend Developer",
      description: "I was responsible for developing the backend...",
      link: "#",
    },
    {
      name: "Project Three",
      tools: ["Flutter", "Firebase", "Google Maps API"],
      myRole: "Mobile Developer",
      description: "As a mobile developer, I developed a cross-platform app...",
      link: "#",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleEdit = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleAdd = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
  };
  return (
    <ProjectContext.Provider
      value={{
        projects,
        handleAdd,
        handleEdit,
        handleDelete,
        editingProject,
        setEditingProject,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
export default ProjectContext;
