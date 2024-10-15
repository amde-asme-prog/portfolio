import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBriefcase, FaQuoteRight } from "react-icons/fa";

import Experience from "./Experience";
import Testimonials from "./Testimonials";

const About = () => {
  const [activeSection, setActiveSection] = useState("experience");

  const sections = [
    {
      id: "experience",
      title: "Experience",
      component: Experience,
      icon: FaBriefcase,
    },

    {
      id: "testimonials",
      title: "Testimonials",
      component: Testimonials,
      icon: FaQuoteRight,
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-20 bg-gradient-to-br from-background_container to-background_card_accent"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-text_primary">
          About Me
        </h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl"></div>
              <img
                src="/assets/amdebirhan_asmamaw.jpg"
                className="absolute inset-2 w-60 h-60 object-cover rounded-full border-4 border-white"
                alt="Amdebirhan Asmamaw"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-70 p-4 rounded-lg max-w-[90%]">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    Amdebirhan Asmamaw
                  </h2>
                  <p className="text-sm text-gray-200">
                    Computer Science graduate skilled in web and mobile app
                    development. Passionate about technology and continuous
                    learning.
                  </p>
                </div>
              </div>
            </div>
            <motion.div
              className="bg-background_container p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-text_primary">
                Professional Summary
              </h2>
              <p className="text-text_subtle mb-4">
                Skilled in React, Flutter, and Next.js for web and mobile app
                development. Motivated problem-solver with a keen eye for
                detail.
              </p>
              <p className="text-text_subtle">
                Dedicated to enhancing tech projects and user experiences
                through effective communication and continuous learning.
              </p>
            </motion.div>
          </motion.div>
          <div className="lg:w-2/3">
            <div className="flex flex-wrap justify-center mb-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 m-2 rounded-full text-sm font-medium transition-all flex items-center ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <section.icon className="mr-2" />
                  {section.title}
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-background_card_accent rounded-xl shadow-lg p-6"
              >
                {sections
                  .find((section) => section.id === activeSection)
                  .component()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
