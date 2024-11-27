import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useSkillsQuery } from "../hooks/skillsQuery";

library.add(fab, fas);

const Skills = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const { data: skillsData, isLoading, error } = useSkillsQuery();

  if (isLoading) {
    return (
      <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center p-8 bg-red-900/20 rounded-2xl border border-red-500/20">
            <p className="text-xl text-red-400">Unable to load skills data</p>
          </div>
        </div>
      </section>
    );
  }

  const technicalSkills = skillsData.filter(
    (skill) => skill.group === "technical"
  );
  const professionalSkills = skillsData.filter(
    (skill) => skill.group === "professional"
  );

  return (
    <section
      id="skills"
      className="w-full min-h-screen py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-8">
            Skills & Expertise
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Combining technical excellence with professional acumen to deliver
            innovative solutions across multiple platforms and technologies.
          </p>
        </motion.div>

        <div className="flex justify-center mb-16 gap-4">
          <TabButton
            active={activeTab === "technical"}
            onClick={() => setActiveTab("technical")}
          >
            <FontAwesomeIcon icon={["fas", "code"]} className="mr-2" />
            Technical Skills
          </TabButton>
          <TabButton
            active={activeTab === "professional"}
            onClick={() => setActiveTab("professional")}
          >
            <FontAwesomeIcon icon={["fas", "briefcase"]} className="mr-2" />
            Professional Skills
          </TabButton>
        </div>

        {activeTab === "technical" ? (
          <TechnicalSkills technicalSkills={technicalSkills} />
        ) : (
          <ProfessionalSkills professionalSkills={professionalSkills} />
        )}
      </div>
    </section>
  );
};

const TabButton = ({ children, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

const TechnicalSkills = ({ technicalSkills }) => {
  const categories = ["front-end", "back-end", "mobile-app"];

  return (
    <div className="space-y-20">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={[
                  "fas",
                  category === "front-end"
                    ? "desktop"
                    : category === "back-end"
                    ? "server"
                    : "mobile",
                ]}
                className="text-white"
              />
            </div>
            {category.replace("-", " ").charAt(0).toUpperCase() +
              category.slice(1).replace("-", " ")}{" "}
            Development
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {technicalSkills
              .filter((skill) => skill.type === category)
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
    className="group relative bg-slate-800 rounded-2xl p-6 hover:bg-slate-700/50 transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="size-16 flex items-center justify-center bg-slate-700 rounded-xl text-3xl text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
          <FontAwesomeIcon icon={["fab", skill.icon]} />
        </div>
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-lg">
          {skill.proficiency}%
        </div>
      </div>
      <h3 className="text-lg font-medium text-slate-200 text-center group-hover:text-white transition-colors duration-300">
        {skill.name}
      </h3>
    </div>
  </motion.div>
);

const ProfessionalSkills = ({ professionalSkills }) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {professionalSkills.map((skill, index) => (
      <motion.div
        key={index}
        className="bg-slate-800 rounded-2xl p-8 hover:bg-slate-700/50 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <div className="text-4xl mb-6 text-emerald-400">
          <FontAwesomeIcon icon={skill.icon} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-6">{skill.name}</h3>
        <div className="relative">
          <div className="flex mb-3 items-center justify-between">
            <span className="text-sm font-medium text-slate-400">
              Proficiency
            </span>
            <span className="text-sm font-medium text-emerald-400">
              {skill.proficiency}%
            </span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default Skills;
