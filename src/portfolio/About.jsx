import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiCheckCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import Education from "./Education";
import Experience from "./Experience";
import Testimonials from "./Testimonials";

const About = () => {
  const [activeSection, setActiveSection] = useState("education");

  const renderContent = () => {
    return (
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {activeSection === "education" && <Education />}
        {activeSection === "experience" && <Experience />}
        {activeSection === "testimonials" && <Testimonials />}
      </motion.div>
    );
  };

  return (
    <section
      id="about"
      className="w-full pt-28 pb-20 bg-background_container text-text_primary"
    >
      <div className="flex flex-col lg:flex-row justify-around gap-x-8 p-8 max-md:p-4 w-full">
        <div className="self-start lg:w-1/3 w-full p-8 pt-0">
          <h1 className="capitalize font-extrabold text-5xl text-center mb-8">
            About Me
          </h1>
          <motion.img
            src="/assets/amdebirhan_asmamaw.jpg"
            className="w-full rounded-2xl shadow-lg transform hover:scale-105 transition-transform"
            alt="Amdebirhan Asmamaw"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="lg:w-2/3 w-full px-4 max-md:px-2 flex flex-col gap-6">
          <p className="text-text_subtle font-light italic rounded-md shadow-md bg-background_card bg-opacity-20 p-6">
            Computer Science graduate skilled in web and mobile app development
            using React, Flutter, and Next.js. Motivated, detail-oriented, and a
            problem solver, eager to enhance tech projects and user experiences.
            Passionate about technology, effective communicator, and dedicated
            to continuous learning.
          </p>
          <div className="flex justify-around gap-2 pt-4">
            {["education", "experience", "testimonials"].map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item)}
                className={`capitalize text-sm sm:text-base px-3 sm:px-6 py-2 rounded-full transition-colors duration-300 border border-border_primary ${
                  activeSection === item
                    ? "bg-red-500 text-text_secondary"
                    : "bg-background_card hover:bg-opacity-70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          > */}
          {renderContent()}
          {/* </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default About;
