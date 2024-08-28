import React, { useRef, useState } from "react";

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
				<div className="max-md:max-w-[90vw] w-fit min-h-fit self-center">
					<div className="relative h-[37rem] flex justify-center items-center gap-4">
						<button
							onClick={prevProject}
							className="absolute -left-6 p-2 bg-gray-300 rounded-full">
							&lt;
						</button>
						<Project project={projects[currentIndex]} />
						<div className="hidden md:inline-flex">
							<Project
								project={
									currentIndex + 1 >= projects.length
										? currentIndex > projects.length
											? projects[1]
											: projects[0]
										: projects[currentIndex + 1]
								}
							/>
						</div>
						<div className="hidden  lg:inline-flex ">
							<Project
								project={
									currentIndex + 2 >= projects.length
										? currentIndex - projects.length == 2
											? projects[2]
											: currentIndex - projects.length == 1
											? projects[1]
											: projects[0]
										: projects[currentIndex + 2]
								}
							/>
						</div>
						<button
							onClick={nextProject}
							className="absolute -right-6 p-2 bg-gray-300 rounded-full">
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
		<div className="self-center justify-center flex flex-col bg-background_secondary text-sub_heading border border-background_primary rounded-lg shadow-lg w-96 h-[32rem] text-left transition-transform duration-500 hover:shadow-xl">
			<div className="flex items-center justify-between border-b-2 border-background_primary w-full p-4">
				<div className="flex gap-x-2 align-center self-center">
					<span className="w-3 h-3 bg-red-500 rounded-full"></span>
					<span className="w-3 h/,-3 bg-yellow-500 rounded-full"></span>
					<span className="w-3 h-3 bg-green-500 rounded-full"></span>
				</div>
				<span className="text-sm font-bold italic text-blue-500 uppercase text-center flex-1">
					{project.name}
				</span>
			</div>
			<div className="p-6 flex-1">
				<code className="text-sm text-text_tertiary">
					<span className="text-pink-500">const</span> project = {"{"}
					<br />
					&nbsp;&nbsp;<span className="text-red-500">name</span>:{" "}
					<q>{project.name}</q>,
					<br />
					&nbsp;&nbsp;<span className="text-red-500">tools</span>: [
					<q>{project.tools.join('", "')}</q>],
					<br />
					&nbsp;&nbsp;<span className="text-red-500">myRole</span>:{" "}
					<q>{project.myRole}</q>,
					<br />
					&nbsp;&nbsp;<span className="text-red-500">description</span>:{" "}
					<q className="text-text_accent">{project.description}</q>
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
