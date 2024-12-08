import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "../hooks/useTheme";
import LandingPage from "./LandingPage";
import FeedbackTable from "./FeedbackTable";
// import EducationTable from "./EducationTable";
import ExperienceTable from "./ExperienceTable";
import ServicesTable from "./ServicesTable";
import ProjectsTable from "./ProjectsTable";
import SkillsTable from "./SkillsTable";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { AboutContent } from "./AboutContent";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <SideBar
        selected={selected}
        setSelected={setSelected}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowSideBar(!showSideBar)}
              className="md:hidden text-gray-600 dark:text-gray-200"
            >
              <FontAwesomeIcon icon="bars" size="lg" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FontAwesomeIcon
                  icon="bell"
                  className="text-gray-600 dark:text-gray-200 cursor-pointer"
                />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <FontAwesomeIcon icon="user" className="text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div
            className={`
            container mx-auto px-4 py-6
            ${
              showSideBar
                ? "max-sm:pointer-events-none max-sm:opacity-50 max-sm:blur-[1px]"
                : ""
            }
          `}
          >
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

function SideBar({ selected, setSelected, showSideBar, setShowSideBar }) {
  const sideNavButtons = [
    { icon: "chart-pie", text: "Home", value: "landing" },
    { icon: "person", text: "About", value: "about" },
    // { icon: "user-graduate", text: "Education", value: "education" },
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
      fixed md:relative max-sm:z-10
      w-64 h-screen
      transition-transform duration-300 ease-in-out
      bg-white dark:bg-gray-800 shadow-lg
      ${showSideBar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button
            onClick={() => setShowSideBar(false)}
            className="md:hidden text-gray-600 dark:text-gray-200"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sideNavButtons.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelected(item.value)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg
                    transition-colors duration-200
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

        <div className="p-4 border-t dark:border-gray-700">
          <ToggleMode />
        </div>
      </div>
    </aside>
  );
}

function ToggleMode() {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <button
      onClick={toggleDarkMode}
      className="w-full flex items-center justify-between p-2 rounded-lg
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <span>Theme</span>
      <FontAwesomeIcon
        icon={darkMode ? "sun" : "moon"}
        className={darkMode ? "text-yellow-400" : "text-blue-600"}
      />
    </button>
  );
}

export default Dashboard;
