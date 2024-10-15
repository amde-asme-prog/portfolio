/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

// Add icons to the library
library.add(fab, fas);

const Skills = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const skills = {
    technicalSkills: [
      { name: "JavaScript", level: 80, icon: "js", part: "front-end" },
      { name: "React", level: 80, icon: "react", part: "front-end" },
      { name: "React Native", level: 60, icon: "react", part: "mobile-app" },
      { name: "Next.js", level: 70, icon: "react", part: "front-end" },
      { name: "Vue", level: 50, icon: "vuejs", part: "front-end" },
      { name: "Flutter", level: 60, icon: "flutter", part: "mobile-app" },
      { name: "Node.js", level: 50, icon: "node-js", part: "back-end" },
      { name: "Express.js", level: 60, icon: "server", part: "back-end" },
      { name: "TailwindCSS", level: 85, icon: "css3-alt", part: "front-end" },
      { name: "Java", level: 50, icon: "java", part: "back-end" },
      { name: "Laravel", level: 60, icon: "laravel", part: "back-end" },
    ],
    professionalSkills: [
      { name: "Communication", level: 85, icon: "comments" },
      { name: "Teamwork", level: 90, icon: "users" },
      { name: "Problem Solving", level: 80, icon: "lightbulb" },
      { name: "Project Management", level: 75, icon: "tasks" },
    ],
  };

  return (
    <section
      id="skills"
      className="w-full py-24 bg-gradient-to-b from-background_container to-background_card_accent"
    >
      <div className="max-w-6xl mx-auto px-5">
        <motion.h1
          className="text-5xl font-bold text-heading text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h1>

        <motion.p
          className="text-text_secondary text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          As a versatile developer, I've cultivated a diverse skill set that
          spans front-end, back-end, and mobile app development. My expertise
          allows me to create seamless, responsive, and user-centric
          applications across various platforms. Beyond technical proficiency, I
          pride myself on strong professional skills that enhance teamwork and
          project success.
        </motion.p>

        <div className="flex justify-center mb-12 gap-4">
          <TabButton
            active={activeTab === "technical"}
            onClick={() => setActiveTab("technical")}
          >
            Technical Skills
          </TabButton>
          <TabButton
            active={activeTab === "professional"}
            onClick={() => setActiveTab("professional")}
          >
            Professional Skills
          </TabButton>
        </div>

        {activeTab === "technical" ? (
          <TechnicalSkills technicalSkills={skills.technicalSkills} />
        ) : (
          <ProfessionalSkills professionalSkills={skills.professionalSkills} />
        )}
      </div>
    </section>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <button
    className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
      active
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TechnicalSkills = ({ technicalSkills }) => {
  const categories = ["front-end", "back-end", "mobile-app"];

  return (
    <div className="space-y-16">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h2 className="text-3xl font-bold text-sub_heading mb-6 capitalize">
            {category.replace("-", " ")} Development
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {technicalSkills
              .filter((skill) => skill.part === category)
              .map((skill, skillIndex) => (
                <Skill key={skillIndex} skill={skill} />
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Skill = ({ skill }) => (
  <motion.div
    className="flex flex-col items-center p-4 gap-3 bg-background_card rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <div className="shadow-md size-16 flex items-center justify-center bg-background_container p-3 rounded-full text-3xl text-text_primary relative">
      <FontAwesomeIcon icon={["fab", skill.icon]} className="size-full" />
      <span className="absolute -top-3 -right-6 text-xs font-semibold py-1 px-2 rounded-full text-blue-600 bg-background_container bg-opacity-50">
        {skill.level}%
      </span>
    </div>
    <h3 className="text-lg font-semibold text-text_secondary text-center">
      {skill.name}
    </h3>
  </motion.div>
);

const ProfessionalSkills = ({ professionalSkills }) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {professionalSkills.map((skill, index) => (
      <motion.div
        key={index}
        className="bg-background_card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
      >
        <div className="text-4xl mb-4 text-blue-600">
          <FontAwesomeIcon icon={skill.icon} />
        </div>
        <h3 className="text-xl font-semibold text-text_secondary mb-4">
          {skill.name}
        </h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {skill.level}%
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default Skills;
