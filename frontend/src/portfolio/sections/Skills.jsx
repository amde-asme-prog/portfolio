/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

library.add(fas, fab);

const Skills = ({ skills }) => {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  useEffect(() => {
    setTechnicalSkills(skills);
  }, [skills]);
  return (
    <section
      id="skills"
      className="px-4  sm:px-8 md:px-12 text-start w-full min-h-screen py-24 bg-gray-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 mb-5 "
    >
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold  bg-clip-text mb-8">
            Skills & Expertise
          </h1>
          <p className="text-slate-800 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Combining technical excellence with professional acumen to deliver
            innovative solutions across multiple platforms and technologies.
          </p>
        </motion.div>

        <TechnicalSkills technicalSkills={technicalSkills || []} />
      </div>
    </section>
  );
};

const TechnicalSkills = ({ technicalSkills }) => {
  const categories = ["front-end", "back-end", "mobile-app"];

  return (
    <div className="px-4 sm:px-8 md:px-10 flex flex-wrap gap-12 w-full">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <h2 className="text-3xl font-bold text-stone-950 dark:text-white mb-8 flex items-center">
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
          <div className="flex flex-wrap gap-6">
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
    className="min-w-40 h-fit group relative shadow-sm bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="size-16 flex items-center justify-center bg-gray-200 shadow-md dark:bg-slate-700 rounded-xl text-3xl text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
          <FontAwesomeIcon icon={["fab", skill.icon]} className="text-white" />
        </div>
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-lg">
          {skill.proficiency}%
        </div>
      </div>
      <h3 className="text-lg font-medium text-stone-900 dark:text-slate-200 text-center">
        {skill.name}
      </h3>
    </div>
  </motion.div>
);

export default Skills;
