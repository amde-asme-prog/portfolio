import { useState } from "react";
import {
  FaBars,
  FaChartPie,
  FaProjectDiagram,
  FaRegSun,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import { FcServices } from "react-icons/fc";
import { BiMessage } from "react-icons/bi";
import { GiClassicalKnowledge, GiSkills } from "react-icons/gi";
import { GrUserExpert } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";

import FeedbackTable from "./FeedbackTable";
import EducationTable from "./EducationTable";
import ExperienceTable from "./ExperienceTable";
import ServicesTable from "./ServicesTable";
import ProjectsTable from "./ProjectsTable";
import SkillsTable from "./SkillsTable";
import useTheme from "../hooks/useTheme";

const Dashboard = () => {
  const [selected, setSelected] = useState("education");
  const [showSideBar, setShowSideBar] = useState(false);

  const sideNavButtons = [
    { icon: FaChartPie, name: "Dashboard", value: "dashboard" },
    { icon: GiClassicalKnowledge, name: "Education", value: "education" },
    { icon: GrUserExpert, name: "Experience", value: "experience" },
    { icon: VscFeedback, name: "Feedback", value: "feedback" },
    { icon: GiSkills, name: "Skills", value: "skills" },
    { icon: FaProjectDiagram, name: "Projects", value: "projects" },
    { icon: FcServices, name: "Services", value: "services" },
    { icon: BiMessage, name: "Messages", value: "messages" },
    { icon: FaRegSun, name: "Settings", value: "Settings" },
    { icon: FaSignOutAlt, name: "Sign out", value: "SignOut" },
  ];
  //! toggling the dark mode
  const { darkMode, toggleDarkMode } = useTheme();

  function renderSection() {
    if (selected === "skills") {
      return <SkillsTable />;
    } else if (selected === "education") {
      return <EducationTable />;
    } else if (selected === "experience") {
      return <ExperienceTable />;
    } else if (selected === "feedback") {
      return <FeedbackTable />;
    } else if (selected === "projects") {
      return <ProjectsTable />;
    } else if (selected === "services") {
      return <ServicesTable />;
    }
    //  else if (selected === "messages") {
    // 	return <Messages />;
    // } else if (selected === "settings") {
    // 	return <Settings />;
    // } else if (selected === "signout") {
    // 	return <SignOut />;
    // }
  }
  return (
    <main
      className={`${""} relative w-full bg-background_container bg-cover text-text_primary`}
    >
      {/*//! configuring the background of these dashboard content  */}
      <div className="w-full h-full bg-background_container fixed"></div>

      <header className="fixed top-0 z-20 w-full flex justify-between items-center p-4 bg-background_header border-b border-border_primary shadow-md">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowSideBar((prev) => !prev)}
            className="p-2 text-sm text-text_primary rounded-lg md:hidden mr-8 hover:bg-background_link_hover focus:outline-none focus:ring-2 focus:ring-border_primary"
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="w-6 h-6" aria-hidden="true" />
          </button>

          <h1 className="text-2xl font-bold text-heading">Amdebirhan</h1>
        </div>
        <div className="sm:flex items-center space-x-4">
          <div className="p-2 ml-2 text-text_secondary">
            {darkMode ? (
              <>
                <BsBrightnessHighFill
                  cursor="pointer"
                  size={20}
                  color="red"
                  onClick={toggleDarkMode}
                />
              </>
            ) : (
              <BsMoonFill
                cursor="pointer"
                size={20}
                onClick={toggleDarkMode}
                color="blue"
              />
            )}
          </div>
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="size-8 max-sm:justify-self-end sm:size-12 rounded-full border-2 border-border_card"
          />
        </div>
      </header>

      <aside
        className={`${
          showSideBar
            ? " inset-0 backdrop-sm translate-x-0"
            : "-translate-x-[100%]"
        } md:block md:translate-x-0 fixed left-0 top-0 h-full pt-24 w-64 bg-background_container border-r border-border_primary z-10 transition-transform ease-in-out duration-200`}
      >
        <ul className="flex flex-col space-y-2 p-4 py-2">
          {sideNavButtons.map((item, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-background_link_hover ${
                item.value === selected ? "bg-background_link_active" : ""
              }`}
              onClick={() => setSelected(item.value)}
            >
              <item.icon className="text-icon_color" />
              <span>{item.name}</span>
            </button>
          ))}
          <div className="w-full h-px bg-border_primary"></div>
          <FaTimes
            size={28}
            onClick={() => setShowSideBar(false)}
            className="self-end size-fit cursor-pointer"
          />
        </ul>
      </aside>

      <div
        className={`${
          showSideBar == true
            ? "max-md:pointer-events-none max-md:opacity-50 max-md:blur-[1px] "
            : ""
        } absolute top-28  right-4 left-4 md:left-72 mb-10 border-2 border-dashed border-border_primary rounded-lg bg-background_card p-3 shadow-md transition-opacity`}
      >
        {renderSection()}
      </div>
    </main>
  );
};

export default Dashboard;
