import React, { useState } from "react";
import ProjectModal from "../components/ProjectsModal";
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";

const ProjectsTable = () => {
	const [projects, setProjects] = useState([
		{
			id: 1,
			name: "Newsroom Management",
			tools: ["NextJS", "Material UI", "Redux", "Sun Editor", "Calendar"],
			myRole: "Full Stack Developer",
			description:
				"My team and I developed a newspaper management dashboard application called Newsroom Management...",
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
		<div className="overflow-x-auto rounded-lg shadow-sm">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-heading">Project Table</h1>
				<button
					onClick={() => setModalOpen(true)}
					className="bg-button_primary text-button_text py-2 px-4 rounded hover:bg-button_hover transition">
					Add New Project
				</button>
			</div>
			<div className="overflow-x-auto rounded-lg shadow-lg bg-background_card border border-border_primary">
				<table className="min-w-full text-sm text-text_secondary">
					<TableHead columnsData={["Name", "Tools", "Role", "Description"]} />

					<tbody>
						{projects.map((project) => (
							<TableRow
								key={project.id}
								item={project}
								handleDelete={handleDelete}
								handleEdit={handleEdit}>
								<td className="py-3 px-4">{project.name}</td>
								<td className="py-3 px-4">{project.tools.join(", ")}</td>
								<td className="py-3 px-4">{project.myRole}</td>
								<td className="py-3 px-4">{project.description}</td>
							</TableRow>
						))}
					</tbody>
				</table>
			</div>

			{modalOpen && (
				<ProjectModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleAdd}
					initialData={editingProject}
				/>
			)}
		</div>
	);
};

export default ProjectsTable;
