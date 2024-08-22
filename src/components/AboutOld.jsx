import { FaCircle } from "react-icons/fa6";

const About = () => {
	const aboutMe = [
		{
			title: "Who am I?",
			text: "A Computer Science graduate with a strong foundation in web and mobile app development, adept in React, Flutter, and Next.js. A highly motivated and detail-oriented individual with proven problem-solving abilities and collaborative skills, eager to contribute to dynamic tech projects and deliver exceptional user experiences. Known for a passion for technology, effective communication, and a commitment to continuous learning.",
			borderColor: "border-blue-800",
			bgColor: "bg-white",
			textColor: "text-black",
			circleColors: ["#ff5f56", "#ffbd2e", "#27c93f"],
		},
		{
			title: "What am I good at?",
			text: "I specialize in React, Flutter, and Next.js for web and mobile development, focusing on user interface designs that provide seamless navigation. Proficient in JavaScript, HTML, CSS, and TypeScript, I create dynamic and engaging web applications that are functional, visually appealing, and user-friendly, ensuring enjoyable interactions that meet user needs.",
			borderColor: "border-blue-500",
			bgColor: "bg-white",
			textColor: "text-black",
			circleColors: ["#ff5f56", "#ffbd2e", "#27c93f"],
		},
		{
			title: "What am I looking for?",
			text: "I am seeking a full-time or part-time Software Developer position, either in-person or remote, at a dynamic tech company. I am open to various roles, including front-end, back-end, full-stack, and mobile app development, and I am eager to work on projects that match my skills and interests.",
			borderColor: "border-blue-500",
			bgColor: "bg-white",
			textColor: "text-black",
			circleColors: ["#ff5f56", "#ffbd2e", "#27c93f"],
		},
	];
	const education = [
		{
			title: "Bachelor of Science in Computer Science",
			text: "University of Addis Ababa, Ethiopia",
			borderColor: "border-blue-800",
			bgColor: "bg-white",
			textColor: "text-black",
			circleColors: ["#ff5f56", "#ffbd2e", "#27c93f"],
		},
	];

	const experience = [
		{
			title: "Software Developer",
			text: "Full-time or part-time, at a dynamic tech company",
			borderColor: "border-blue-500",
			bgColor: "bg-white",
			textColor: "text-black",
			circleColors: ["#ff5f56", "#ffbd2e", "#27c93f"],
		},
	];
	return (
		<section id="about" className=" w-full pt-28 bg-slate-200">
			<div>
				<h1 className=" capitalize font-extrabold text-5xl text-center mb-10">
					About Me
				</h1>

				<div className="flex flex-row justify-around max-md:flex-col max-md:justify-center gap-x-8 p-8 max-md:p-4 w-full">
					<div className="self-start w-1/2 px-4 max-md:px-2 max-md:w-full gap-6 space-y-6">
						{aboutMe.map((section, index) => (
							<div
								key={index}
								className={`flex flex-col border-2 ${section.borderColor} rounded-md ${section.bgColor} shadow-lg`}>
								<div className="flex flex-row items-center justify-between border-b-2 border-gray-300 p-2">
									<div className="flex flex-row items-center gap-x-2">
										{section.circleColors.map((color, i) => (
											<FaCircle key={i} size={12} color={color} />
										))}
									</div>
									<h2
										className={`font-extrabold text-2xl text-center w-full ${section.textColor}`}>
										{section.title}
									</h2>
								</div>
								<pre
									className={`p-4 text-sm font-mono whitespace-pre-wrap ${section.textColor}`}>
									{section.text}
								</pre>
							</div>
						))}
					</div>
					<div className="flex flex-col items-start text-left w-1/2 p-8 overflow-hidden gap-y-4 self-center max-md:w-full">
						<img
							src="/src/assets/Cinematic_Kino_To_create_a_persistence_image_you_should_utiliz_1.jpg"
							className="w-full bg-cover rounded-2xl shadow-2xl"
							alt="about"
						/>
					</div>
				</div>
			</div>
			<EducationExperience />
		</section>
	);
};

export default About;

const EducationExperience = () => {
	const education = [
		{
			title: "Bachelor of Science in Computer Science",
			text: `Bahir Dar University
					Sept 2018 - Jul 2024
					GPA: 3.75/4.00
					Key Courses: Data Structures, Algorithms, Web Development, Mobile App Development`,
			borderColor: "border-blue-500",
			bgColor: "bg-blue-50",
			textColor: "text-blue-700",
			circleColors: ["#FF6347", "#FFD700", "#32CD32"],
		},
		{
			title: "High School Diploma",
			text: `ABC High School
					Sept 2014 - Jun 2018
					Graduated with Honors
					Key Courses: Mathematics, Physics, Computer Science`,
			borderColor: "border-green-500",
			bgColor: "bg-green-50",
			textColor: "text-green-700",
			circleColors: ["#FF6347", "#FFD700", "#32CD32"],
		},
	];

	const experience = [
		{
			title: "Full Stack Developer Intern",
			text: `XYZ Company
					Jan 2024 - Jun 2024
					- Developed and maintained web applications using React and Node.js.
					- Collaborated with the UI/UX team to create responsive interfaces.
					- Implemented RESTful APIs and integrated third-party services.`,
			borderColor: "border-red-500",
			bgColor: "bg-red-50",
			textColor: "text-red-700",
			circleColors: ["#FF6347", "#FFD700", "#32CD32"],
		},
		{
			title: "Frontend Developer",
			text: `Freelance
					Aug 2022 - Dec 2023
					- Created custom websites for small businesses using HTML, CSS, and JavaScript.
					- Focused on responsive design and cross-browser compatibility.
					- Worked with clients to gather requirements and deliver on time.`,
			borderColor: "border-yellow-500",
			bgColor: "bg-yellow-50",
			textColor: "text-yellow-700",
			circleColors: ["#FF6347", "#FFD700", "#32CD32"],
		},
	];

	return (
		<div className="container mx-auto px-4 py-16">
			<div>
				<h1 className="capitalize font-extrabold text-5xl text-center mb-10 text-gray-800">
					Education
				</h1>
				<div className="flex flex-row justify-around max-md:flex-col max-md:justify-center gap-x-8 p-8 max-md:p-4 w-full">
					<div className="self-start w-1/2 px-4 max-md:px-2 max-md:w-full gap-6 space-y-6">
						{education.map((section, index) => (
							<div
								key={index}
								className={`flex flex-col border-2 ${section.borderColor} rounded-md ${section.bgColor} shadow-lg transition-transform transform hover:scale-105 duration-300`}>
								<div className="flex flex-row items-center justify-between border-b-2 border-gray-300 p-4">
									<div className="flex flex-row items-center gap-x-2">
										{section.circleColors.map((color, i) => (
											<FaCircle key={i} size={12} color={color} />
										))}
									</div>
									<h2
										className={`font-extrabold text-2xl text-center w-full ${section.textColor}`}>
										{section.title}
									</h2>
								</div>
								<pre
									className={`p-4 text-sm font-mono whitespace-pre-wrap ${section.textColor}`}>
									{section.text}
								</pre>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="mt-16">
				<h1 className="capitalize font-extrabold text-5xl text-center mb-10 text-gray-800">
					Experience
				</h1>
				<div className="flex flex-row justify-around max-md:flex-col max-md:justify-center gap-x-8 p-8 max-md:p-4 w-full">
					<div className="self-start w-1/2 px-4 max-md:px-2 max-md:w-full gap-6 space-y-6">
						{experience.map((section, index) => (
							<div
								key={index}
								className={`flex flex-col border-2 ${section.borderColor} rounded-md ${section.bgColor} shadow-lg transition-transform transform hover:scale-105 duration-300`}>
								<div className="flex flex-row items-center justify-between border-b-2 border-gray-300 p-4">
									<div className="flex flex-row items-center gap-x-2">
										{section.circleColors.map((color, i) => (
											<FaCircle key={i} size={12} color={color} />
										))}
									</div>
									<h2
										className={`font-extrabold text-2xl text-center w-full ${section.textColor}`}>
										{section.title}
									</h2>
								</div>
								<pre
									className={`p-4 text-sm font-mono whitespace-pre-wrap ${section.textColor}`}>
									{section.text}
								</pre>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
