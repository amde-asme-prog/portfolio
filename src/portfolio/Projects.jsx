import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Make sure you import Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import ProjectContext from "../context/ProjectsProvider";

const Projects = () => {
  const { projects } = useContext(ProjectContext);

  return (
    <section
      id="projects"
      className="text-center py-24 w-full bg-background_container px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-heading">Projects</h1>

        <Swiper
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper relative"
        >
          <div className="swiper-button-prev !hidden md:!flex !left-0 !mt-0 !top-1/2 !transform !-translate-y-1/2 !w-10 !h-10 !rounded-full !bg-blue-600 !text-white after:!text-lg">
            <FaChevronLeft className="text-white" />
          </div>

          {projects.map((item, index) => (
            <SwiperSlide key={index}>
              <Project project={item} />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next !hidden md:!flex !right-0 !mt-0 !top-1/2 !transform !-translate-y-1/2 !w-10 !h-10 !rounded-full !bg-blue-600 !text-white after:!text-lg">
            <FaChevronRight className="text-white" />
          </div>
        </Swiper>
      </div>
    </section>
  );
};

const Project = ({ project }) => {
  return (
    <article className="max-w-96  bg-background_card rounded-lg shadow-md transition-all duration-300 hover:bg-opacity-50 hover:rotate-2 h-full flex flex-col my-10">
      <div className="flex gap-4 items-center bg-background_card_accent p-4 border-b border-border_primary">
        <div className="flex gap-x-2 justify-self-start">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <h3 className="flex-1 text-base font-semibold text-text_primary truncate">
          {project.name}
        </h3>
      </div>

      <div className="p-6 space-y-4 flex-grow flex flex-col">
        <code className=" text-sm text-text_secondary overflow-y-auto font-roboto text-start flex-grow bg-background_container p-7 rounded-md shadow-inner h-80">
          <span className="text-pink-500">const</span> project = {"{"}
          <br />
          &nbsp;&nbsp;<span className="text-red-500">name</span>:{" "}
          <q>{project.name}</q>,
          <br />
          &nbsp;&nbsp;<span className="text-green-500">technologies</span>: [
          <q>{project.tools.join('", "')}</q>],
          <br />
          &nbsp;&nbsp;<span className="text-red-400">myRole</span>:{" "}
          <q>{project.myRole}</q>,
          <br />
          &nbsp;&nbsp;<span className="text-red-500">description</span>:{" "}
          <q className="text-text_accent">{project.description}</q>
          <br />
          {"};"}
        </code>

        <div className="flex justify-center items-center mt-4">
          <div className="flex space-x-2">
            <a
              href={project.github}
              className="inline-flex items-center px-3 py-1 bg-gray-700 text-text_secondary rounded hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <FaGithub className="mr-2" />
              GitHub
            </a>
            <a
              href={project.link}
              className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              <FaExternalLinkAlt className="mr-2" />
              View Project
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Projects;
