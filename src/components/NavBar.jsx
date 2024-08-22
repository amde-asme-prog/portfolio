import { useState, useEffect } from "react";
import {
	BiArrowToTop,
	BiBrightness,
	BiMenu,
	BiToggleLeft,
} from "react-icons/bi";
import {
	BsBrightnessAltHighFill,
	BsBrightnessHigh,
	BsBrightnessHighFill,
	BsMoonFill,
	BsToggle2On,
	BsToggleOff,
	BsToggleOn,
} from "react-icons/bs";
import {
	FaHome,
	FaUser,
	FaProjectDiagram,
	FaEnvelope,
	FaTimes,
} from "react-icons/fa";
import { FaToggleOn, FaToggleOff } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { GrServices } from "react-icons/gr";
import { PiArrowCircleUpFill } from "react-icons/pi";

import { Link, animateScroll } from "react-scroll";

const Navbar = (props) => {
	const [showMenu, setShowMenu] = useState(false);
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		if (!darkMode) {
			document.body.classList.add("dark");
			document.body.classList.remove("light");
			localStorage.setItem("color-theme", "dark");
			setDarkMode(true);
		} else {
			document.body.classList.add("light");
			document.body.classList.remove("dark");
			localStorage.setItem("color-theme", "light");
			setDarkMode(false);
		}
	};

	//! when the app mounts, checking if the user has a color-theme stored in local storage
	useEffect(() => {
		if (localStorage.getItem("color-theme")) {
			console.log(localStorage.getItem("color-theme"));
			if (localStorage.getItem("color-theme") === "light") {
				if (document.body.classList.contains("dark")) {
					document.body.classList.remove("dark");
				}
				document.body.classList.add("light");
				setDarkMode(false);
			} else if (localStorage.getItem("color-theme") === "dark") {
				if (document.body.classList.contains("light")) {
					document.body.classList.remove("light");
				}
				document.body.classList.add("dark");
				setDarkMode(true);
			}
		}
	}, []);

	useEffect(() => {
		//! Adding scroll event listener
		window.addEventListener("scroll", handleScroll);
		//! Cleaning up the event listener
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		setShowMenu(false);
	};

	const { activeLink, setActiveLink } = props;

	const handleLinkClick = (linkId) => {
		const element = document.querySelector(linkId);
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: "smooth",
			});
		}
		setActiveLink(linkId);
	};

	const handleLinkClickWithShowMenu = (linkId) => {
		handleLinkClick(linkId);
		setShowMenu(false);
	};

	return (
		<header className="bg-background_secondary p-4 fixed top-0 w-full z-50 shadow-lg transition-shadow duration-300">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center">
					<img src="/path/to/logo.png" alt="Logo" className="h-12 w-12 mr-3" />
					<span className="text-2xl font-bold text-heading">
						Amdebirhan Asmamaw
					</span>
				</div>

				{/* //! for mobile and tablet */}
				<div className="lg:hidden flex items-center">
					{!showMenu ? (
						<BiMenu
							size={32}
							color="gray-800"
							cursor={"pointer"}
							onClick={() => setShowMenu(!showMenu)}
						/>
					) : (
						<>
							<FaTimes
								size={32}
								color="gray-800"
								cursor={"pointer"}
								onClick={() => setShowMenu(!showMenu)}
							/>
							<nav className="lg:hidden flex flex-col gap-y-2 items-end fixed top-16 right-0 py-4 px-6 rounded-lg bg-background_primary  dark:border-gray-700 z-10 border-2 border-slate-200 shadow-md">
								<NavItems
									activeLink={activeLink}
									handleLinkClick={handleLinkClickWithShowMenu}
									darkMode={darkMode}
									toggleDarkMode={toggleDarkMode}
								/>
							</nav>
						</>
					)}
				</div>
				{/* //! for larger devices */}
				<div className="hidden lg:flex">
					<nav className="flex space-x-2">
						<NavItems
							activeLink={activeLink}
							handleLinkClick={handleLinkClick}
							darkMode={darkMode}
							toggleDarkMode={toggleDarkMode}
						/>
					</nav>
				</div>
			</div>

			<PiArrowCircleUpFill
				size={50}
				cursor={"pointer"}
				color="blue-black"
				onClick={() => {
					animateScroll.scrollToTop();
				}}
				className={
					activeLink === "home" || activeLink === ""
						? "hidden"
						: "animate-bounce fixed bottom-4 right-4 z-50 shadow-lg rounded-full overflow-hidden  backdrop-blur"
				}
			/>
		</header>
	);
};

export default Navbar;

const NavItems = ({
	activeLink,
	handleLinkClick,
	darkMode,
	toggleDarkMode,
}) => {
	return (
		<>
			<NavItem
				href="#home"
				label="Home"
				icon={<FaHome size={12} />}
				active={activeLink === "home" || activeLink === ""}
				handleLinkClick={() => handleLinkClick("#home")}
			/>
			<NavItem
				href="#about"
				label="About"
				icon={<FaUser size={12} />}
				active={activeLink === "about"}
				handleLinkClick={() => handleLinkClick("#about")}
			/>
			<NavItem
				href="#skills"
				label="Skills"
				icon={<GiSkills size={12} />}
				active={activeLink === "skills"}
				handleLinkClick={() => handleLinkClick("#skills")}
			/>
			<NavItem
				href="#projects"
				label="Projects"
				icon={<FaProjectDiagram size={12} />}
				active={activeLink === "projects"}
				handleLinkClick={() => handleLinkClick("#projects")}
			/>
			<NavItem
				href="#services"
				label="Services"
				icon={<GrServices size={12} />}
				active={activeLink === "services"}
				handleLinkClick={() => handleLinkClick("#services")}
			/>
			<NavItem
				href="#contact"
				label="Contact"
				icon={<FaEnvelope size={12} />}
				active={activeLink === "contact"}
				handleLinkClick={() => handleLinkClick("#contact")}
			/>
			<div className="p-2 ml-2 text-text_secondary">
				{darkMode ? (
					<>
						<BsBrightnessHighFill
							cursor="pointer"
							size={20}
							color="blue"
							onClick={toggleDarkMode}
						/>
					</>
				) : (
					<BsMoonFill
						cursor="pointer"
						size={20}
						onClick={toggleDarkMode}
						color="red"
					/>
				)}
			</div>
		</>
	);
};

const NavItem = ({ href, label, icon, active, handleLinkClick }) => (
	<Link
		to={href.substring(1)} // Remove '#' from href
		spy={true}
		smooth={true}
		offset={-70} // Adjust scroll position as needed
		duration={500} // Duration of the scroll animation
		className={` ${
			active
				? "font-bold text-blue-600 bg-background_primary border-text_tertiary"
				: "bg-background_secondary hover:bg-opacity-10"
		} flex cursor-pointer items-center p-2 text-text_secondary  max-md:hover:border-blue-500 rounded-lg border-b-4 max-md:border-r-2 border-background_primary hover:bg-background_primary hover:border-blue-500 hover:text-text_tertiary transition-all duration-300`}>
		{icon}
		<span className="ml-2 text-sm">{label}</span>
	</Link>
);
