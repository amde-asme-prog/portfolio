import React, { useContext, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaTasks,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ExperienceContext from "../context/ExperienceProvider";

export default function Experience() {
  const { experience } = useContext(ExperienceContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {experience.map((job, index) => (
        <JobCard key={index} job={job} index={index} />
      ))}
    </div>
  );
}

function JobCard({ job, index }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-background_card rounded-xl shadow-lg overflow-hidden text-start text-text_secondary"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="font-bold text-2xl text-white mb-2">{job.title}</h2>
        <div className="flex items-center text-white text-opacity-90">
          <FaBriefcase className="mr-2" />
          <span className="font-medium">{job.company}</span>
        </div>
        <div className="flex items-center text-white text-opacity-90 mt-2">
          <FaCalendarAlt className="mr-2" />
          <span>{job.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <ExpandableSection
          title="Responsibilities"
          items={job.responsibilities}
          icon={<FaTasks className="mr-2" />}
          showDetails={showDetails}
        />
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech, i) => (
              <span
                key={i}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <ExpandableSection
          title="Key Achievements"
          items={job.achievements}
          showDetails={showDetails}
        />
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          {showDetails ? (
            <>
              Show Less <FaChevronUp className="ml-2" />
            </>
          ) : (
            <>
              Show More <FaChevronDown className="ml-2" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function ExpandableSection({ title, items, icon, showDetails }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-3 flex items-center">
        {icon} {title}
      </h3>
      <ul className="space-y-2">
        <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
          <span className="mr-2 mt-1">•</span>
          <span>{items[0]}</span>
        </li>
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {items.slice(1).map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                >
                  <span className="mr-2 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}
