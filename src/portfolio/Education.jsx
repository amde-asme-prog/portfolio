import { BiCheckCircle, BiCalendar, BiBook } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Education() {
	const education = [
		{
			title: "Bachelors of Computer Science",
			institute: "Bahir Dar University",
			startYear: "Sept 2020",
			endYear: "Jul 2024",
			courses:
				"Data Structures, Algorithms, Web Development, Mobile App Development",
			achievements: "Dean's List for 3 consecutive semesters",
		},
		{
			title: "Preparatory",
			institute: "Woldia Preparatory School",
			startYear: "Sept 2018",
			endYear: "Jun 2019",
			courses: "Mathematics, Physics, Chemistry, Biology",
			achievements: "Top 5% of the class",
		},
		{
			title: "High School",
			institute: "Woldia High School",
			startYear: "Sept 2016",
			endYear: "Jun 2017",
			courses: "Mathematics, Physics, Chemistry, Biology",
			achievements: "School Science Fair Winner",
		},
		{
			title: "Internship - Web Development",
			institute: "ASTC",
			startYear: "Jul 2023",
			endYear: "Sep 2023",
			courses: "Developed and maintained web applications using Next.js",
			achievements: "Successfully completed 3 major projects",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:place-content-start">
			{education.map((section, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
					className="card bg-background_card text-text_secondary shadow-lg rounded-lg overflow-hidden">
					<div className="bg-button_primary text-white p-4">
						<h3 className="text-xl font-bold">{section.title}</h3>
						<p className="text-sm italic">{section.institute}</p>
					</div>
					<div className="p-6">
						<div className="flex items-center mb-4 text-text_subtle">
							<BiCalendar className="text-icon_color mr-2" />
							<p className="text-sm">
								{`${section.startYear} - ${section.endYear}`}
							</p>
						</div>
						<div className="mb-4">
							<details className="text-text_subtle">
								<summary className="cursor-pointer font-semibold flex items-center">
									<BiBook className="text-icon_color mr-2" />
									Courses
								</summary>
								<p className="mt-2 text-sm text-text_subtle pl-6">
									{section.courses}
								</p>
							</details>
						</div>
						<div className="flex items-start">
							<BiCheckCircle className="text-green-600 mt-1 mr-2" />
							<div>
								<p className="font-semibold">Achievements</p>
								<p className="text-sm text-text_subtle">
									{section.achievements}
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
