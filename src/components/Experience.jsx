import { FaCircle } from "react-icons/fa";

export default function Experience() {
	const experience = [
		{
			title: "Full Stack Developer Intern",
			text: `XYZ Company
					Jan 2024 - Jun 2024
					- Developed and maintained web applications using React and Node.js.
					- Collaborated with the UI/UX team to create responsive interfaces.
					- Implemented RESTful APIs and integrated third-party services.`,
		},
		{
			title: "Frontend Developer",
			text: `Freelance
					Aug 2022 - Dec 2023
					- Created custom websites for small businesses using HTML, CSS, and JavaScript.
					- Focused on responsive design and cross-browser compatibility.
					- Worked with clients to gather requirements and deliver on time.`,
		},
	];

	return (
		<div className="flex flex-wrap justify-center items-center md:justify-start md:items-left gap-4">
			{experience.map((section, index) => (
				<div
					key={index}
					className="flex flex-col border-2 rounded-lg  shadow-lg bg-background_secondary w-80 md:w-96 min-h-fit ">
					<div className="flex flex-row items-center justify-between border-b-2 border-border_primary p-2">
						<div className="flex flex-row items-center gap-x-2">
							{["#FF6347", "#FFD700", "#32CD32"].map((color, i) => (
								<FaCircle key={i} size={12} color={color} />
							))}
						</div>
						<h2 className="font-bold font-roboto text-lg sm:text-xl text-center w-full">
							{section.title}
						</h2>
					</div>
					<div className="flex-1">
						<pre className="p-4 text-sm font-mono whitespace-pre-wrap ">
							{section.text}
						</pre>
					</div>
				</div>
			))}
		</div>
	);
}
