import React from "react";
import {
	FaCode,
	FaReact,
	FaNodeJs,
	FaPython,
	FaJava,
	FaLaravel,
} from "react-icons/fa";
import {
	SiNextdotjs,
	SiFlutter,
	SiTypescript,
	SiCss3,
	SiHtml5,
	SiTailwindcss,
} from "react-icons/si";
import {
	CircularProgressbar,
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import RadialSeparators from "./RadialSeperator";

const Skills = () => {
	const technicalSkills = [
		{
			name: "JavaScript",
			level: 90,
			icon: <FaCode />,
		},
		{
			name: "React",
			level: 85,
			icon: <FaReact />,
		},
		{
			name: "Next.js",
			level: 75,
			icon: <SiNextdotjs />,
		},
		{
			name: "Flutter",
			level: 70,
			icon: <SiFlutter />,
		},
		{
			name: "Node.js",
			level: 85,
			icon: <FaNodeJs />,
		},
		{
			name: "TypeScript",
			level: 70,
			icon: <SiTypescript />,
		},
		{
			name: "CSS",
			level: 90,
			icon: <SiCss3 />,
		},
		{
			name: "HTML",
			level: 90,
			icon: <SiHtml5 />,
		},
		{
			name: "TailwindCSS",
			level: 80,
			icon: <SiTailwindcss />,
		},
		{
			name: "Java",
			level: 65,
			icon: <FaJava />,
		},
		{
			name: "Laravel",
			level: 70,
			icon: <FaLaravel />,
		},
	];

	const professionalSkills = [
		{
			name: "Communication",
			level: 85,
		},
		{
			name: "Teamwork",
			level: 90,
		},
		{
			name: "Problem Solving",
			level: 80,
		},
		{
			name: "Project Management",
			level: 75,
		},
	];

	return (
		<section id="skills" className="  w-full py-24  bg-background_primary">
			<div className="max-w-screen-xl mx-auto px-8">
				<h1 className="text-5xl font-bold text-heading text-center mb-16">
					My Skills
				</h1>
				<h2 className="text-3xl font-bold text-sub_heading mb-8">
					Technical Skills
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
					{technicalSkills.map((skill, index) => (
						<div
							key={index}
							className="bg-background_secondary p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-row gap-x-2">
							<div className="text-5xl text-text_tertiary">{skill.icon}</div>
							<div className="relative">
								<div className="flex items-center justify-between mb-2 gap-x-4">
									<h2 className="text-2xl font-semibold text-text_secondary">
										{skill.name}
									</h2>
									<div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-text_tertiary bg-background_primary bg-opacity-10">
										{skill.level}% Proficiency
									</div>
								</div>
								<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
									<div
										style={{ width: `${skill.level}%` }}
										className="shadow-none bg-blue-600"></div>
								</div>
							</div>
						</div>
					))}
				</div>

				<h2 className="text-3xl font-bold text-sub_heading mb-8">
					Professional Skills
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{professionalSkills.map((skill, index) => (
						<div
							key={index}
							className="flex flex-col items-center bg-background_secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
							<div className="w-32 h-32 mb-6">
								{/* TODO - CircularProgressbar with separator  */}
								<CircularProgressbarWithChildren
									value={skill.level}
									minValue={0}
									maxValue={100}
									text={`${skill.level}%`}
									styles={buildStyles({
										// strokeLinecap: "butt",
										// textSize: "16px",
										// pathColor: `rgba(34, 197, 94, ${skill.level / 100})`, // Progress color
										// textColor: "#22C55E", // Text color
										// trailColor: "#d6d6d6", // Separator color
										// strokeWidth: 10, // Width of the separator
									})}>
									{/* <RadialSeparators
										count={12}
										style={{
											background: "#fff",
											width: "2px",
											// This needs to be equal to props.strokeWidth
											height: `${10}%`,
										}}
									/> */}
								</CircularProgressbarWithChildren>
							</div>
							<h2 className="text-2xl font-semibold text-text_secondary">
								{skill.name}
							</h2>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Skills;