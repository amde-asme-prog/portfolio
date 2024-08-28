import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
	FaDownload,
	FaDribbble,
	FaGithub,
	FaLinkedin,
	FaTwitter,
} from "react-icons/fa";

import { TypeAnimation } from "react-type-animation";
import { RiShakeHandsLine } from "react-icons/ri";

const Home = () => {
	const referenceIcons = [
		{
			href: "https://github.com/amde-asme-prog",
			label: "GitHub",
			icon: <FaGithub />,
		},
		{
			href: "https://www.linkedin.com/in/amdebirhan-asmamaw",
			label: "LinkedIn",
			icon: <FaLinkedin />,
		},
		{
			href: "https://twitter.com/amdebirhanasmamaw",
			label: "Twitter",
			icon: <FaTwitter />,
		},
		{
			href: "https://dribbble.com/amdebirhanasmamaw",
			label: "Dribbble",
			icon: <FaDribbble />,
		},
	];

	const downloadCv = () => {};

	return (
		<section
			id="home"
			className=" flex flex-col lg:flex-row w-full pt-28 bg-background_primary pb-20">
			<div className="flex flex-col gap-y-6 w-full lg:w-5/6 px-3 sm:px-4 md:px-8 lg:px-10 py-5 lg:py-6">
				<div className="flex flex-col gap-y-8">
					<div className="text-6xl max-sm:text-3xl max-md:text-4xl font-extrabold text-text_primary ">
						Hello,
					</div>
					<div className="text-6xl max-sm:text-3xl max-md:text-4xl font-bold text-text_primary ">
						This is{" "}
						<span className="text-text_tertiary font-roboto font-bold ">
							Amdebirhan,
						</span>{" "}
						I’m
					</div>
					<TypeWriter />
				</div>
				<div className="relative flex flex-row items-center justify-left text-center gap-x-2 text-3xl sm:text-4xl md:text-5xl">
					{referenceIcons.map((item, index) => (
						<>
							{index > 0 && <div className="h-px w-4 bg-button_primary "></div>}
							<a
								key={index}
								href={item.href}
								target="_blank"
								rel="noreferrer"
								aria-label={item.label}
								className="text-button_primary hover:text-button_hover transition-transform transform hover:scale-110">
								{item.icon}
							</a>
						</>
					))}
				</div>
				<div className="flex flex-row justify-start gap-x-4 max-md:justify-center max-md:w-full items-center pt-4">
					{/* <form method="get" action="/public/assets/amdebirhan_asmamaw-cv.pdf"> */}
					<a
						href="/assets/amdebirhan_asmamaw-cv.pdf"
						download="amdebirhan asmamaw cv.pdf"
						className="flex flex-row items-center gap-3 uppercase text-button_primary bg-transparent text-lg rounded-3xl border-button_border border-2 px-5 py-3 transition-transform transform  hover:scale-105 animate-pulse">
						resume
						<FaDownload className="inline-flex text-sm sm:text-base lg:text-lg" />
					</a>
					{/* </form> */}
					<button className="uppercase rounded-3xl bg-button_primary text-button_text px-5 py-3 flex flex-row items-center gap-3 text-lg   border-2 border-button_border transition-transform transform hover:animate-pulse hover:bg-button_primary hover:scale-105">
						hire me
						<RiShakeHandsLine
							size={24}
							className="inline-flex text-sm sm:text-base lg:text-lg"
						/>
					</button>
				</div>
			</div>
			<div className="flex w-full lg:w-1/2 items-center justify-center bg-contain overflow-hidden">
				<img
					src="/assets/coder.svg"
					alt="coding"
					className="max-w-full h-auto  transition-transform scale-150"
				/>
			</div>
		</section>
	);
};

export default Home;

const TypeWriter = () => {
	return (
		<TypeAnimation
			sequence={[
				"A Full Stack Developer",
				1000,
				"A Mobile App Developer",
				1000,
				"A Software Developer",
				1000,
			]}
			wrapper="span"
			speed={50}
			className="text-6xl font-roboto font-bold max-sm:text-3xl max-md:text-4xl  text-red-500 mb-3"
			repeat={Infinity}
		/>
	);
};
