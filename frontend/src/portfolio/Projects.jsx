import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useProjectsQuery } from "../hooks/projectsQuery";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTools,
  FaUser,
  FaClock,
} from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { data: projectsData, isLoading, error } = useProjectsQuery();

  useEffect(() => {
    if (projectsData) {
      setProjects(projectsData);
    }
  }, [projectsData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-800">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Error Loading Projects</h3>
        <p className="text-gray-600">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="text-center mb-16">
        <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
          Our Portfolio
        </h2>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Featured Projects
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Discover our innovative solutions and successful implementations that
          have made a real impact.
        </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-screen">
          <Swiper
            spaceBetween={24}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="!pb-16"
          >
            {projects.map((item) => (
              <SwiperSlide key={item.id} className="h-auto w-full">
                <div className="h-full w-full px-2">
                  <ProjectCard project={item} />
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev !hidden md:!flex !left-0 sm:!left-2 lg:!left-4 !w-10 !h-10 !after:!text-lg !bg-white/90 dark:!bg-gray-800/90 !shadow-lg hover:!bg-white dark:hover:!bg-gray-700 !transition-all !rounded-full">
              <FaChevronLeft className="text-gray-800 dark:text-white" />
            </div>

            <div className="swiper-button-next !hidden md:!flex !right-0 sm:!right-2 lg:!right-4 !w-10 !h-10 !after:!text-lg !bg-white/90 dark:!bg-gray-800/90 !shadow-lg hover:!bg-white dark:hover:!bg-gray-700 !transition-all !rounded-full">
              <FaChevronRight className="text-gray-800 dark:text-white" />
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const {
    title,
    image_path,
    description,
    role,
    duration,
    github_link,
    demo_link,
  } = project;

  const technologies = project.tools ? JSON.parse(project.tools) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image_path}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-500 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">{role}</span>
          </div>
          {duration && (
            <div className="flex items-center gap-3">
              <FaClock className="text-blue-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                {duration}
              </span>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaTools className="text-blue-500 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                Technologies
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {demo_link && (
            <a
              href={demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaExternalLinkAlt className="text-sm" />
              <span>View Demo</span>
            </a>
          )}
          {github_link && (
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaGithub className="text-sm" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
