import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./portfolio/NavBar";
import Footer from "./portfolio/Footer";
import Home from "./portfolio/Home";
import Contact from "./portfolio/Contact";
import Services from "./portfolio/Services";
import Projects from "./portfolio/Projects";
import About from "./portfolio/About";
import Skills from "./portfolio/Skills";

import Dashboard from "./dashboard/Dashboard";
import Login from "./dashboard/components/Login";
import Register from "./dashboard/components/Register";
import { ExperienceProvider } from "./context/ExperienceProvider";
import { EducationProvider } from "./context/EducationProvider";
import { FeedbackProvider } from "./context/FeedbackProvider";
import { ProjectProvider } from "./context/ProjectsProvider";

const App = () => {
	return (
		<ExperienceProvider>
			<EducationProvider>
				<FeedbackProvider>
					<ProjectProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Portfolio />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
							</Routes>
						</BrowserRouter>
					</ProjectProvider>
				</FeedbackProvider>
			</EducationProvider>
		</ExperienceProvider>
	);
};

export default App;

const Portfolio = () => {
	//FIXME move this functionality to custom hooks
	const [activeLink, setActiveLink] = useState("");

	const handleScroll = () => {
		const scrollPosition = window.scrollY + window.innerHeight / 2;

		const sections = document.querySelectorAll("section");
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;

			if (
				scrollPosition >= sectionTop &&
				scrollPosition < sectionTop + sectionHeight
			) {
				setActiveLink(section.id);
			}
		});
	};

	useEffect(() => {
		// Adding scroll event listener
		window.addEventListener("scroll", handleScroll);

		// Cleaning up the event listener
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// useEffect(() => {
	// 	document.body.classList.add("light");
	// }, []);

	return (
		<div className="h-full scroll-smooth bg-background_secondary transition-colors duration-700 ">
			<NavBar activeLink={activeLink} setActiveLink={setActiveLink} />
			<main className="flex flex-col justify-center items-center w-full gap-y-10 transition-colors duration-300">
				<Home />
				<About />
				<Skills />
				<Projects />
				<Services />
				<Contact />
			</main>
			<Footer />
		</div>
	);
};
