import { useContext } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ProjectContext from "../context/ProjectsProvider";

export default function CustomSlider() {
  const { projects } = useContext(ProjectContext);
  const windowWidth = window.screen.width;
  console.log(windowWidth);

  return (
    <section
      id="projects"
      className="text-center py-24 w-full bg-background_container"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold mb-4 text-heading">Projects</h1>
        <div className="flex justify-evenly flex-wrap gap-6">
          {projects.map((project) => {
            return <Project key={project} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
}
const Project = ({ project }) => {
  return (
    <article className="w-96 max-lg:w-[22rem] self-center justify-self-center max-sm:w-fit max-w-md bg-background_card rounded-lg overflow-hidden shadow-md shadow-shadow_color transition-all duration-300 hover:scale-105">
      <div className="flex gap-4 items-center bg-background_card_accent p-4 border-b border-border_primary">
        <div className="flex gap-x-2  justify-self-start">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <h3 className="flex-1 text-base font-semibold text-text_primary">
          {project.name}
        </h3>
      </div>

      <div className="p-4 space-y-5">
        <div className="font-roboto text-start h-80  bg-background_container p-4 rounded-md shadow-inner overflow-y-auto">
          <code className="text-sm text-text_secondary">
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
        </div>

        <div className="flex justify-center items-center  h-fit">
          <div className="flex gap-x-2">
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
