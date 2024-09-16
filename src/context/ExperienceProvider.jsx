import { createContext, useState } from "react";

export const ExperienceContext = createContext("");

const ExperienceProvider = ({ children }) => {
	const [experience, setExperience] = useState([
		{
			id: 1,
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
			id: 2,
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
	]);

	const [modalOpen, setModalOpen] = useState(false);
	const [editingExperience, setEditingExperience] = useState(null);

	const handleEdit = (experienceItem) => {
		setEditingExperience(experienceItem);
		setModalOpen(true);
	};

	const handleDelete = (id) => {
		setExperience(experience.filter((item) => item.id !== id));
	};

	const handleAdd = (newExperience) => {
		setExperience([...experience, { ...newExperience, id: Date.now() }]);
	};
	return (
		<ExperienceContext.Provider
			value={{
				experience,
				modalOpen,
				setModalOpen,
				editingExperience,
				setEditingExperience,
				handleAdd,
				handleEdit,
				handleDelete,
			}}>
			{children}
		</ExperienceContext.Provider>
	);
};

export { ExperienceProvider };
export default ExperienceContext;
