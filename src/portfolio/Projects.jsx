import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import ProjectContext from "../context/ProjectsProvider";

const Projects = () => {
  const { projects } = useContext(ProjectContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(100);

  const nextProject = () => {
    setSwipeDirection((prev) => (prev < 0 ? -prev : prev));
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setSwipeDirection((prev) => (prev < 0 ? prev : -prev));
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50) {
      prevProject(); // Swiped right
    } else if (info.offset.x < -50) {
      nextProject(); // Swiped left
    }
  };

  return (
    <section
      id="projects"
      className="text-center py-24 w-full bg-background_primary"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-4 text-heading">Projects</h1>
        <div className="relative md:w-fit min-h-fit self-center">
          <article className="flex gap-4 h-full md:w-[90vw] justify-center items-center overflow-clip">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: swipeDirection }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -swipeDirection }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="inline-flex self-center h-[37rem]  w-[22rem] sm:w-6 lg:w-96"
              >
                <Project project={projects[currentIndex]} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + 1}
                initial={{ opacity: 0, x: swipeDirection }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -swipeDirection }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="hidden md:inline-flex self-center h-[37rem] w-[22rem] sm:w-6 lg:w-96"
              >
                <Project
                  project={projects[(currentIndex + 1) % projects.length]}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex + 2}
                initial={{ opacity: 0, x: swipeDirection }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -swipeDirection }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                className="hidden lg:inline-flex self-center h-[37rem] w-[22rem] sm:w-6 lg:w-96"
              >
                <Project
                  project={projects[(currentIndex + 2) % projects.length]}
                />
              </motion.div>
            </AnimatePresence>
          </article>

          <button
            onClick={prevProject}
            className="absolute top-1/2 -left-8 md:-left-6 lg:-left-12 transform -translate-y-1/2 p-2 bg-background_card rounded-full shadow-lg text-text_primary hover:bg-background_accent transition-colors duration-200"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextProject}
            className="absolute top-1/2 -right-8 md:-right-6 lg:-right-12 transform -translate-y-1/2 p-2 bg-background_card rounded-full shadow-lg text-text_primary hover:bg-background_accent transition-colors duration-200"
          >
            <FaChevronRight />
          </button>
        </div>
        <div className="flex justify-center mt-8">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full shadow-lg ${
                index === currentIndex ? "bg-blue-600" : "bg-background_card"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Project = ({ project }) => {
  return (
    <article className="self-center justify-center flex flex-col bg-background_secondary text-sub_heading border border-background_primary rounded-lg shadow-lg w-96 h-[32rem] text-left transition-transform duration-500 hover:shadow-xl">
      <div className="flex items-center justify-between border-b-2 border-background_primary w-full p-4">
        <div className="flex gap-x-2 align-center self-center">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h/,-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <span className="text-sm font-bold italic text-blue-500 uppercase text-center flex-1">
          {project.name}
        </span>
      </div>
      <div className="p-6 flex-1">
        <code className="text-sm text-text_tertiary">
          <span className="text-pink-500">const</span> project = {"{"}
          <br />
          &nbsp;&nbsp;<span className="text-red-500">name</span>:{" "}
          <q>{project.name}</q>,
          <br />
          &nbsp;&nbsp;<span className="text-red-500">technologies</span>: [
          <q>{project.tools.join('", "')}</q>],
          <br />
          &nbsp;&nbsp;<span className="text-red-500">myRole</span>:{" "}
          <q>{project.myRole}</q>,
          <br />
          &nbsp;&nbsp;<span className="text-red-500">description</span>:{" "}
          <q className="text-text_accent">{project.description}</q>
          <br />
          {"};"}
        </code>
      </div>
      <div className="my-6 flex space-x-4 justify-center">
        <a
          href={project.github}
          className=" cursor-pointer inline-flex items-center px-4 py-2 border-2 border-button_border text-sm font-medium rounded-md text-text_subtle bg-button_secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FaGithub className="mr-2" />
          GitHub
        </a>
        <a
          href={project.link}
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaExternalLinkAlt className="mr-2" />
          View Project
        </a>
      </div>
    </article>
  );
};

export default Projects;
