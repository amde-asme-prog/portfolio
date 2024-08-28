import React, { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import Education from "./Education";
import Experience from "./Experience";
import Testimonials from "./Testimonials";

const About = () => {
	const [activeSection, setActiveSection] = useState("education");

	const renderContent = () => {
		if (activeSection === "education") {
			return <Education />;
		} else if (activeSection === "experience") {
			return <Experience />;
		} else if (activeSection === "testimonials") {
			return <div className="testimonials">{Testimonials()}</div>;
		}
	};

	return (
		<section
			id="about"
			className="w-full pt-28 bg-background_primary text-text_primary">
			<div className="flex justify-around max-md:flex-col max-md:justify-center gap-x-8 p-8 max-md:p-4 w-full">
				<div className="self-start  w-1/3 p-8 pt-0 gap-y-4 max-md:w-full">
					<div>
						<h1 className="capitalize font-extrabold text-5xl text-center mb-8">
							About Me
						</h1>
					</div>
					<img
						src="/assets/amdebirhan_asmamaw.jpg"
						className="w-full bg-cover rounded-2xl shadow-2xl"
						alt="about"
					/>
				</div>
				<div className="self-start px-4 max-md:px-2 flex-1 gap-6 space-y-6">
					<p className="font-roboto font-thin italic rounded-md shadow-md bg-background_primary bg-opacity-20  p-4">
						Computer Science graduate skilled in web and mobile app development
						using React, Flutter, and Next.js. Motivated, detail-oriented, and a
						problem solver, eager to enhance tech projects and user experiences.
						Passionate about technology, effective communicator, and dedicated
						to continuous learning.
					</p>
					<div
						className="flex space-x-8"
						role="group"
						aria-labelledby="about-me-tabs">
						{["education", "experience", "testimonials"].map((item, index) => (
							<button
								key={index}
								onClick={() => setActiveSection(item)}
								className={`${
									activeSection === item ? "text-red-500" : ""
								} capitalize font-roboto font-bold`}>
								{" "}
								{item}{" "}
							</button>
						))}
					</div>
					{renderContent()}
				</div>
			</div>
		</section>
	);
};

export default About;

//! rendering testimonials
