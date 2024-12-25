import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import { Link, animateScroll } from "react-scroll";
import logo from "/logo.svg";

import useTheme from "../../hooks/useTheme";
import useWindowScroll from "../../hooks/useWindowsScroll";

library.add(fab, fas);

const Header = () => {
  const { activeLink, setActiveLink, showMenu, setShowMenu } =
    useWindowScroll();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <header className="px-12 py-3 bg-blue-300/10 text-stone-800 dark:text-white backdrop-blur-md fixed top-0 w-full z-50 shadow-lg transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-16" />
          <div className="lg:hidden text-text_primary text-4xl md:text-6xl">
            <FontAwesomeIcon
              icon={showMenu ? "times" : "bars"}
              cursor="pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          <nav
            className={`${
              showMenu
                ? "flex flex-col max-sm:bg-white dark:max-sm:bg-gray-800  lg:flex-row gap-4 fixed top-20 right-0 py-4 px-8 rounded-lg bg-opacity-30 backdrop-blur-md shadow-xl transition-all duration-300 ease-linear"
                : "hidden lg:flex lg:flex-row gap-4"
            }`}
          >
            <NavItems activeLink={activeLink} />
            <button
              onClick={toggleDarkMode}
              className="bg-emerald-500 flex items-center justify-center px-4 py-2 rounded-full bg-opacity-30 backdrop-blur-md text-text_header hover:bg-opacity-50 transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={!darkMode ? "sun" : "moon"}
                className="text-lg mr-2"
              />
              <span className="text-sm">{!darkMode ? "Light" : "Dark"}</span>
            </button>
          </nav>
        </div>
      </header>
      <div
        className={`${
          activeLink === "home" || activeLink === ""
            ? "hidden"
            : "  cursor-pointer fixed bottom-10 right-4 z-50 grid place-content-center shadow-xl size-10 rounded-full overflow-hidden backdrop-blur-md bg-opacity-30 text-stone-100 hover:bg-opacity-50 border transition-colors duration-300"
        }`}
      >
        <FontAwesomeIcon
          icon="arrow-up"
          cursor="pointer"
          onClick={() => {
            animateScroll.scrollToTop();
          }}
        />
      </div>
    </>
  );
};

export default Header;

const NavItems = ({ activeLink }) => {
  const navLinks = [
    { href: "#home", label: "Home", icon: "home" },
    { href: "#about", label: "About", icon: "user" },
    { href: "#skills", label: "Skills", icon: "cogs" },
    { href: "#projects", label: "Projects", icon: "project-diagram" },
    { href: "#services", label: "Services", icon: "tools" },
    { href: "#contact", label: "Contact", icon: "envelope" },
  ];
  return (
    <>
      {navLinks.map(({ href, label, icon }) => (
        <Link
          key={href}
          to={href.substring(1)}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className={`${
            activeLink === label.toLowerCase()
              ? "bg-opacity-80 bg-blue-700"
              : ""
          } hover:bg-opacity-60 hover:bg-blue-400 text-stone-800 dark:text-stone-100 cursor-pointer flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 backdrop-blur-md overflow-hidden`}
        >
          <FontAwesomeIcon icon={icon} className="mr-2" />
          <span>{label}</span>
        </Link>
      ))}
    </>
  );
};
