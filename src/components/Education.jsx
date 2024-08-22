import { BiCheckCircle } from "react-icons/bi";

export default function Education() {
	const education = [
		{
			title: "Bachelors of  Computer Science",
			institute: "Bahir Dar University",
			startYear: "Sept 2018",
			endYear: "Jul 2024",
			grade: "3.75/4.00",
			courses:
				"Data Structures, Algorithms, Web Development, Mobile App Development",
		},
		{
			title: "High School Diploma",
			institute: "ABC High School",
			startYear: "Sept 2014",
			endYear: "Jun 2018",
			grade: "Graduated with Honors",
			courses: "Mathematics, Physics, Computer Science",
		},
		{
			title: "Internship",
			institute: "XYZ Company",
			startYear: "Jan 2024",
			endYear: "Jun 2024",
			courses:
				"Developed and maintained web applications using React and Node.js.",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{education.map((section, index) => (
				<div
					key={index}
					className="card bg-background_secondary shadow-lg rounded-lg p-6 flex flex-col items-left">
					<div className="w-full border-b-2 border-border_primary">
						<h3 className="text-xl text-heading font-semibold font-roboto self-start">
							{section.title}
						</h3>
						<p className="text-sub_heading font-roboto text-base italic">
							{section.institute}
						</p>
					</div>
					<div className="flex flex-row justify-center items-center space-x-3 text-text_primary">
						<BiCheckCircle className="text-green-600 text-lg" />
						<div className="flex flex-col justify-start  items-start flex-1">
							<small className=" text-lg font-roboto text-text_secondary">
								year
							</small>{" "}
							<p className="text-sm text-text_tertiary font-thin italic font-roboto">
								{" "}
								{`${section.startYear} - ${section.endYear}`}
							</p>
						</div>
					</div>

					<div className="flex flex-row justify-start items-start space-x-3 ">
						<BiCheckCircle className="text-green-600 text-lg" />

						<details className="flex flex-col justify-start  items-start flex-1">
							<summary className="px-2 cursor-pointer font-bold">
								courses
							</summary>
							<small className="font-light italic text-text_tertiary font-roboto">
								{section.courses}
							</small>
						</details>
					</div>
				</div>
			))}
		</div>
	);
}
