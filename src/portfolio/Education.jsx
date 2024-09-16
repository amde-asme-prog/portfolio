import { BiCheckCircle, BiCalendar, BiBook } from "react-icons/bi";
import { motion } from "framer-motion";
import { useContext } from "react";
import EducationContext from "../context/EducationProvider";

export default function Education() {
	const { education } = useContext(EducationContext);

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
