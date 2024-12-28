/* eslint-disable react/prop-types */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "../hooks/useTheme";
import LandingPage from "./LandingPage";
import FeedbackTable from "./FeedbackTable";
import ExperienceTable from "./ExperienceTable";
import ServicesTable from "./ServicesTable";
import ProjectsTable from "./ProjectsTable";
import SkillsTable from "./SkillsTable";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { AboutContent } from "./AboutContent";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";

library.add(fas, fab);

const Dashboard = () => {
  const [selected, setSelected] = useState("landing");
  const [showSideBar, setShowSideBar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSideBar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function renderSection() {
    const components = {
      landing: <LandingPage />,
      about: <AboutContent />,
      skills: <SkillsTable />,
      experience: <ExperienceTable />,
      feedback: <FeedbackTable />,
      projects: <ProjectsTable />,
      services: <ServicesTable />,
    };
    return components[selected] || null;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {showSideBar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setShowSideBar(false)}
        />
      )}

      <div className="flex flex-col md:flex-row">
        <SideBar
          selected={selected}
          setSelected={setSelected}
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          isMobile={isMobile}
        />

        <div className="flex-1 min-h-screen flex flex-col">
          <Header
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            isMobile={isMobile}
          />
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

const Header = ({ showSideBar, setShowSideBar, isMobile }) => {
  const notificationBounce = useSpring({
    from: { transform: "scale(1)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "scale(1.2)" });
        await next({ transform: "scale(1)" });
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    },
  });

  return (
    <header className="sticky top-0 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 shadow-lg z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSideBar(!showSideBar)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 
                hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FontAwesomeIcon icon={showSideBar ? "times" : "bars"} />
            </motion.button>
          )}

          <div className="flex items-center space-x-4">
            <animated.div style={notificationBounce}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-700 
                  hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FontAwesomeIcon
                  icon="bell"
                  className="text-gray-600 dark:text-gray-200"
                />
                <span
                  className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white 
                  flex items-center justify-center border-2 border-white dark:border-gray-800"
                >
                  3
                </span>
              </motion.button>
            </animated.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 
                rounded-xl p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                  <div
                    className="w-full h-full rounded-xl bg-white dark:bg-gray-800 
                    flex items-center justify-center overflow-hidden"
                  >
                    <FontAwesomeIcon
                      icon="user"
                      className="text-gray-600 dark:text-gray-300"
                    />
                  </div>
                </div>
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full 
                  border-2 border-white dark:border-gray-800"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Amdebirhan
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
};

const SideBar = ({
  selected,
  setSelected,
  showSideBar,
  setShowSideBar,
  isMobile,
}) => {
  const sideNavButtons = [
    { icon: "home", text: "Home", value: "landing" },
    { icon: "user", text: "About", value: "about" },
    { icon: "briefcase", text: "Experience", value: "experience" },
    { icon: "star", text: "Feedback", value: "feedback" },
    { icon: "code", text: "Skills", value: "skills" },
    { icon: "folder-open", text: "Projects", value: "projects" },
    { icon: "cogs", text: "Services", value: "services" },
    { icon: "envelope", text: "Messages", value: "messages" },
    { icon: "sliders-h", text: "Settings", value: "settings" },
    { icon: "sign-out-alt", text: "Sign out", value: "signOut" },
  ];

  return (
    <AnimatePresence>
      {(!isMobile || showSideBar) && (
        <motion.aside
          initial={isMobile ? { x: -320 } : false}
          animate={{ x: 0 }}
          exit={isMobile ? { x: -320 } : false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed md:sticky top-0 left-0 h-screen w-72 md:w-64 
            bg-white dark:bg-gray-800 shadow-xl z-40 md:z-0"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 
                  rounded-lg flex items-center justify-center"
                >
                  <FontAwesomeIcon icon="th" className="text-white" />
                </div>
                <h1
                  className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                  text-transparent bg-clip-text"
                >
                  Dashboard
                </h1>
              </div>
              {isMobile && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSideBar(false)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-200 
                    hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon="times" />
                </motion.button>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1 px-3">
                {sideNavButtons.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => {
                        setSelected(item.value);
                        if (isMobile) setShowSideBar(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl
                        transition-all duration-200
                        ${
                          selected === item.value
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }
                      `}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <span className="font-medium">{item.text}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t dark:border-gray-700">
              <ToggleMode />
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

const ToggleMode = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleDarkMode}
      className="w-full flex items-center justify-between p-3 rounded-xl
        bg-gray-100 dark:bg-gray-700
        text-gray-600 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors duration-200"
    >
      <span className="font-medium">Theme</span>
      <motion.div
        animate={{ rotate: darkMode ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon
          icon={darkMode ? "sun" : "moon"}
          className={`text-xl ${
            darkMode ? "text-yellow-400" : "text-blue-600"
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

export default Dashboard;
