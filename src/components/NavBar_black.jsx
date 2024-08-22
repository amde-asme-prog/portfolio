import { useState, useEffect } from "react";
import { BiArrowToTop, BiMenu } from "react-icons/bi";
import {
	FaHome,
	FaUser,
	FaProjectDiagram,
	FaEnvelope,
	FaTimes,
} from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { GrServices } from "react-icons/gr";

const Navbar = (props) => {
	const [showMenu, setShowMenu] = useState(false);
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
		<header className="bg-white text-gray-800 p-4 fixed top-0 w-full z-50 shadow-lg transition-shadow duration-300">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center">
					<img src="/path/to/logo.png" alt="Logo" className="h-12 w-12 mr-3" />
					<span className="text-2xl font-bold text-gray-900">
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
							<nav className="lg:hidden flex flex-col gap-y-2 items-end fixed top-16 right-0 py-4 px-6 rounded-lg bg-gray-800 z-10 border-2 border-gray-700 shadow-md">
								<NavItems
									activeLink={activeLink}
									handleLinkClick={handleLinkClickWithShowMenu}
								/>
							</nav>
						</>
					)}
				</div>
				{/* //! for larger devices */}
				<div className="hidden lg:flex">
					<nav className="flex space-x-6">
						<NavItems
							activeLink={activeLink}
							handleLinkClick={handleLinkClick}
						/>
					</nav>
				</div>
			</div>
			<div
				className={
					activeLink === "home" || activeLink === ""
						? "hidden"
						: "animate-bounce fixed bottom-4 right-4 z-50 shadow-lg bg-blue-500 rounded-full p-3 backdrop-blur"
				}>
				<BiArrowToTop size={36} color="white" cursor={"pointer"} />
			</div>
		</header>
	);
};

export default Navbar;

const NavItems = ({ activeLink, handleLinkClick }) => {
	return (
		<>
			<NavItem
				href="#home"
				label="Home"
				icon={<FaHome size={16} />}
				active={activeLink === "home" || activeLink === ""}
				handleLinkClick={() => handleLinkClick("#home")}
			/>
			<NavItem
				href="#about"
				label="About"
				icon={<FaUser size={16} />}
				active={activeLink === "about"}
				handleLinkClick={() => handleLinkClick("#about")}
			/>
			<NavItem
				href="#skills"
				label="Skills"
				icon={<GiSkills size={16} />}
				active={activeLink === "skills"}
				handleLinkClick={() => handleLinkClick("#skills")}
			/>
			<NavItem
				href="#projects"
				label="Projects"
				icon={<FaProjectDiagram size={16} />}
				active={activeLink === "projects"}
				handleLinkClick={() => handleLinkClick("#projects")}
			/>
			<NavItem
				href="#services"
				label="Services"
				icon={<GrServices size={16} />}
				active={activeLink === "services"}
				handleLinkClick={() => handleLinkClick("#services")}
			/>
			<NavItem
				href="#contact"
				label="Contact"
				icon={<FaEnvelope size={16} />}
				active={activeLink === "contact"}
				handleLinkClick={() => handleLinkClick("#contact")}
			/>
		</>
	);
};

const NavItem = ({ href, label, icon, active, handleLinkClick }) => (
	<a
		href={href}
		aria-label={label}
		className={`flex items-center p-3 text-gray-800 rounded-lg border-b-4 border-transparent hover:border-blue-500 transition-all duration-300 ${
			active
				? "font-bold text-blue-600 bg-gray-200"
				: "hover:text-blue-600 hover:bg-gray-100"
		}`}
		onClick={handleLinkClick}>
		{icon}
		<span className="ml-2">{label}</span>
	</a>
);
