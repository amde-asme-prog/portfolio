import { useEffect, useState, useRef } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/dashboard/Login";
import Register from "./components/dashboard/Register";

const App = () => {
	const [theme, setTheme] = useState("dark");

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

const HomePage = () => {
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

	useEffect(() => {
		document.body.classList.add("light");
	}, []);

	return (
		<div className=" h-full scroll-smooth bg-background_secondary transition-colors duration-700 ">
			<NavBar activeLink={activeLink} setActiveLink={setActiveLink} />
			<main className="flex flex-col justify-center items-center w-full gap-y-10 ">
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
