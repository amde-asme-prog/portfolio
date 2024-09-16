import React, { useContext } from "react";
import { FaCircle, FaBriefcase, FaCalendarAlt, FaTasks } from "react-icons/fa";
import { motion } from "framer-motion";
import ExperienceContext from "../context/ExperienceProvider";

export default function Experience() {
	const { experience } = useContext(ExperienceContext);

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
