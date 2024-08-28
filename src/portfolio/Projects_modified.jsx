import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	FaGithub,
	FaExternalLinkAlt,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";

const Projects2 = () => {
	const projects = [
		{
			name: "Newsroom Management",
			tools: ["NextJS", "Material UI", "Redux", "Sun Editor", "Calendar"],
			myRole: "Full Stack Developer",
			description:
				"Developed a comprehensive newspaper management dashboard application, streamlining content creation, editing, and publishing processes for media organizations.",
			link: "#",
			github: "https://github.com/yourusername/newsroom-management",
			image: "https://via.placeholder.com/300x200?text=Newsroom+Management",
		},
		{
			name: "E-commerce Platform",
			tools: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
			myRole: "Backend Developer",
			description:
				"Built a scalable e-commerce platform with features including user authentication, product management, cart functionality, and secure payment processing.",
			link: "#",
			github: "https://github.com/yourusername/ecommerce-platform",
			image: "https://via.placeholder.com/300x200?text=E-commerce+Platform",
		},
		{
			name: "Fitness Tracker App",
			tools: ["Flutter", "Firebase", "Google Maps API", "HealthKit"],
			myRole: "Mobile Developer",
			description:
				"Developed a cross-platform mobile app for fitness enthusiasts to track workouts, set goals, and monitor progress with integration of wearable devices.",
			link: "#",
			github: "https://github.com/yourusername/fitness-tracker",
			image: "https://via.placeholder.com/300x200?text=Fitness+Tracker+App",
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
			className="py-24 w-full bg-background_container overflow-clip">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold mb-12 text-center text-heading">
					Projects
				</h1>
				<div className="relative">
					<AnimatePresence mode="wait" presenceAffectsLayout={true}>
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col md:flex-row gap-8 items-center justify-center">
							<Project project={projects[currentIndex]} />
						</motion.div>
					</AnimatePresence>
					<button
						onClick={prevProject}
						className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-200 transition-colors duration-200">
						<FaChevronLeft />
					</button>
					<button
						onClick={nextProject}
						className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg text-gray-800 hover:bg-gray-200 transition-colors duration-200">
						<FaChevronRight />
					</button>
				</div>
				<div className="flex justify-center mt-8">
					{projects.map((_, index) => (
						<div
							key={index}
							className={`w-3 h-3 mx-1 rounded-full ${
								index === currentIndex ? "bg-blue-500" : "bg-gray-300"
							}`}></div>
					))}
				</div>
			</div>
		</section>
	);
};

const Project = ({ project }) => {
	return (
		<div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
			<div className="md:flex">
				<div className="md:flex-shrink-0">
					<img
						className="h-48 w-full object-cover md:w-48"
						src={project.image}
						alt={project.name}
					/>
				</div>
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						{project.myRole}
					</div>
					<h2 className="block mt-1 text-lg leading-tight font-medium text-black">
						{project.name}
					</h2>
					<p className="mt-2 text-gray-500">{project.description}</p>
					<div className="mt-4">
						<h3 className="text-sm font-semibold text-gray-700">
							Technologies used:
						</h3>
						<div className="mt-2 flex flex-wrap gap-2">
							{project.tools.map((tool, index) => (
								<span
									key={index}
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
									{tool}
								</span>
							))}
						</div>
					</div>
					<div className="mt-6 flex space-x-4">
						<a
							href={project.github}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
							<FaGithub className="mr-2" />
							GitHub
						</a>
						<a
							href={project.link}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
							<FaExternalLinkAlt className="mr-2" />
							View Project
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects2;
