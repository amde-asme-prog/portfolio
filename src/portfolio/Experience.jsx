import React from "react";
import { FaCircle, FaBriefcase, FaCalendarAlt, FaTasks } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Experience() {
	const experience = [
		{
			title: "Full Stack Developer Intern",
			company: "ASTC",
			duration: "Jan 2024 - Jun 2024",
			responsibilities: [
				"Developed and maintained web applications using React and Node.js.",
				"Collaborated with the UI/UX team to create responsive interfaces.",
				"Implemented RESTful APIs and integrated third-party services.",
				"Participated in code reviews and contributed to improving development processes.",
				"Assisted in database design and optimization using MongoDB.",
			],
			technologies: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs"],
			achievements: [
				"Reduced page load time by 40% through optimizing frontend components.",
				"Implemented a new feature that increased user engagement by 25%.",
			],
		},
		{
			title: "Frontend Developer",
			company: "Freelance",
			duration: "Aug 2022 - Dec 2023",
			responsibilities: [
				"Created custom websites for small businesses using HTML, CSS, and JavaScript.",
				"Focused on responsive design and cross-browser compatibility.",
				"Worked with clients to gather requirements and deliver on time.",
				"Implemented SEO best practices to improve website visibility.",
				"Provided ongoing maintenance and support for client websites.",
			],
			technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "WordPress"],
			achievements: [
				"Completed over 20 projects with a 100% client satisfaction rate.",
				"Increased organic traffic by an average of 50% for client websites through SEO optimization.",
			],
		},
	];

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="space-y-8">
				{experience.map((job, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						className="bg-background_card rounded-lg shadow-lg overflow-hidden">
						<div className="bg-background_card border-b border-border_card p-2 sm:p-4 flex justify-between gap-4">
							<div className="flex items-center space-x-1 sm:space-x-2">
								{["#FF6347", "#FFD700", "#32CD32"].map((color, i) => (
									<FaCircle key={i} size={12} color={color} />
								))}
							</div>
							<h2 className="font-bold text-lg sm:text-xl text-heading text-wrap self-end  flex-1">
								{job.title}
							</h2>
						</div>
						<div className="p-6">
							<div className="flex items-center text-text_sub-heading mb-4">
								<FaBriefcase className="mr-2" />
								<span className="font-semibold">{job.company}</span>
								<FaCalendarAlt className="ml-4 mr-2" />
								<span>{job.duration}</span>
							</div>
							<div className="mb-4">
								<h3 className="font-semibold text-lg mb-2 flex items-center">
									<FaTasks className="mr-2" /> Responsibilities
								</h3>
								<ul className="list-disc pl-5 space-y-1">
									{job.responsibilities.map((resp, i) => (
										<li key={i} className="text-sm text-text_subtle">
											{resp}
										</li>
									))}
								</ul>
							</div>
							<div className="mb-4">
								<h3 className="font-semibold text-lg mb-2">
									Technologies Used
								</h3>
								<div className="flex flex-wrap gap-2">
									{job.technologies.map((tech, i) => (
										<span
											key={i}
											className="bg-background_container text-text_tertiary px-2 py-1 rounded-full text-sm">
											{tech}
										</span>
									))}
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-lg mb-2">Key Achievements</h3>
								<ul className="list-disc pl-5 space-y-1">
									{job.achievements.map((achievement, i) => (
										<li key={i} className="text-text_subtle text-sm">
											{achievement}
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
