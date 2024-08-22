import { useRef, useState } from "react";

const Projects = () => {
	const projects = [
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
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	const nextProject = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
	};

	const prevProject = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + projects.length) % projects.length
		);
	};

	return (
		<section
			id="projects"
			className="text-center py-24 w-full bg-background_primary">
			<h1 className="text-4xl font-bold mb-12 text-heading">Projects</h1>
			<div className="flex flex-col justify-center w-full">
				<div className="max-w-[90vw] min-h-fit self-center">
					<div className="relative h-[37rem] flex justify-center items-center">
						<button
							onClick={prevProject}
							className="absolute left-0 p-2 bg-gray-300 rounded-full">
							&lt;
						</button>
						<Project project={projects[currentIndex]} />
						<button
							onClick={nextProject}
							className="absolute right-0 p-2 bg-gray-300 rounded-full">
							&gt;
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

const Project = ({ project }) => {
	return (
		<div className="self-center justify-center flex flex-col bg-background_secondary text-sub_heading border border-border_primary rounded-lg shadow-lg w-96 h-[32rem] text-left transition-transform duration-500 hover:shadow-xl">
			<div className="flex items-center justify-between border-b-2 border-gray-200 w-full p-4">
				<span className="text-sm font-bold italic text-blue-500 uppercase flex-1 text-center">
					{project.name}
				</span>
			</div>
			<div className="p-6 flex-1">
				<code className="text-sm text-red-800">
					<span className="text-pink-500">const</span> project = {"{"}
					<br />
					&nbsp;&nbsp;<span className="text-blue-500">name</span>: &quot;
					{project.name}&quot;,
					<br />
					&nbsp;&nbsp;<span className="text-blue-500">tools</span>: ["
					{project.tools.join('", "')}"],
					<br />
					&nbsp;&nbsp;<span className="text-blue-500">myRole</span>: &quot;
					{project.myRole}&quot;,
					<br />
					&nbsp;&nbsp;<span className="text-blue-500">description</span>: &quot;
					{project.description}&quot;
					<br />
					{"};"}
				</code>
			</div>
			<a
				href={project.link}
				className="w-full mt-5 bg-blue-600 rounded-br-lg rounded-bl-lg text-center py-2 border border-gray-200 text-gray-200 hover:bg-blue-500">
				View Project
			</a>
		</div>
	);
};

export default Projects;