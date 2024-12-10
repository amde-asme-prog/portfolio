import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
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
  const isOnline = useOnlineStatus();

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
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Overlay */}
      {showSideBar && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity"
          onClick={() => setShowSideBar(false)}
        />
      )}

      <div className="flex">
        <SideBar
          selected={selected}
          setSelected={setSelected}
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
        />

        <div className="flex-1 min-h-screen flex flex-col">
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <MainContent selected={selected} renderSection={renderSection} />
        </div>
      </div>
    </div>
  );
};

const Header = ({ showSideBar, setShowSideBar }) => {
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
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="flex items-center justify-between h-16 px-4">
        <button
          onClick={() => setShowSideBar(!showSideBar)}
          className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={showSideBar ? "times" : "bars"} size="lg" />
        </button>

        <div className="flex items-center gap-4">
          <animated.div style={notificationBounce} className="relative">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FontAwesomeIcon
                icon="bell"
                className="text-gray-600 dark:text-gray-200"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </animated.div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                <FontAwesomeIcon
                  icon="user"
                  className="text-gray-600 dark:text-gray-300"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Admin
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                admin@example.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const MainContent = ({ selected, renderSection }) => {
  return (
    <main className="flex-1 relative overflow-y-auto">
      <motion.div
        className="container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {renderSection()}
      </motion.div>
    </main>
  );
};

const SideBar = ({ selected, setSelected, showSideBar, setShowSideBar }) => {
  const sideNavButtons = [
    { icon: "chart-pie", text: "Home", value: "landing" },
    { icon: "person", text: "About", value: "about" },
    { icon: "briefcase", text: "Experience", value: "experience" },
    { icon: "clipboard-list", text: "Feedback", value: "feedback" },
    { icon: "laptop-code", text: "Skills", value: "skills" },
    { icon: "project-diagram", text: "Projects", value: "projects" },
    { icon: "box-open", text: "Services", value: "services" },
    { icon: "comment-dots", text: "Messages", value: "messages" },
    { icon: "cog", text: "Settings", value: "settings" },
    { icon: "sign-out-alt", text: "Sign out", value: "signOut" },
  ];

  return (
    <aside
      className={`
        fixed md:sticky top-0 left-0
        h-screen w-64
        bg-white dark:bg-gray-800 
        shadow-lg
        transition-transform duration-300 ease-in-out
        ${showSideBar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        z-40 md:z-0
      `}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={() => setShowSideBar(false)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {sideNavButtons.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelected(item.value);
                    if (window.innerWidth < 768) setShowSideBar(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg
                    transition-all duration-200
                    ${
                      selected === item.value
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t dark:border-gray-700">
          <ToggleMode />
        </div>
      </div>
    </aside>
  );
};
const ToggleMode = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleDarkMode}
      className="w-full flex items-center justify-between p-3 rounded-lg
        bg-gray-50 dark:bg-gray-700
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-600
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
